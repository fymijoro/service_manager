import { useRef, useMemo, useState } from 'react'
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
import { buildGanttRows, computeDomain } from '../utils/ganttUtils.js'
import GanttScrollbar from './GanttScrollbar.jsx'

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, zoomPlugin)

const STATUS_COLORS = { running: '#14A430', stopped: '#DD4515' }
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000
const MIN_RANGE_MS = 60 * 60 * 1000

function GanttUptimeChart({ services, histories }) {
  const chartRef = useRef(null)
  const domain = useMemo(() => computeDomain(histories), [histories])

  const [range, setRange] = useState(() => ({
    min: Math.max(domain.min, domain.max - TWO_DAYS_MS),
    max: domain.max,
  }))

  const rows = useMemo(() => buildGanttRows(services, histories), [services, histories])
  const labels = services.map((s) => s.name)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Service state',
        data: rows,
        backgroundColor: (ctx) => (ctx.raw ? STATUS_COLORS[ctx.raw.status] : STATUS_COLORS.running),
        borderWidth: 0,
        categoryPercentage: 0.7,
        barPercentage: 0.9,
        maxBarThickness: 16,
        borderRadius: 2,
      },
    ],
  }

  const chartHeight = Math.max(160, services.length * 32)

  const clampRange = (min, max) => {
    let newMin = Math.max(domain.min, min)
    let newMax = Math.min(domain.max, max)
    if (newMax - newMin < MIN_RANGE_MS) {
      const center = (newMin + newMax) / 2
      newMin = center - MIN_RANGE_MS / 2
      newMax = center + MIN_RANGE_MS / 2
    }
    return { min: newMin, max: newMax }
  }

  const syncRangeFromChart = (chart) => setRange(clampRange(chart.scales.x.min, chart.scales.x.max))

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 150 },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: range.min,
        max: range.max,
        ticks: {
          color: '#B0B7C3',
          maxTicksLimit: 6,
          callback: (value) => format(new Date(value), 'd MMM HH:mm', { locale: enUS }),
          font: { size: 10 },
        },
        grid: { color: 'rgba(255,255,255,0.08)' },
      },
      y: {
        type: 'category',
        ticks: {
          color: '#FFFFFF',
          font: { weight: 600, size: 10 },
          autoSkip: false,
        },
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
            return [
              label,
              `From: ${format(raw.start, 'MM/dd HH:mm', { locale: enUS })}`,
              `To: ${format(raw.end, 'MM/dd HH:mm', { locale: enUS })}`,
              `Duration: ${duration.toFixed(1)}h`,
            ]
          },
        },
      },
      zoom: {
        zoom: {
          wheel: { enabled: true, speed: 0.1 },
          drag: { enabled: true, backgroundColor: 'rgba(59,130,246,0.15)' },
          mode: 'x',
          onZoomComplete: ({ chart }) => syncRangeFromChart(chart),
        },
        pan: {
          enabled: true,
          mode: 'x',
          onPanComplete: ({ chart }) => syncRangeFromChart(chart),
        },
      },
    },
  }

  const handleZoomIn = () => {
    const center = (range.min + range.max) / 2
    const newSpan = (range.max - range.min) * 0.7
    setRange(clampRange(center - newSpan / 2, center + newSpan / 2))
  }

  const handleZoomOut = () => {
    const center = (range.min + range.max) / 2
    const newSpan = (range.max - range.min) * 1.4
    setRange(clampRange(center - newSpan / 2, center + newSpan / 2))
  }

  const handleResetZoom = () => setRange(clampRange(domain.max - TWO_DAYS_MS, domain.max))

  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: 13, mb: 1 }}>
        📊 Service State Timeline Analysis
      </Typography>

      <Box sx={{ height: chartHeight, cursor: 'pointer', background: 'rgba(15,23,48,0.5)', borderRadius: '8px', padding: '6px' }}>
        <Bar ref={chartRef} data={chartData} options={options} />
      </Box>

      <GanttScrollbar
        domain={domain}
        range={range}
        onRangeChange={(r) => setRange(clampRange(r.min, r.max))}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 1 }}>
        <IconButton size="small" onClick={handleResetZoom} sx={{ color: '#B0B7C3', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', px: 1, '&:hover': { background: 'rgba(59,130,246,0.15)' } }} title="🔄 Réinitialiser le zoom">
          <RestartAltIcon fontSize="small" sx={{ mr: 0.3 }} />
          <span style={{ fontSize: '10px' }}>Reset</span>
        </IconButton>
        <IconButton size="small" onClick={handleZoomIn} sx={{ color: '#B0B7C3', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', px: 1, '&:hover': { background: 'rgba(59,130,246,0.15)' } }} title="🔍⁺ Zoom avant">
          <ZoomInIcon fontSize="small" sx={{ mr: 0.3 }} />
          <span style={{ fontSize: '10px' }}>+</span>
        </IconButton>
        <IconButton size="small" onClick={handleZoomOut} sx={{ color: '#B0B7C3', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', px: 1, '&:hover': { background: 'rgba(59,130,246,0.15)' } }} title="🔍⁻ Zoom arrière">
          <ZoomOutIcon fontSize="small" sx={{ mr: 0.3 }} />
          <span style={{ fontSize: '10px' }}>-</span>
        </IconButton>
      </Box>
    </Box>
  )
}

export default GanttUptimeChart