import { Box, Typography } from '@mui/material'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const RUNNING_COLOR = '#14A430'
const STOPPED_COLOR = '#DD4515'
const TOTAL_COLOR = '#0C8CE9'

function StatusDonutChart({ running, stopped }) {
  const total = running + stopped

  const data = {
    labels: ['Running', 'Stopped'],
    datasets: [
      {
        data: [running, stopped],
        backgroundColor: [RUNNING_COLOR, STOPPED_COLOR],
        borderColor: '#0F1730',
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    // Centre le donut lui-même verticalement dans son canevas — évite d'avoir
    // à "deviner" une position en pourcentage (top: 38%) pour le texte du total.
    layout: { padding: 0 },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#FFFFFF', font: { weight: 700 }, usePointStyle: true, padding: 16 },
      },
      tooltip: {
        backgroundColor: '#0F1730',
        borderColor: '#3B82F6',
        borderWidth: 1,
      },
    },
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Même structure "titre + zone graphique" que le Gantt, pour que
          les deux blocs restent alignés en haut quelle que soit la hauteur
          prise par le graphe 2 (qui varie selon le nombre de services). */}
      <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: 12, mb: 0.75 }}>
        📈 Services Status Overview
      </Typography>

      <Box sx={{ position: 'relative', width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 260, aspectRatio: '1 / 1' }}>
          <Doughnut data={data} options={options} />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <Typography sx={{ color: TOTAL_COLOR, fontWeight: 700, fontSize: 32, lineHeight: 1 }}>
              {total}
            </Typography>
            <Typography sx={{ color: '#B0B7C3', fontSize: 12 }}>Total</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StatusDonutChart