// lib/api/products.ts
import { serverFetch } from "@/lib/http";
import { Product } from "@/types/Product";

// GET all products
export async function getProducts() {
  return serverFetch<Product[]>("/api/v1/products/products", { method: "GET", revalidateSeconds: false });
}

// GET product by ID
export async function getProductById(id: number) {
  return serverFetch<Product>(`/products/${id}`, { method: "GET", revalidateSeconds: 300 });
}

// POST create product
export async function createProduct(data: Partial<Product>) {
  return serverFetch<Product>("/products", { method: "POST", body: data, revalidateSeconds: false });
}

// PUT update product
export async function updateProduct(id: number, data: Partial<Product>) {
  return serverFetch<Product>(`/products/${id}`, { method: "PUT", body: data, revalidateSeconds: false });
}

// PATCH update product partially
export async function patchProduct(id: number, data: Partial<Product>) {
  return serverFetch<Product>(`/products/${id}`, { method: "PATCH", body: data, revalidateSeconds: false });
}

// DELETE product
export async function deleteProduct(id: number) {
  return serverFetch<{ success: boolean }>(`/products/${id}`, { method: "DELETE", revalidateSeconds: false });
}
