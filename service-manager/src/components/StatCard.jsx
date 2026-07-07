import { Box, Typography } from '@mui/material'

const GRADIENT = 'linear-gradient(90deg, #050A24 0%, #0F1D5A 50%, #050A24 100%)'

function StatCard({ label, value, accentColor }) {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '228px' },
        height: '58px',
        flexShrink: 0,
        background: GRADIENT,
        border: `1px solid ${accentColor}`,
        boxShadow: `0 0 12px ${accentColor}55`,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        px: 2,
      }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 32, fontWeight: 700, color: accentColor, lineHeight: 1 }}>
        {value}
      </Typography>
    </Box>
  )
}

export default StatCard