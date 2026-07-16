import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { getMembers } from "../services/membersService";
import {
  getContributions,
  addContribution,
  deleteContribution,
} from "../services/contributionsService";

const emptyForm = {
  membreId: "",
  montant: "",
  date: "",
  statut: "En attente",
};

export default function Contributions() {
  const [contributions, setContributions] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadData() {
    setLoading(true);
    const [contributionsData, membersData] = await Promise.all([
      getContributions(),
      getMembers(),
    ]);
    setContributions(contributionsData);
    setMembers(membersData);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function getMemberName(membreId) {
    const member = members.find((m) => m.id === membreId);
    return member ? member.nomComplet : "Membre inconnu";
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.membreId || !form.montant || !form.date) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    setSaving(true);
    try {
      await addContribution({
        ...form,
        montant: Number(form.montant),
      });
      setShowModal(false);
      setForm(emptyForm);
      await loadData();
    } catch (err) {
      setError("Une erreur est survenue lors de l'enregistrement.");
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cette cotisation ?")) return;
    await deleteContribution(id);
    await loadData();
  }

  const total = contributions.reduce((sum, c) => sum + Number(c.montant || 0), 0);

  return (
    <DashboardLayout>
      <div className="members-page">
        <div className="members-header card border-0 shadow-sm mb-4">
          <div className="card-body p-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              
              <h2 className="fw-bold mb-1">Gestion des cotisations</h2>
              <p className="text-muted mb-0">
                Suivez les paiements et le total des cotisations enregistrées.
              </p>
            </div>
            <button className="btn btn-primary members-add-btn" onClick={() => setShowModal(true)}>
              + Enregistrer une cotisation
            </button>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4 summary-card">
          <div className="card-body">
            <p className="text-muted mb-1 small">Total des cotisations enregistrées</p>
            <h3 className="fw-bold text-primary mb-0">{total.toLocaleString()} FCFA</h3>
          </div>
        </div>

        {loading ? (
          <Loader text="Chargement des cotisations..." />
        ) : (
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 members-table">
                <thead>
                  <tr>
                    <th>Membre</th>
                    <th>Montant</th>
                    <th>Date</th>
                    <th>Statut</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map((c) => (
                    <tr key={c.id}>
                      <td>{getMemberName(c.membreId)}</td>
                      <td>{Number(c.montant).toLocaleString()} FCFA</td>
                      <td>{c.date}</td>
                      <td>
                        <span
                          className={`badge rounded-pill bg-${
                            c.statut === "Payée" ? "success" : "warning"
                          }`}
                        >
                          {c.statut}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(c.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  {contributions.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        Aucune cotisation enregistrée pour le moment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Enregistrer une cotisation"
      >
        {error && <div className="alert alert-danger rounded-3">{error}</div>}
        <form onSubmit={handleSubmit} className="members-form">
          <div className="mb-3">
            <label className="form-label">Membre concerné</label>
            <select
              name="membreId"
              className="form-select"
              value={form.membreId}
              onChange={handleChange}
              required
            >
              <option value="">-- Choisir un membre --</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nomComplet}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Montant (FCFA)</label>
            <input
              type="number"
              name="montant"
              className="form-control"
              value={form.montant}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Statut</label>
            <select
              name="statut"
              className="form-select"
              value={form.statut}
              onChange={handleChange}
            >
              <option value="En attente">En attente</option>
              <option value="Payée">Payée</option>
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowModal(false)}
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
