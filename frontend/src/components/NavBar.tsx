import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/pessoas",
    label: "Pessoas",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3.3 0-6 1.8-6 4v1h12v-1c0-2.2-2.7-4-6-4z" />
      </svg>
    ),
  },
  {
    to: "/categorias",
    label: "Categorias",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 4h8v8H3zm10 0h8v5h-8zM3 14h5v6H3zm7 0h11v6H10z" />
      </svg>
    ),
  },
  {
    to: "/transacoes",
    label: "Transações",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h11l-2.5-2.5L14 3l5 5-5 5-1.5-1.5L15 9H4zM20 17H9l2.5 2.5L10 21l-5-5 5-5 1.5 1.5L9 15h11z" />
      </svg>
    ),
  },
  {
    to: "/totais",
    label: "Totais",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 3h14a2 2 0 0 1 2 2v14l-4-3-4 3-4-3-4 3V5a2 2 0 0 1 2-2zm2 4v2h10V7zm0 4v2h7v-2z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div>
          <p className="brand-title">Gastos Residenciais</p>
          <p className="brand-subtitle">Painel Financeiro</p>
        </div>
      </div>

      <nav className="nav-links">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
