// components/ProductTable.tsx
"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/Product";

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "title-asc" | "title-desc">("title-asc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = products.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    switch (sort) {
      case "price-asc":
        out = out.slice().sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out = out.slice().sort((a, b) => b.price - a.price);
        break;
      case "title-desc":
        out = out.slice().sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "title-asc":
      default:
        out = out.slice().sort((a, b) => a.title.localeCompare(b.title));
    }
    return out;
  }, [products, query, sort]);

  return (
    <div className="product-table-wrap">
      <div className="controls">
        <input
          aria-label="Search products"
          placeholder="Search by title or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value as any)}>
          <option value="title-asc">Title ↑</option>
          <option value="title-desc">Title ↓</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>

      <table className="product-table" role="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price (USD)</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.title} style={{ width: 60, height: 60, objectFit: "contain" }} />
              </td>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.rating ? `${p.rating.rate} (${p.rating.count})` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && <p>No products match your search.</p>}
    </div>
  );
}
