// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <h1 className="logo"><Link href="/">My Products</Link></h1>
        <nav>
          <ul className="nav">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/about">About us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
