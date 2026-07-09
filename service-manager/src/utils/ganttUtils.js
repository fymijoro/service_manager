/**
 * Transforme l'historique des services affichés en points exploitables par
 * le Gantt (barres flottantes [début, fin] par ligne).
 */
export function buildGanttRows(services, histories) {
  const now = Date.now()
  const points = []

  services.forEach((service) => {
    const segments = histories[service.id] ?? []
    segments.forEach((seg) => {
      const endMs = seg.end ? seg.end.getTime() : now
      points.push({
        y: service.name,
        x: [seg.start.getTime(), endMs],
        status: seg.status,
        start: seg.start,
        end: seg.end ?? new Date(now),
      })
    })
  })

  return points
}

/**
 * Calcule la plage temporelle totale à partir de TOUS les historiques,
 * peu importe le filtre actif — c'est ce qui garantit que changer de
 * "Filter by" ne fait plus bouger le zoom.
 */
export function computeDomain(histories) {
  const now = Date.now()
  let min = now
  let max = now

  Object.values(histories).forEach((segments) => {
    segments.forEach((seg) => {
      min = Math.min(min, seg.start.getTime())
      max = Math.max(max, seg.end ? seg.end.getTime() : now)
    })
  })

  if (min === max) min = max - 2 * 24 * 60 * 60 * 1000
  return { min, max }
}