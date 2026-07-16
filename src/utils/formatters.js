// Petites fonctions utilitaires réutilisées dans plusieurs pages

export function formatMontant(montant) {
  return `${Number(montant).toLocaleString()} FCFA`;
}

export function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("fr-FR");
}
