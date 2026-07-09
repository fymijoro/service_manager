import { Box, Typography } from '@mui/material'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

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
      // Légende désactivée ICI : elle occupait de l'espace À L'INTÉRIEUR
      // du canvas, ce qui poussait le cercle hors du centre géométrique
      // du carré. On la reconstruit manuellement juste en dessous à la place.
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F1730',
        borderColor: '#3B82F6',
        borderWidth: 1,
      },
    },
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: 12, mb: 0.75 }}>
        📈 Services Status Overview
      </Typography>

      <Box sx={{ position: 'relative', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
        {/* Carré ne contenant QUE l'anneau — plus de légende dedans,
            donc le cercle remplit vraiment tout l'espace disponible. */}
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 240, aspectRatio: '1 / 1' }}>
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

        {/* Légende reconstruite manuellement, hors du canvas */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: RUNNING_COLOR }} />
            <Typography sx={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700 }}>Running</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: STOPPED_COLOR }} />
            <Typography sx={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700 }}>Stopped</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StatusDonutChart