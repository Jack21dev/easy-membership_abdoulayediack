// Tableau Bootstrap listant les membres (affiché sur écrans moyens/larges)

const statutColors = {
  Actif: "success",
  Inactif: "secondary",
  Suspendu: "danger",
};

export default function MemberTable({ members, onEdit, onDelete }) {
  return (
    <div className="table-responsive d-none d-md-block">
      <div className="card border-0 shadow-sm overflow-hidden">
        <table className="table table-hover align-middle mb-0 members-table">
          <thead>
            <tr>
              <th>Nom complet</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Fonction</th>
              <th>Statut</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td className="fw-semibold">{member.nomComplet}</td>
                <td>{member.telephone}</td>
                <td>{member.email}</td>
                <td>{member.fonction}</td>
                <td>
                  <span
                    className={`badge rounded-pill bg-${
                      statutColors[member.statut] || "secondary"
                    }`}
                  >
                    {member.statut}
                  </span>
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEdit(member)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(member.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  Aucun membre enregistré pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
