import { Box } from '@mui/material'
import StatusDonutChart from './StatusDonutChart.jsx'
import GanttUptimeChart from './GanttUptimeChart.jsx'

const GRADIENT = 'linear-gradient(90deg, #050A24 0%, #0F1D5A 50%, #050A24 100%)'

function ServicesCharts({ running, stopped, filteredServices, histories }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        alignItems: 'stretch',
      }}
    >
      {/* 1/3 de la largeur sur grand écran */}
      <Box sx={{ flex: { xs: '1 1 auto', md: '1 1 0' }, background: GRADIENT, borderRadius: '10px', border: '1px solid rgba(59,130,246,0.4)', p: 2, cursor: 'pointer' }}>
        <StatusDonutChart running={running} stopped={stopped} />
      </Box>
      {/* 2/3 de la largeur sur grand écran */}
      <Box sx={{ flex: { xs: '1 1 auto', md: '2 1 0' }, background: GRADIENT, borderRadius: '10px', border: '1px solid rgba(59,130,246,0.4)', p: 2, overflowX: 'auto' }}>
        <GanttUptimeChart services={filteredServices} histories={histories} />
      </Box>
    </Box>
  )
}

export default ServicesCharts