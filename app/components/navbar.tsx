import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="site-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <Link href="#about" className="nav-link" aria-label="About">
            Roland
          </Link>
        </div>
        <div className="nav-links">
          <Link href="#about" className="nav-link">About</Link>
          <Link href="#projects" className="nav-link">Projects</Link>
          <Link href="#science" className="nav-link">Science</Link>
          <Link href="#work" className="nav-link">Work</Link>
          <Link href="#reading" className="nav-link">Reading</Link>
        </div>
      </div>
    </nav>
  );
}
