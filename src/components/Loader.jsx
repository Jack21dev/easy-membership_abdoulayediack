// Petit composant réutilisable pour afficher un indicateur de chargement

export default function Loader({ text = "Chargement..." }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}
