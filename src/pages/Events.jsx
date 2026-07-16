import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import calendarEventIcon from "../assets/icone/calendar ev.png";
import lieuIcon from "../assets/icone/lieu.png";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../services/eventsService";

const emptyForm = {
  titre: "",
  date: "",
  heure: "",
  lieu: "",
  description: "",
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadEvents() {
    setLoading(true);
    const data = await getEvents();
    setEvents(data);
    setLoading(false);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  }

  function openEditModal(event) {
    setEditingId(event.id);
    setForm({
      titre: event.titre,
      date: event.date,
      heure: event.heure,
      lieu: event.lieu,
      description: event.description,
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

    if (!form.titre || !form.date) {
      setError("Le titre et la date sont obligatoires.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await updateEvent(editingId, form);
      } else {
        await addEvent(form);
      }
      setShowModal(false);
      await loadEvents();
    } catch (err) {
      setError("Une erreur est survenue lors de l'enregistrement.");
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Voulez-vous vraiment supprimer cet événement ?")) return;
    await deleteEvent(id);
    await loadEvents();
  }

  return (
    <DashboardLayout>
      <div className="members-page">
        <div className="members-header card border-0 shadow-sm mb-4">
          <div className="card-body p-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              
              <h2 className="fw-bold mb-1">Gestion des événements</h2>
              <p className="text-muted mb-0">
                Organisez vos activités et gérez les dates, lieux et descriptions.
              </p>
            </div>
            <button className="btn btn-primary members-add-btn" onClick={openAddModal}>
              + Ajouter un événement
            </button>
          </div>
        </div>

        {loading ? (
          <Loader text="Chargement des événements..." />
        ) : (
          <div className="row g-3">
            {events.map((event) => (
              <div className="col-12 col-md-6 col-lg-4" key={event.id}>
                <div className="card h-100 shadow-sm border-0 event-card">
                  <div className="card-body">
                    <h5 className="card-title fs-5 fw-semibold">{event.titre}</h5>
                    <p className="mb-1 text-muted d-flex align-items-center gap-2 fs-6">
                      <img src={calendarEventIcon} alt="Icône événement" style={{ width: 22, height: 22, objectFit: "contain" }} />
                      <span>{event.date} {event.heure && `à ${event.heure}`}</span>
                    </p>
                    <p className="mb-2 text-muted d-flex align-items-center gap-2 fs-6">
                      <img src={lieuIcon} alt="Icône lieu" style={{ width: 22, height: 22, objectFit: "contain" }} />
                      <span>{event.lieu}</span>
                    </p>
                    <p className="card-text fs-6">{event.description}</p>
                  </div>
                  <div className="card-footer bg-white border-0 d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => openEditModal(event)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(event.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="col-12">
                <div className="empty-state card border-0 shadow-sm p-4 text-center">
                  <p className="text-muted mb-0">
                    Aucun événement enregistré pour le moment.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "Modifier l'événement" : "Ajouter un événement"}
      >
        {error && <div className="alert alert-danger rounded-3">{error}</div>}
        <form onSubmit={handleSubmit} className="members-form">
          <div className="mb-3">
            <label className="form-label">Titre</label>
            <input
              type="text"
              name="titre"
              className="form-control"
              value={form.titre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-6 mb-3">
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
            <div className="col-6 mb-3">
              <label className="form-label">Heure</label>
              <input
                type="time"
                name="heure"
                className="form-control"
                value={form.heure}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Lieu</label>
            <input
              type="text"
              name="lieu"
              className="form-control"
              value={form.lieu}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={form.description}
              onChange={handleChange}
            ></textarea>
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
