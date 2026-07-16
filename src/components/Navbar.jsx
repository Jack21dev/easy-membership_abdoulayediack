import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import siteLogo from "../assets/icone/easy_membership_logo.png";

export default function Navbar({ onToggleSidebar }) {
  const { currentUser, logout } = useAuth();
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
    <nav className="navbar navbar-dark bg-dark px-3 py-3 sticky-top">
      <button
        className="btn btn-outline-light d-md-none me-2"
        onClick={onToggleSidebar}
      >
        <i className="bi bi-list"></i>
        ☰
      </button>

      <span className="navbar-brand mb-0 h5 d-flex align-items-center gap-2">
        <img src={siteLogo} alt="Logo Easy Membership" style={{ width: 38, height: 38, objectFit: "contain" }} />
        <span>Easy Membership</span>
      </span>

      <div className="d-flex align-items-center ms-auto text-white">
        <span className="me-3 d-none d-sm-inline">
          {currentUser?.displayName || currentUser?.email}
        </span>
        <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
