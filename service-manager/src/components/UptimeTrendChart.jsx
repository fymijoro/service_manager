import { useRef } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler, zoomPlugin)

const METRIC_STYLES = {
  all: { color: '#0C8CE9', label: 'All services' },
  running: { color: '#14A430', label: 'Running services' },
  stopped: { color: '#DD4515', label: 'Stopped services' },
}

function UptimeTrendChart({ history, filter }) {
  const chartRef = useRef(null)
  const metric = METRIC_STYLES[filter] ?? METRIC_STYLES.all

  const labels = history.map((point) =>
    point.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  )
  const values = history.map((point) => point[filter] ?? point.all)

  const data = {
    labels,
    datasets: [
      {
        label: metric.label,
        data: values,
        borderColor: metric.color,
        backgroundColor: `${metric.color}33`,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: metric.color,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#B0B7C3' },
        grid: { color: 'rgba(255,255,255,0.08)' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#B0B7C3', stepSize: 1, precision: 0 },
        grid: { color: 'rgba(255,255,255,0.08)' },
      },
    },
    plugins: {
      legend: {
        labels: { color: '#FFFFFF', font: { weight: 700 } },
      },
      tooltip: {
        backgroundColor: '#0F1730',
        borderColor: '#3B82F6',
        borderWidth: 1,
      },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          mode: 'x',
        },
        pan: { enabled: true, mode: 'x' },
      },
    },
  }

  const handleResetZoom = () => chartRef.current?.resetZoom()

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: 14 }}>
          {metric.label} over time
        </Typography>
        <IconButton size="small" onClick={handleResetZoom} sx={{ color: '#B0B7C3' }} title="Reset zoom">
          <RestartAltIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ height: 220 }}>
        <Line ref={chartRef} data={data} options={options} />
      </Box>
    </Box>
  )
}

export default UptimeTrendChart