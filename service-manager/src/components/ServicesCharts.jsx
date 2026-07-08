import { Box } from '@mui/material'
import StatusDonutChart from './StatusDonutChart.jsx'
import GanttUptimeChart from './GanttUptimeChart.jsx'

const GRADIENT = 'linear-gradient(90deg, #050A24 0%, #0F1D5A 50%, #050A24 100%)'

function ServicesCharts({ running, stopped, filteredServices, histories }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '969px',
        mx: 'auto',
        mt: 4,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        alignItems: 'stretch',
      }}
    >
      <Box sx={{ flex: 1, background: GRADIENT, borderRadius: '10px', border: '1px solid rgba(59,130,246,0.4)', p: 2, cursor: 'pointer' }}>
        <StatusDonutChart running={running} stopped={stopped} />
      </Box>
      <Box sx={{ flex: 1.4, background: GRADIENT, borderRadius: '10px', border: '1px solid rgba(59,130,246,0.4)', p: 2, overflowX: 'auto' }}>
        <GanttUptimeChart services={filteredServices} histories={histories} />
      </Box>
    </Box>
  )
}

export default ServicesCharts