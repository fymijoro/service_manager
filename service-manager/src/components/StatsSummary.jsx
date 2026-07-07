import { Box } from '@mui/material'
import StatCard from './StatCard.jsx'

const GRADIENT = 'linear-gradient(90deg, #050A24 0%, #0F1D5A 50%, #050A24 100%)'

const stats = [
  {
    label: 'Number of services',
    value: 22,
    accentColor: '#0C8CE9',
  },
  {
    label: (
      <>
        Services <span style={{ color: '#22C55E' }}>started</span>
      </>
    ),
    value: 19,
    accentColor: '#22C55E',
  },
  {
    label: (
      <>
        Services <span style={{ color: '#EF4444' }}>stopped</span>
      </>
    ),
    value: 3,
    accentColor: '#EF4444',
  },
]

function StatsSummary() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '969px',
        mx: 'auto',
        background: GRADIENT,
        borderRadius: '10px',
        borderBottom: '4px solid #0C8CE9',
        px: { xs: 2, md: '71px' },
        py: { xs: 2, md: '22px' },
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        gap: { xs: 2, md: '40px' },
      }}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          label={stat.label}
          value={stat.value}
          accentColor={stat.accentColor}
        />
      ))}
    </Box>
  )
}

export default StatsSummary