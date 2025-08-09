// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} My Products — Demo app</p>
      </div>
    </footer>
  );
}
