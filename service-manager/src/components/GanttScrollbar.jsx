import { useRef } from 'react'
import { Box } from '@mui/material'

/**
 * Barre de défilement horizontale personnalisée : représente la fenêtre
 * temporelle visible (range) par rapport à toutes les données disponibles
 * (domain). Faire glisser le curseur déplace la fenêtre sans changer son
 * niveau de zoom.
 */
function GanttScrollbar({ domain, range, onRangeChange }) {
  const trackRef = useRef(null)
  const dragState = useRef(null)

  const domainSpan = domain.max - domain.min
  const rangeSpan = range.max - range.min

  const leftPercent = Math.min(100, Math.max(0, ((range.min - domain.min) / domainSpan) * 100))
  const widthPercent = Math.min(100, Math.max(4, (rangeSpan / domainSpan) * 100))

  const handlePointerDown = (e) => {
    const track = trackRef.current
    if (!track) return
    dragState.current = {
      startX: e.clientX,
      startRange: { ...range },
      trackWidth: track.getBoundingClientRect().width,
    }
    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('mouseup', handlePointerUp)
  }

  const handlePointerMove = (e) => {
    const drag = dragState.current
    if (!drag) return
    const deltaPx = e.clientX - drag.startX
    const deltaTime = (deltaPx / drag.trackWidth) * domainSpan

    let newMin = drag.startRange.min + deltaTime
    let newMax = drag.startRange.max + deltaTime

    // Empêche la fenêtre de sortir des données, en gardant la même largeur
    if (newMin < domain.min) {
      newMin = domain.min
      newMax = domain.min + rangeSpan
    }
    if (newMax > domain.max) {
      newMax = domain.max
      newMin = domain.max - rangeSpan
    }

    onRangeChange({ min: newMin, max: newMax })
  }

  const handlePointerUp = () => {
    dragState.current = null
    window.removeEventListener('mousemove', handlePointerMove)
    window.removeEventListener('mouseup', handlePointerUp)
  }

  return (
    <Box
      ref={trackRef}
      sx={{ position: 'relative', width: '100%', height: 10, mt: 1, borderRadius: '5px', background: 'rgba(255,255,255,0.08)' }}
    >
      <Box
        onMouseDown={handlePointerDown}
        sx={{
          position: 'absolute',
          top: 0,
          left: `${leftPercent}%`,
          width: `${widthPercent}%`,
          height: '100%',
          borderRadius: '5px',
          background: '#3B82F6',
          cursor: 'grab',
          '&:active': { cursor: 'grabbing' },
        }}
      />
    </Box>
  )
}

export default GanttScrollbar