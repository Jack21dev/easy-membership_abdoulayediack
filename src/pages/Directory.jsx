import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader";

export default function Directory() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          "Impossible de charger l'annuaire pour le moment. Veuillez réessayer plus tard."
        );
      }
      setLoading(false);
    }

    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <div className="members-page">
        <div className="members-header card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            
            <h2 className="fw-bold mb-1">Annuaire des associations</h2>
            <p className="text-muted mb-0">
              Consultez la liste des associations disponibles dans l’annuaire.
            </p>
          </div>
        </div>

        {loading && <Loader text="Chargement de l'annuaire..." />}

        {!loading && error && <div className="alert alert-danger rounded-3">{error}</div>}

        {!loading && !error && (
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 members-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="fw-semibold">{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
