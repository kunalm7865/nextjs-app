// lib/http.ts
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchOptions {
  method?: HttpMethod;
  query?: Record<string, string | number | boolean | null | undefined>;
  headers?: Record<string, string>;
  body?: any; // JSON or FormData
  revalidateSeconds?: number | false; // Next.js cache control
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://fakestoreapi.com";

/**
 * Build query string from object
 */
function buildQueryString(params?: FetchOptions["query"]) {
  if (!params) return "";
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString() ? `?${searchParams}` : "";
}

/**
 * Server-side fetcher for Next.js App Router
 */
export async function serverFetch<T>(
  path: string,
  { method = "GET", query, headers, body, revalidateSeconds = 60 }: FetchOptions = {}
): Promise<T> {
  const url = `${API_BASE}${path}${buildQueryString(query)}`;

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(url, {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
    next: revalidateSeconds === false ? undefined : { revalidate: revalidateSeconds },
  });

  if (!res.ok) {
    let errMsg = `HTTP ${res.status} ${res.statusText}`;
    try {
      const errJson = await res.json();
      errMsg += ` - ${JSON.stringify(errJson)}`;
    } catch {
      const errText = await res.text();
      if (errText) errMsg += ` - ${errText}`;
    }
    throw new Error(errMsg);
  }

  return (await res.json()) as T;
}

