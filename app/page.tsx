import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | My Products App",
  description:
    "Learn more about My Products App — a demo Next.js + TypeScript application integrated with a Laravel backend.",
  keywords: ["Next.js", "TypeScript", "Laravel", "About Us", "Demo App"],
};
export default function HomePage() {
  return (
    <section>
      <br />
      <h2>Welcome to My Products</h2>
      <p>
        This is a small demo showing products from FakeStoreAPI. Go to the Products page to see a table view.
      </p>
    </section>
  );
}
