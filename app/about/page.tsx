// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | My Products App",
  description:
    "Learn more about My Products App — a demo Next.js + TypeScript application integrated with a Laravel backend.",
  keywords: ["Next.js", "TypeScript", "Laravel", "About Us", "Demo App"],
};

export default function AboutPage() {
  return (
    <section>
      <br />
      <h2>About Us</h2>
      <p>
        Demo app built with Next.js + TypeScript. Intended as a starting point for integrating a Laravel backend.
      </p>
    </section>
  );
}
