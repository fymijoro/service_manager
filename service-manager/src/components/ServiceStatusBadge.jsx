import { Box } from '@mui/material'

const STATUS_STYLES = {
  running: { label: 'Running', color: '#14A430' },
  stopped: { label: 'Stopped', color: '#DD4515' },
  restarting: { label: 'Restarting...', color: '#F59E0B' },
}

function ServiceStatusBadge({ status, isBlurring }) {
  const { label, color } = STATUS_STYLES[status]
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 2,
        py: 0.5,
        borderRadius: '20px',
        border: `1px solid ${color}`,
        boxShadow: `0 0 10px ${color}99, inset 0 0 6px ${color}33`,
        color,
        fontWeight: 700,
        fontSize: 14,
        transition: 'filter 0.25s ease',
        filter: isBlurring ? 'blur(3px)' : 'none',
      }}
    >
      {label}
    </Box>
  )
}

export default ServiceStatusBadge