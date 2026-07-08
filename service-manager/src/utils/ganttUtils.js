import { colorForIndex } from './colorUtils.js'

// Couleurs de statut demandées : vert pour running, rouge-orangé pour stopped
const STATUS_COLORS = {
  running: '#14A430',
  stopped: '#DD4515',
}

/**
 * Transforme les historiques de segments (déjà maintenus dans App.jsx)
 * en un tableau de points exploitables par un bar chart "barres flottantes".
 * Chaque service reçoit en plus une teinte de bordure unique (rowColor)
 * pour rester distinguable visuellement même si deux services sont
 * dans le même état au même moment.
 */
export function buildGanttData(services, histories) {
  const now = Date.now()
  const data = []

  services.forEach((service, index) => {
    const segments = histories[service.id] ?? []
    const rowColor = colorForIndex(index, services.length)

    segments.forEach((seg) => {
      const endMs = seg.end ? seg.end.getTime() : now
      data.push({
        y: service.name,                 // catégorie (ligne) sur l'axe Y
        x: [seg.start.getTime(), endMs], // barre flottante : [début, fin]
        status: seg.status,
        start: seg.start,
        end: seg.end ?? new Date(now),
        rowColor,
      })
    })
  })

  return data
}

export function statusColor(status) {
  return STATUS_COLORS[status] ?? '#888888'
}