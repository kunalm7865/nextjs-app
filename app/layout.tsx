// app/layout.tsx
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "My Products",
  description: "A demo Next.js + TypeScript products app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container" style={{ minHeight: "70vh" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
