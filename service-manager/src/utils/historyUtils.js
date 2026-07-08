export function createInitialHistory(services) {
  const total = services.length
  const currentRunning = services.filter((s) => s.status === 'running').length
  const now = Date.now()
  const stepMs = 5 * 60 * 1000 // un point toutes les 5 minutes simulées

  const points = []
  for (let i = 9; i >= 0; i--) {
    // légère variation fictive avant de se stabiliser sur l'état réel actuel (i === 0)
    const noise = i === 0 ? 0 : Math.round(Math.sin(i * 1.3) * 1.5)
    const running = Math.max(0, Math.min(total, currentRunning + noise))
    points.push({
      time: new Date(now - i * stepMs),
      all: total,
      running,
      stopped: total - running,
    })
  }
  return points
}

export function appendHistoryPoint(history, services) {
  const total = services.length
  const running = services.filter((s) => s.status === 'running').length
  const newPoint = {
    time: new Date(),
    all: total,
    running,
    stopped: total - running,
  }
  return [...history, newPoint]
}