import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Tableau de bord" },
  { to: "/members", label: "Membres" },
  { to: "/contributions", label: "Cotisations" },
  { to: "/events", label: "Événements" },
  { to: "/directory", label: "Annuaire" },
  { to: "/profile", label: "Profil" },
];

export default function Sidebar({ show, onLinkClick }) {
  return (
    <aside
      className={`bg-light border-end p-3 ${show ? "d-block" : "d-none"} d-md-block`}
      style={{ minWidth: 220 }}
    >
      <nav className="nav flex-column gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link rounded px-3 py-2 ${
                isActive ? "bg-primary text-white" : "text-dark"
              }`
            }
            onClick={onLinkClick}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
