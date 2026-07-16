import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import { getAssociation, saveAssociation } from "../services/associationService";

export default function Profile() {
  const { currentUser } = useAuth();
  const [associationName, setAssociationName] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadAssociation() {
      const data = await getAssociation(currentUser.uid);
      if (data?.nom) setAssociationName(data.nom);
    }
    loadAssociation();
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    await saveAssociation(currentUser.uid, { nom: associationName });
    setSaving(false);
    setSuccess(true);
  }

  return (
    <DashboardLayout>
      <div className="members-page">
        <div className="members-header card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            
            <h2 className="fw-bold mb-1">Mon profil</h2>
            <p className="text-muted mb-0">
              Gérez vos informations personnelles et le nom de votre association.
            </p>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-3 fw-semibold">Informations personnelles</h5>
                <p className="mb-2">
                  <strong>Nom complet :</strong> {currentUser?.displayName}
                </p>
                <p className="mb-0">
                  <strong>Email :</strong> {currentUser?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-3 fw-semibold">Nom de l'association</h5>
                {success && (
                  <div className="alert alert-success rounded-3">
                    Nom de l'association mis à jour !
                  </div>
                )}
                <form onSubmit={handleSubmit} className="members-form">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={associationName}
                      onChange={(e) => setAssociationName(e.target.value)}
                      placeholder="Ex : Association des jeunes de Thiès"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? "Enregistrement..." : "Enregistrer"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
