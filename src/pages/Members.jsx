import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import MemberTable from "../components/MemberTable";
import MemberCard from "../components/MemberCard";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../services/membersService";

const emptyForm = {
  nomComplet: "",
  telephone: "",
  email: "",
  fonction: "",
  statut: "Actif",
};

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadMembers() {
    setLoading(true);
    const data = await getMembers();
    setMembers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  }

  function openEditModal(member) {
    setEditingId(member.id);
    setForm({
      nomComplet: member.nomComplet,
      telephone: member.telephone,
      email: member.email,
      fonction: member.fonction,
      statut: member.statut,
    });
    setError("");
    setShowModal(true);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.nomComplet || !form.email) {
      setError("Le nom complet et l'email sont obligatoires.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await updateMember(editingId, form);
      } else {
        await addMember(form);
      }
      setShowModal(false);
      await loadMembers();
    } catch (err) {
      setError("Une erreur est survenue lors de l'enregistrement.");
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Voulez-vous vraiment supprimer ce membre ?")) return;
    await deleteMember(id);
    await loadMembers();
  }

  return (
    <DashboardLayout>
      <div className="members-page">
        <div className="members-header card border-0 shadow-sm mb-4">
          <div className="card-body p-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              
              <h2 className="fw-bold mb-1">Gestion des membres</h2>
              <p className="text-muted mb-0">
                Consultez, ajoutez et gérez les profils de votre association.
              </p>
            </div>
            <button className="btn btn-primary members-add-btn" onClick={openAddModal}>
              + Ajouter un membre
            </button>
          </div>
        </div>

        {loading ? (
          <Loader text="Chargement des membres..." />
        ) : (
          <>
            <MemberTable
              members={members}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />

            <div className="d-md-none">
              {members.length === 0 ? (
                <div className="empty-state card border-0 shadow-sm p-4 text-center">
                  <p className="text-muted mb-0">
                    Aucun membre enregistré pour le moment.
                  </p>
                </div>
              ) : (
                members.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onEdit={() => openEditModal(member)}
                    onDelete={() => handleDelete(member.id)}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "Modifier le membre" : "Ajouter un membre"}
      >
        {error && <div className="alert alert-danger rounded-3">{error}</div>}
        <form onSubmit={handleSubmit} className="members-form">
          <div className="mb-3">
            <label className="form-label">Nom complet</label>
            <input
              type="text"
              name="nomComplet"
              className="form-control"
              value={form.nomComplet}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Téléphone</label>
            <input
              type="tel"
              name="telephone"
              className="form-control"
              value={form.telephone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fonction dans l'association</label>
            <input
              type="text"
              name="fonction"
              className="form-control"
              value={form.fonction}
              onChange={handleChange}
              placeholder="Ex : Trésorier, Secrétaire..."
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
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
              <option value="Suspendu">Suspendu</option>
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
