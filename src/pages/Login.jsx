import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
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
                <h3 className="mb-1 fw-bold">Connexion</h3>
                <p className="text-muted mb-0">Accédez à votre espace membre</p>
              </div>
            </div>

            {error && <div className="alert alert-danger rounded-3">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="mot de passe"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </button>
            </form>

            <p className="text-center mt-4 mb-0 small text-muted">
              Pas encore de compte ? <Link to="/register" className="auth-link">S'inscrire</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
