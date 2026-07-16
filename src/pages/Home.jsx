import { Link } from "react-router-dom";
import siteLogo from "../assets/icone/easy_membership_logo.png";
import homeIllustration from "../assets/icone/acceuil.png";
import manageMembersIcon from "../assets/icone/gerer.png";
import contributionsIcon from "../assets/icone/suivre.png";
import eventsIcon from "../assets/icone/organiser.png";
import directoryIcon from "../assets/icone/consulter.png";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%)" }}>
      <nav className="navbar navbar-dark bg-dark px-3 py-3 shadow-sm">
        <span className="navbar-brand mb-0 h5 d-flex align-items-center gap-2">
          <img src={siteLogo} alt="Logo Easy Membership" style={{ width: 38, height: 38, objectFit: "contain" }} />
          <span className="fw-semibold">Easy Membership</span>
        </span>
        <div>
          <Link to="/login" className="btn btn-outline-light btn-sm me-2">
            Connexion
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm">
            Inscription
          </Link>
        </div>
      </nav>

      <div className="container flex-grow-1 d-flex align-items-center py-5 position-relative">
        <div className="row w-100 g-4 position-relative">
          <div className="col-lg-7 position-relative z-1">
            <div className="p-4 p-lg-5 rounded-4 bg-white shadow-sm border border-light h-100">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill">Plateforme moderne</span>
              <h1 className="fw-bold mb-3 fs-2 lh-sm">
                La gestion de votre association, enfin centralisée.
              </h1>
              <p className="lead text-muted mb-4 fs-5">
                Easy Membership permet aux associations sénégalaises de gérer
                leurs membres, leurs cotisations et leurs événements depuis une
                seule plateforme moderne, fini les cahiers, fichiers Excel et
                groupes WhatsApp éparpillés.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Link to="/register" className="btn btn-primary btn-lg px-4">
                  Commencer gratuitement
                </Link>
                <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
                  J'ai déjà un compte
                </Link>
              </div>
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body p-4">
                  <h5 className="card-title mb-3 fs-5 fw-bold">Ce que vous pouvez faire</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex align-items-center gap-2 py-3 px-0">
                      <img src={manageMembersIcon} alt="Gérer les membres" style={{ width: 24, height: 24, objectFit: "contain" }} />
                      <span className="fs-6">Gérer les membres de votre association</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center gap-2 py-3 px-0">
                      <img src={contributionsIcon} alt="Suivre les cotisations" style={{ width: 24, height: 24, objectFit: "contain" }} />
                      <span className="fs-6">Suivre les cotisations et leur statut</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center gap-2 py-3 px-0">
                      <img src={eventsIcon} alt="Organiser les événements" style={{ width: 24, height: 24, objectFit: "contain" }} />
                      <span className="fs-6">Organiser vos événements</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center gap-2 py-3 px-0">
                      <img src={directoryIcon} alt="Consulter l’annuaire" style={{ width: 24, height: 24, objectFit: "contain" }} />
                      <span className="fs-6">Consulter un annuaire d'associations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <img
            src={homeIllustration}
            alt="Illustration d'accueil Easy Membership"
            style={{
              position: "absolute",
              right: "-8%",
              top: "50%",
              transform: "translateY(-50%)",
              width: "min(42vw, 640px)",
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
              border: "none",
              borderRadius: 0,
              display: "block",
              zIndex: 2,
              boxShadow: "none"
              
            }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
