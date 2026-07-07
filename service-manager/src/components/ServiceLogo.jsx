import { Box, Typography } from '@mui/material'

function ServiceLogo({ code }) {
  return (
    <Box
      sx={{
        width: 90,
        height: 90,
        flexShrink: 0,
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #1a2245 0%, #0f1730 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
      }}
    >
      <Typography sx={{ color: '#22C55E', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>
        {'>_'}
      </Typography>
      <Typography sx={{ color: '#22C55E', fontSize: 15, fontWeight: 700, letterSpacing: 1 }}>
        {code}
      </Typography>
    </Box>
  )
}

export default ServiceLogo