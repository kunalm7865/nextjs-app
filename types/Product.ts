// types/product.ts
export interface Product {
  id: number;
  product_name: string;
  category: string;
  auction_date: string; // YYYY-MM-DD
  start_time: string;   // HH:mm:ss
  end_time: string;     // HH:mm:ss
}
