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
    <Box sx={{ position: 'relative', width: '100%', height: 260 }}>
      <Doughnut data={data} options={options} />
      <Box
        sx={{
          position: 'absolute',
          top: '38%',
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
  )
}

export default StatusDonutChart