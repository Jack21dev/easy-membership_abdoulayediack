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
  const [associationName, setAssociationName] = useState("Mon Association");
  const [stats, setStats] = useState({
    members: 0,
    contributions: 0,
    events: 0,
  });

 

  useEffect(() => {
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
      <h2 className="fw-bold mb-1 fs-3">{associationName}</h2>
      <p className="text-muted mb-4 fs-6">
        Bienvenue {currentUser?.displayName}, voici un aperçu de votre
        association.
      </p>

      {loading ? (
        <Loader text="Chargement du tableau de bord..." />
      ) : (
        <div className="row">
          <DashboardCard
            icon={<img src={userIcon} alt="Icône utilisateur" style={{ width: 28, height: 28, objectFit: "contain" }} />}
            title="Nom de l'association"
            value={associationName}
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
