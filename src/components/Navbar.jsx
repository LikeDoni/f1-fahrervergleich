import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="logo">🏎️ F1 Fahrervergleich</span>
      <div className="nav-links">
        <NavLink to="/">Start</NavLink>
        <NavLink to="/vergleich">Vergleich</NavLink>
        <NavLink to="/admin">Verwaltung</NavLink>
      </div>
    </nav>
  );
}
