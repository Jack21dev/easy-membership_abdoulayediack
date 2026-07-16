// Carte membre utilisée sur petits écrans (mobile), en alternative au tableau.

const statutColors = {
  Actif: "success",
  Inactif: "secondary",
  Suspendu: "danger",
};

export default function MemberCard({ member, onEdit, onDelete }) {
  return (
    <div className="card mb-3 shadow-sm border-0 member-mobile-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div>
            <h6 className="mb-1 fw-semibold">{member.nomComplet}</h6>
            <p className="mb-1 small text-muted">{member.fonction}</p>
            <p className="mb-1 small">{member.telephone}</p>
            <p className="mb-1 small">{member.email}</p>
          </div>
          <span className={`badge rounded-pill bg-${statutColors[member.statut] || "secondary"}`}>
            {member.statut}
          </span>
        </div>
        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={onEdit}>
            Modifier
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
