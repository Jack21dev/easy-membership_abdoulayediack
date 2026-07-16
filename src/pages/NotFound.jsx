import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3 py-5">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <p className="lead mb-4">Oups, cette page n'existe pas.</p>
        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
      <Footer />
    </div>
  );
}
