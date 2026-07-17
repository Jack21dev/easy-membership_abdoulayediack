import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const links = [
  { to: "/dashboard", label: "Tableau de bord" },
  { to: "/members", label: "Membres" },
  { to: "/contributions", label: "Cotisations" },
  { to: "/events", label: "Événements" },
  { to: "/directory", label: "Annuaire" },
  { to: "/profile", label: "Profil" },
];

export default function Sidebar({ show, onLinkClick, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
      navigate("/");
    }
  }

  return (
    <>
      <div
        className={`sidebar-backdrop ${show ? "d-block" : "d-none"}`}
        onClick={onClose}
        role="presentation"
      />
      <aside className={`sidebar-mobile bg-light border-end p-3 ${show ? "show" : ""}`}>
        <nav className="nav flex-column gap-1 h-100 justify-content-between">
          <div className="d-flex flex-column gap-1">
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
          </div>

          <button
            type="button"
            className="btn btn-outline-danger mt-3"
            onClick={() => {
              onClose?.();
              handleLogout();
            }}
          >
            Déconnexion
          </button>
        </nav>
      </aside>
    </>
  );
}
