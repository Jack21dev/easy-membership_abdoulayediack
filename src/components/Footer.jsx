export default function Footer() {
  return (
    <footer className="footer-pro mt-auto w-100">
      <div className="container py-4 py-md-5">
        <div className="row g-4">
          <div className="col-12 col-md-5">
            <h5 className="fw-bold mb-2">Easy Membership</h5>
            <p className="mb-0 text-light-emphasis">
              Une plateforme moderne pour gérer les membres, cotisations et événements d’une association.
            </p>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="fw-semibold mb-3">Produit</h6>
            <ul className="list-unstyled mb-0 small text-light-emphasis">
              <li className="mb-2">Tableau de bord</li>
              <li className="mb-2">Membres</li>
              <li className="mb-2">Cotisations</li>
              <li>Événements</li>
            </ul>
          </div>

          <div className="col-6 col-md-4">
            <h6 className="fw-semibold mb-3">Contact</h6>
            <ul className="list-unstyled mb-0 small text-light-emphasis">
              <li className="mb-2">support@easymembership.sn</li>
              <li className="mb-2">+221 77 254 25 15</li>
              <li>Dakar, Sénégal</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom mt-4 pt-3 border-top border-light-subtle">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-light-emphasis">
            <span>Easy Membership © {new Date().getFullYear()} — Tous droits réservés</span>
            <span>Développé par Fewnu Tech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
