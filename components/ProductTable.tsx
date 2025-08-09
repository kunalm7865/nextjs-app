"use client";

import { useMemo, useState, useEffect, FC } from "react";
import { Product } from "@/types/Product";

const parseDateTime = (date: string, time: string) =>
  new Date(`${date}T${time}`);

const formatFullTime = (ms: number) => {
  if (ms <= 0) return "00s";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = "";
  if (days > 0) result += `${days}d `;
  if (hours > 0 || days > 0) result += `${hours}h `;
  if (minutes > 0 || hours > 0 || days > 0) result += `${minutes}m `;
  result += `${seconds}s`;

  return result.trim();
};

interface Props {
  products: Product[];
}

const ProductList: FC<Props> = ({ products }) => {
  const [now, setNow] = useState(new Date());
  const [mounted, setMounted] = useState(false); // To track client mount
  const [query, setQuery] = useState("");

  useEffect(() => {
    setMounted(true); // Mark component as mounted on client

    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.product_name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, query]);

  const getAuctionStatus = (p: Product) => {
    const start = parseDateTime(p.auction_date, p.start_time);
    const end = parseDateTime(p.auction_date, p.end_time);
    const totalDuration = end.getTime() - start.getTime();

    if (now < start) {
      const diff = start.getTime() - now.getTime();
      return { label: "Upcoming", time: formatFullTime(diff), ongoing: false, progress: 0 };
    } else if (now >= start && now <= end) {
      const diff = end.getTime() - now.getTime();
      const progress = ((now.getTime() - start.getTime()) / totalDuration) * 100;
      return { label: "Live", time: formatFullTime(diff), ongoing: true, progress };
    } else {
      return { label: "Ended", time: "", ongoing: false, progress: 100 };
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center fw-bold">🚀 Live Auctions</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="search"
          className="form-control form-control-lg"
          placeholder="🔍 Search by product name or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
      </div>

      {filteredProducts.length === 0 && (
        <div className="alert alert-warning text-center">No products match your search.</div>
      )}

      <div className="d-flex flex-column gap-4">
        {filteredProducts.map((p) => {
          const status = getAuctionStatus(p);

          const badgeColor =
            status.label === "Live"
              ? "bg-success"
              : status.label === "Upcoming"
              ? "bg-info text-dark"
              : "bg-secondary";

          return (
            <div
              key={p.id}
              className="card shadow-sm border-0 rounded-3 overflow-hidden"
              style={{ background: "#fafafa" }}
            >
              <div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-3">
                {/* Left: Product info */}
                <div className="flex-grow-1 min-width-0">
                  <h4 className="card-title text-truncate" title={p.product_name}>
                    🧶 {p.product_name}
                  </h4>
                  <p className="card-subtitle mb-2 text-muted text-capitalize">{p.category}</p>
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${badgeColor} fs-6`}>{status.label}</span>
                    <small className="text-muted">Auction Date: {p.auction_date}</small>
                  </div>
                </div>

                {/* Center: Countdown */}
                <div className="text-center flex-shrink-0" style={{ minWidth: 180 }}>
                  <div className="fw-bold fs-3 text-monospace">
                    {/* Render countdown only on client to avoid hydration error */}
                    {mounted ? status.time || "--:--:--" : "--:--:--"}
                  </div>
                  <small className="text-muted">{status.ongoing ? "Ends In" : "Starts In"}</small>
                </div>

                {/* Right: Progress + Button */}
                <div className="flex-shrink-0 d-flex flex-column align-items-end" style={{ minWidth: 200 }}>
                  <div className="progress w-100 mb-2" style={{ height: 8, borderRadius: 8 }}>
                    <div
                      className={`progress-bar ${status.ongoing ? "bg-success" : "bg-info"}`}
                      role="progressbar"
                      style={{ width: `${status.progress}%` }}
                      aria-valuenow={status.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <button
                    className="btn btn-lg btn-primary rounded-pill"
                    disabled={!status.ongoing}
                    onClick={() => alert(`Bid placed on ${p.product_name}!`)}
                    title={status.ongoing ? "Place your bid" : "Auction not active"}
                    style={{ minWidth: 140 }}
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
