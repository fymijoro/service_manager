import { useRef, useMemo, useEffect } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, zoomPlugin)

const STATUS_COLORS = { running: '#14A430', stopped: '#DD4515' }

const BORDER_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
  '#F8B88B', '#85E0D8', '#C9ADA7', '#9D7E7E',
  '#CBE4DE', '#E7CEF4', '#F1A0E2', '#FFFACD',
]

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000
const MIN_RANGE_MS = 60 * 60 * 1000 // on interdit de zoomer en dessous d'1h visible

function GanttUptimeChart({ services, histories }) {
  const chartRef = useRef(null)

  // Mémorise toujours la plage COMPLÈTE de données disponibles (mise à jour à
  // chaque rendu, mais SANS jamais toucher au zoom actuel de l'utilisateur).
  // Sert de référence pour le bouton Reset et pour empêcher de dézoomer
  // au-delà des données réelles.
  const domainRef = useRef({ min: Date.now() - TWO_DAYS_MS, max: Date.now() })

  const { data, timeRange } = useMemo(() => {
    const now = Date.now()
    const points = []
    let minTime = now
    let maxTime = now

    services.forEach((service, index) => {
      const segments = histories?.[service.id] ?? []
      const borderColor = BORDER_COLORS[index % BORDER_COLORS.length]

      segments.forEach((seg) => {
        const startMs = seg.start.getTime()
        const endMs = seg.end ? seg.end.getTime() : now
        minTime = Math.min(minTime, startMs)
        maxTime = Math.max(maxTime, endMs)

        points.push({
          y: service.name,
          x: [startMs, endMs],
          status: seg.status,
          start: seg.start,
          end: seg.end ?? new Date(now),
          borderColor,
        })
      })
    })

    const padding = (maxTime - minTime) * 0.05 || 3600000
    minTime -= padding
    maxTime += padding

    return { data: points, timeRange: { min: minTime, max: maxTime } }
  }, [services, histories])

  // On garde toujours la dernière plage connue, sans provoquer de re-zoom.
  domainRef.current = timeRange

  const labels = services.map((s) => s.name)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Service state',
        data,
        backgroundColor: (ctx) => {
          const raw = ctx.raw
          if (!raw) return STATUS_COLORS.running + 'D9'
          return (raw.status === 'running' ? STATUS_COLORS.running : STATUS_COLORS.stopped) + 'D9'
        },
        borderColor: (ctx) => ctx.raw?.borderColor ?? '#3B82F6',
        borderWidth: 2,
        borderSkipped: false,
        barThickness: 8,
        borderRadius: 2,
      },
    ],
  }

  const chartHeight = Math.max(120, services.length * 18)

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 200 },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        // IMPORTANT : pas de min/max fixés ici. Sinon chaque re-rendu de React
        // écraserait le zoom choisi par l'utilisateur avec ces valeurs par défaut.
        // Le zoom initial est appliqué une seule fois, plus bas, via useEffect.
        ticks: {
          color: '#B0B7C3',
          maxTicksLimit: 6,
          // On formate directement CHAQUE graduation à partir de sa propre valeur :
          // ça reste juste même après un zoom/pan, contrairement à une liste de
          // libellés pré-calculée qui ne suivait pas le zoom réel du graphique.
          callback: (value) => format(new Date(value), 'd MMM HH:mm', { locale: enUS }),
          font: { size: 10 },
        },
        grid: { color: 'rgba(255,255,255,0.08)' },
      },
      y: {
        type: 'category',
        labels,
        ticks: { color: '#FFFFFF', font: { weight: 600, size: 10 } },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F1730',
        borderColor: '#3B82F6',
        borderWidth: 1,
        padding: 8,
        titleColor: '#FFFFFF',
        bodyColor: '#E0E7FF',
        callbacks: {
          title: (items) => items[0]?.label ?? '',
          label: (item) => {
            const raw = item.raw
            const label = raw.status === 'running' ? '✅ Running' : '❌ Stopped'
            const duration = (raw.end.getTime() - raw.start.getTime()) / (1000 * 60 * 60)
            const startStr = format(raw.start, 'MM/dd HH:mm', { locale: enUS })
            const endStr = format(raw.end, 'MM/dd HH:mm', { locale: enUS })
            return [label, `From: ${startStr}`, `To: ${endStr}`, `Duration: ${duration.toFixed(1)}h`]
          },
        },
      },
      zoom: {
        zoom: {
          wheel: { enabled: true, speed: 0.1 },
          drag: { enabled: true, backgroundColor: 'rgba(59,130,246,0.15)' },
          mode: 'x',
        },
        pan: { enabled: true, mode: 'x' },
      },
    },
  }

  // Applique le zoom par défaut ("les 2 derniers jours de données") UNE SEULE FOIS,
  // au montage du graphique — le tableau de dépendances vide [] garantit que ce
  // code ne se relance jamais aux re-rendus suivants (changement de filtre, etc.).
  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return
    const max = domainRef.current.max
    const min = Math.max(domainRef.current.min, max - TWO_DAYS_MS)
    chart.options.scales.x.min = min
    chart.options.scales.x.max = max
    chart.update('none')
  }, [])

  // Contraint une plage [min, max] pour qu'elle reste dans les données réelles
  // et qu'elle ne descende jamais sous la durée minimale visible.
  const clampRange = (min, max) => {
    const domain = domainRef.current
    let newMin = Math.max(domain.min, min)
    let newMax = Math.min(domain.max, max)
    if (newMax - newMin < MIN_RANGE_MS) {
      const center = (newMin + newMax) / 2
      newMin = center - MIN_RANGE_MS / 2
      newMax = center + MIN_RANGE_MS / 2
    }
    return { newMin, newMax }
  }

  const applyRange = (min, max) => {
    const chart = chartRef.current
    if (!chart) return
    const { newMin, newMax } = clampRange(min, max)
    chart.options.scales.x.min = newMin
    chart.options.scales.x.max = newMax
    chart.update('none')
  }

  const handleZoomIn = () => {
    const chart = chartRef.current
    if (!chart) return
    const { min, max } = chart.scales.x
    const center = (max + min) / 2
    const newRange = (max - min) * 0.7 // réduit la plage visible de 30%
    applyRange(center - newRange / 2, center + newRange / 2)
  }

  const handleZoomOut = () => {
    const chart = chartRef.current
    if (!chart) return
    const { min, max } = chart.scales.x
    const center = (max + min) / 2
    const newRange = (max - min) * 1.4 // agrandit la plage visible de 40%
    applyRange(center - newRange / 2, center + newRange / 2)
  }

  const handleResetZoom = () => {
    const max = domainRef.current.max
    const min = Math.max(domainRef.current.min, max - TWO_DAYS_MS)
    applyRange(min, max)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: 13, mb: 1 }}>
        📊 Service State Timeline Analysis
      </Typography>

      <Box sx={{ height: chartHeight, cursor: 'pointer', background: 'rgba(15,23,48,0.5)', borderRadius: '8px', padding: '6px' }}>
        <Bar ref={chartRef} data={chartData} options={options} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 1 }}>
        <IconButton
          size="small"
          onClick={handleResetZoom}
          sx={{ color: '#B0B7C3', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', px: 1, '&:hover': { background: 'rgba(59,130,246,0.15)' } }}
          title="🔄 Réinitialiser le zoom"
        >
          <RestartAltIcon fontSize="small" sx={{ mr: 0.3 }} />
          <span style={{ fontSize: '10px' }}>Reset</span>
        </IconButton>
        <IconButton
          size="small"
          onClick={handleZoomIn}
          sx={{ color: '#B0B7C3', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', px: 1, '&:hover': { background: 'rgba(59,130,246,0.15)' } }}
          title="🔍⁺ Zoom avant"
        >
          <ZoomInIcon fontSize="small" sx={{ mr: 0.3 }} />
          <span style={{ fontSize: '10px' }}>+</span>
        </IconButton>
        <IconButton
          size="small"
          onClick={handleZoomOut}
          sx={{ color: '#B0B7C3', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', px: 1, '&:hover': { background: 'rgba(59,130,246,0.15)' } }}
          title="🔍⁻ Zoom arrière"
        >
          <ZoomOutIcon fontSize="small" sx={{ mr: 0.3 }} />
          <span style={{ fontSize: '10px' }}>-</span>
        </IconButton>
      </Box>
    </Box>
  )
}

export default GanttUptimeChart