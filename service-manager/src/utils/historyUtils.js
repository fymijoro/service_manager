/**
 * Génère un historique fictif d'états marche/arrêt sur les 7 derniers jours.
 * N'est appelée qu'UNE SEULE FOIS, au démarrage de l'app (voir App.jsx) —
 * ne doit jamais être relancée après coup, sinon l'historique se désynchronise
 * de l'état réel affiché sur les cartes.
 */
export function generateMockServiceHistories(services) {
  const histories = {}
  const now = Date.now()

  services.forEach((service) => {
    const segments = []
    let currentTime = now - 7 * 24 * 60 * 60 * 1000
    let isRunning = Math.random() > 0.3
    const segmentCount = 8 + Math.floor(Math.random() * 8)

    for (let i = 0; i < segmentCount; i++) {
      const durationHours = isRunning ? 4 + Math.random() * 40 : 2 + Math.random() * 6
      const segmentDuration = durationHours * 60 * 60 * 1000
      const segmentEnd = Math.min(currentTime + segmentDuration, now)

      segments.push({
        start: new Date(currentTime),
        end: segmentEnd < now ? new Date(segmentEnd) : null,
        status: isRunning ? 'running' : 'stopped',
      })

      currentTime = segmentEnd + Math.random() * 2 * 60 * 60 * 1000
      isRunning = !isRunning
      if (currentTime >= now) break
    }

    // Le dernier segment doit refléter le VRAI statut actuel du service
    if (segments.length > 0 && segments[segments.length - 1].end !== null) {
      segments.push({
        start: new Date(segments[segments.length - 1].end),
        end: null,
        status: service.status,
      })
    }

    histories[service.id] = segments
  })

  return histories
}

/**
 * Met à jour l'historique d'UN SEUL service suite à une vraie action
 * (Start/Stop/Restart) : ferme le segment en cours, ouvre un nouveau.
 * Fonction PURE — renvoie toujours un NOUVEAU tableau, ne modifie jamais
 * celui reçu, sinon React ne détecterait pas le changement.
 */
export function updateServiceHistory(segments, newStatus, at = new Date()) {
  const updated = segments.map((seg, index) =>
    index === segments.length - 1 && seg.end === null ? { ...seg, end: at } : seg
  )
  updated.push({ start: at, end: null, status: newStatus })
  return updated
}