// app/products/page.tsx
import { getProducts } from "@/lib/api/products";
import ProductTable from "@/components/ProductTable";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <section>
      <h2>Products</h2>
      <ProductTable products={products} />
    </section>
  );
}
