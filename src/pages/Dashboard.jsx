import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";
import { getMembers } from "../services/membersService";
import { getContributions } from "../services/contributionsService";
import { getEvents } from "../services/eventsService";
import { getAssociation } from "../services/associationService";
import { withFirestoreTimeout } from "../utils/firestoreHelpers";
import userIcon from "../assets/icone/user.png";
import groupUsersIcon from "../assets/icone/group-users.png";
import moneyBagIcon from "../assets/icone/money-bag.png";
import calendarIcon from "../assets/icone/calendar.png";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [associationName, setAssociationName] = useState("");
  const [stats, setStats] = useState({
    members: 0,
    contributions: 0,
    events: 0,
  });

  const hasData = Boolean(
    currentUser && (stats.members > 0 || stats.contributions > 0 || stats.events > 0 || associationName)
  );

  useEffect(() => {
    if (!currentUser?.uid) {
      setAssociationName("");
      setStats({ members: 0, contributions: 0, events: 0 });
      setLoading(false);
      return;
    }

    setLoading(true);
    setAssociationName("");
    setStats({ members: 0, contributions: 0, events: 0 });

    async function loadData() {
      try {
        const [members, contributions, events, association] =
          await Promise.all([
            withFirestoreTimeout(getMembers(), [], 2000),
            withFirestoreTimeout(getContributions(), [], 2000),
            withFirestoreTimeout(getEvents(), [], 2000),
            withFirestoreTimeout(getAssociation(currentUser.uid), null, 2000),
          ]);

        setStats({
          members: members.length,
          contributions: contributions.length,
          events: events.length,
        });

        if (association?.nom) {
          setAssociationName(association.nom);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du dashboard :", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [currentUser]);

  return (
    <DashboardLayout>
      <h2 className="fw-bold mb-1 fs-3">{associationName || "Tableau de bord"}</h2>
      <p className="text-muted mb-4 fs-6">
        {currentUser?.displayName
          ? `Bienvenue ${currentUser.displayName}, votre tableau de bord apparaîtra ici une fois que vous aurez ajouté vos données.`
          : "Votre tableau de bord apparaîtra ici une fois que vous aurez ajouté vos données."}
      </p>

      {loading ? (
        <Loader text="Chargement du tableau de bord..." />
      ) : !hasData ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body py-5 text-center text-muted">
            <p className="mb-0">Aucune donnée disponible pour le moment. Ajoutez vos premiers éléments pour remplir ce tableau de bord.</p>
          </div>
        </div>
      ) : (
        <div className="row">
          <DashboardCard
            icon={<img src={userIcon} alt="Icône utilisateur" style={{ width: 28, height: 28, objectFit: "contain" }} />}
            title="Nom de l'association"
            value={associationName || "—"}
            color="#0d6efd"
          />
          <DashboardCard
            icon={<img src={groupUsersIcon} alt="Icône groupe" style={{ width: 28, height: 28, objectFit: "contain" }} />}
            title="Total des membres"
            value={stats.members}
            color="#198754"
          />
          <DashboardCard
            icon={<img src={moneyBagIcon} alt="Icône argent" style={{ width: 28, height: 28, objectFit: "contain" }} />}
            title="Cotisations enregistrées"
            value={stats.contributions}
            color="#fd7e14"
          />
          <DashboardCard
            icon={<img src={calendarIcon} alt="Icône calendrier" style={{ width: 28, height: 28, objectFit: "contain" }} />}
            title="Événements"
            value={stats.events}
            color="#6f42c1"
          />
        </div>
      )}
    </DashboardLayout>
  );
}
