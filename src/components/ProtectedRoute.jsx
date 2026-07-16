import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Empêche l'accès aux pages internes si l'utilisateur n'est pas connecté
export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
