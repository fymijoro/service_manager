/**
 * Generates fictional service state history covering the last 7 days.
 * Each service gets 8-15 state change segments with realistic durations.
 *
 * Returned structure:
 * {
 *   [service.id]: [
 *     { start: Date, end: Date|null, status: 'running'|'stopped' },
 *     ...
 *   ]
 * }
 */

export function generateMockServiceHistories(services) {
  const histories = {}
  const now = Date.now()
  
  // Generate history for the last 7 days
  services.forEach((service, index) => {
    const segments = []
    let currentTime = now - 7 * 24 * 60 * 60 * 1000 // 7 days before
    let isRunning = Math.random() > 0.3 // More services running than stopped initially
    
    // Generate between 8 and 15 segments of state changes
    const segmentCount = 8 + Math.floor(Math.random() * 8)
    
    for (let i = 0; i < segmentCount; i++) {
      // Variable duration: between 2h and 48h depending on status
      const durationHours = isRunning 
        ? 4 + Math.random() * 40  // running: 4-44 hours
        : 2 + Math.random() * 6   // stopped: 2-8 hours
      
      const segmentDuration = durationHours * 60 * 60 * 1000
      const segmentEnd = Math.min(currentTime + segmentDuration, now)
      
      segments.push({
        start: new Date(currentTime),
        end: segmentEnd < now ? new Date(segmentEnd) : null,
        status: isRunning ? 'running' : 'stopped',
      })
      
      currentTime = segmentEnd + (Math.random() * 2 * 60 * 60 * 1000) // Small delay before next change
      isRunning = !isRunning // Toggle between running and stopped
      
      // Stop if we reach now
      if (currentTime >= now) break
    }
    
    // Ensure last segment reflects the current service state
    if (segments.length > 0 && segments[segments.length - 1].end !== null) {
      segments.push({
        start: new Date(segments[segments.length - 1].end),
        end: null, // Ongoing segment
        status: service.status === 'running' ? 'running' : 'stopped',
      })
    }
    
    histories[service.id] = segments
  })
  
  return histories
}

/**
 * Updates service history when its state changes.
 * Closes the current segment and starts a new one.
 */
export function updateServiceHistory(histories, serviceId, newStatus) {
  const now = new Date()
  
  if (!histories[serviceId]) {
    // First record for this service
    histories[serviceId] = [
      { start: now, end: null, status: newStatus }
    ]
    return histories
  }
  
  const segments = histories[serviceId]
  const lastSegment = segments[segments.length - 1]
  
  // Close the last segment if it's still ongoing
  if (lastSegment.end === null) {
    lastSegment.end = now
  }
  
  // Add the new ongoing segment
  segments.push({
    start: now,
    end: null,
    status: newStatus,
  })
  
  return histories
}
