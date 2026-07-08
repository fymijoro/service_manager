/**
 * Génère une palette de couleurs distinctes pour les lignes du graphique Gantt.
 * Chaque service reçoit une teinte de bordure unique pour rester visuellement
 * distinguable même si deux services ont le même statut au même moment.
 */

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
  '#F8B88B', '#85E0D8', '#C9ADA7', '#9D7E7E',
  '#CBE4DE', '#E7CEF4', '#F1A0E2', '#FFFACD',
]

/**
 * Retourne une couleur unique basée sur l'index du service dans la liste.
 * @param {number} index - Position du service dans le tableau (0-based)
 * @param {number} total - Nombre total de services
 * @returns {string} Couleur en format hexadécimal (#RRGGBB)
 */
export function colorForIndex(index, total) {
  return COLORS[index % COLORS.length]
}
