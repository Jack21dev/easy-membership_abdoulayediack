import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const [nomComplet, setNomComplet] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    try {
      await signup(nomComplet, email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Cet email est déjà utilisé.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
    setLoading(false);
  }

  return (
    <div className="auth-page d-flex flex-column min-vh-100">
      <div className="auth-shell flex-grow-1 d-flex align-items-center justify-content-center py-4">
        <div className="auth-card card shadow-sm border-0">
          <div className="card-body p-4">
            <div className="auth-card__header mb-4">
              <div className="auth-logo" aria-hidden="true">
                <img src="/src/assets/icone/se-connecter.png" alt="" />
              </div>
              <div>
                <h3 className="mb-1 fw-bold">Créer un compte</h3>
                <p className="text-muted mb-0">Rejoignez votre association</p>
              </div>
            </div>

            {error && <div className="alert alert-danger rounded-3">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="mb-3">
                <label className="form-label">Nom complet</label>
                <input
                  type="text"
                  className="form-control"
                  value={nomComplet}
                  onChange={(e) => setNomComplet(e.target.value)}
                  placeholder="Abdoulaye"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" mot de passe"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirmer le mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="mot de passe"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Création en cours..." : "S'inscrire"}
              </button>
            </form>

            <p className="text-center mt-4 mb-0 small text-muted">
              Déjà un compte ? <Link to="/login" className="auth-link">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
