import { useRef, useMemo } from 'react'
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

// Status colors: green for running, orange-red for stopped
const STATUS_COLORS = {
  running: '#14A430',
  stopped: '#DD4515',
}

// Color palette to visually distinguish service lines
const BORDER_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
  '#F8B88B', '#85E0D8', '#C9ADA7', '#9D7E7E',
  '#CBE4DE', '#E7CEF4', '#F1A0E2', '#FFFACD',
]

/**
 * Gantt/Timeline component to track service uptime
 * @param {Array} services - List of services to display
 * @param {Object} histories - Service state history (service.id -> [{start, end, status}])
 */
function GanttUptimeChart({ services, histories }) {
  const chartRef = useRef(null)
  const containerRef = useRef(null)

  // Calculate Gantt data from histories
  const { data, timeRange, initialZoom } = useMemo(() => {
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

    // Add padding for temporal margin
    const padding = (maxTime - minTime) * 0.1 || 3600000
    minTime -= padding
    maxTime += padding

    // Initial zoom: last 2 days of the data range
    const twoDaysMs = 2 * 24 * 60 * 60 * 1000
    const initialZoomRange = {
      min: Math.max(minTime, maxTime - twoDaysMs),
      max: maxTime,
    }

    return {
      data: points,
      timeRange: { min: minTime, max: maxTime },
      initialZoom: initialZoomRange,
    }
  }, [services, histories])

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
          return (
            (raw.status === 'running' ? STATUS_COLORS.running : STATUS_COLORS.stopped) + 'D9'
          )
        },
        borderColor: (ctx) => ctx.raw?.borderColor ?? '#3B82F6',
        borderWidth: 2,
        borderSkipped: false,
        barThickness: 8,
        borderRadius: 2,
      },
    ],
  }

  // Generate time axis labels from the time range
  const timeLabels = useMemo(() => {
    const labels = []
    const interval = (initialZoom.max - initialZoom.min) / 8 // max 8 labels
    for (let i = 0; i < 9; i++) {
      const time = initialZoom.min + i * interval
      labels.push(format(new Date(time), 'EEE d MMM HH:mm', { locale: enUS }))
    }
    return labels
  }, [initialZoom])

  // Dynamic height based on number of displayed services
  const chartHeight = Math.max(120, services.length * 18)

  const options = {
    indexAxis: 'y', // Transformation en barres horizontales
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: initialZoom.min,
        max: initialZoom.max,
        title: {
          display: false,
        },
        ticks: {
          color: '#B0B7C3',
          stepSize: (initialZoom.max - initialZoom.min) / 8,
          callback: (value, index) => (index < timeLabels.length ? timeLabels[index] : ''),
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
            const duration =
              (raw.end.getTime() - raw.start.getTime()) / (1000 * 60 * 60) // en heures
            const startStr = format(raw.start, 'MM/dd HH:mm', { locale: enUS })
            const endStr = format(raw.end, 'MM/dd HH:mm', { locale: enUS })
            return [
              `${label}`,
              `From: ${startStr}`,
              `To: ${endStr}`,
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
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
  }

  // Zoom controls - fixed to work properly
  const handleZoomIn = () => {
    if (chartRef.current?.chart) {
      const chart = chartRef.current.chart
      const xAxis = chart.scales.x
      const range = xAxis.max - xAxis.min
      const center = (xAxis.max + xAxis.min) / 2
      const newRange = range * 0.7 // Reduces range by 30%
      chart.options.scales.x.min = center - newRange / 2
      chart.options.scales.x.max = center + newRange / 2
      chart.update('none')
    }
  }

  const handleZoomOut = () => {
    if (chartRef.current?.chart) {
      const chart = chartRef.current.chart
      const xAxis = chart.scales.x
      const range = xAxis.max - xAxis.min
      const center = (xAxis.max + xAxis.min) / 2
      const newRange = range * 1.4 // Increases range by 40%
      const newMin = Math.max(timeRange.min, center - newRange / 2)
      const newMax = Math.min(timeRange.max, center + newRange / 2)
      chart.options.scales.x.min = newMin
      chart.options.scales.x.max = newMax
      chart.update('none')
    }
  }

  const handleResetZoom = () => {
    if (chartRef.current?.chart) {
      const chart = chartRef.current.chart
      chart.options.scales.x.min = initialZoom.min
      chart.options.scales.x.max = initialZoom.max
      chart.update('none')
    }
  }

  // Horizontal scrollbar for navigation
  const handleScroll = (e) => {
    if (chartRef.current?.chart) {
      const chart = chartRef.current.chart
      const xAxis = chart.scales.x
      const range = xAxis.max - xAxis.min
      const maxScroll = timeRange.max - timeRange.min - range
      const scrollPercent = e.currentTarget.scrollLeft / (e.currentTarget.scrollWidth - e.currentTarget.clientWidth)
      const newMin = timeRange.min + scrollPercent * maxScroll
      const newMax = newMin + range
      chart.options.scales.x.min = newMin
      chart.options.scales.x.max = newMax
      chart.update('none')
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: 13, mb: 1 }}>
        📊 Service State Timeline Analysis
      </Typography>

      {/* Chart container with pointer cursor */}
      <Box sx={{ height: chartHeight, cursor: 'pointer', background: 'rgba(15,23,48,0.5)', borderRadius: '8px', padding: '6px' }}>
        <Bar ref={chartRef} data={chartData} options={options} />
      </Box>

      {/* Horizontal scrollbar for navigation */}
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          width: '100%',
          height: '12px',
          background: 'rgba(15,23,48,0.8)',
          borderRadius: '4px',
          mt: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(59,130,246,0.6)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(59,130,246,0.8)',
            },
          },
        }}
      >
        <Box sx={{ width: '200%', height: '100%' }} />
      </Box>

      {/* Zoom control buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 1 }}>
        <IconButton
          size="small"
          onClick={handleResetZoom}
          sx={{
            color: '#B0B7C3',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            padding: '4px 8px',
            '&:hover': { background: 'rgba(59,130,246,0.15)' },
          }}
          title="🔄 Reset zoom"
        >
          <RestartAltIcon fontSize="small" sx={{ mr: 0.3 }} />
          <span style={{ fontSize: '10px' }}>Reset</span>
        </IconButton>
        <IconButton
          size="small"
          onClick={handleZoomIn}
          sx={{
            color: '#B0B7C3',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            padding: '4px 8px',
            '&:hover': { background: 'rgba(59,130,246,0.15)' },
          }}
          title="🔍⁺ Zoom in"
        >
          <ZoomInIcon fontSize="small" sx={{ mr: 0.3 }} />
          <span style={{ fontSize: '10px' }}>+</span>
        </IconButton>
        <IconButton
          size="small"
          onClick={handleZoomOut}
          sx={{
            color: '#B0B7C3',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            padding: '4px 8px',
            '&:hover': { background: 'rgba(59,130,246,0.15)' },
          }}
          title="🔍⁻ Zoom out"
        >
          <ZoomOutIcon fontSize="small" sx={{ mr: 0.3 }} />
          <span style={{ fontSize: '10px' }}>-</span>
        </IconButton>
      </Box>
    </Box>
  )
}

export default GanttUptimeChart