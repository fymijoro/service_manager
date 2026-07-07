import { Box } from '@mui/material'

const STATUS_STYLES = {
  running: { label: 'Running', color: '#14A430' },
  stopped: { label: 'Stopped', color: '#DD4515' },
  restarting: { label: 'Restarting...', color: '#F59E0B' },
}

function ServiceStatusBadge({ status }) {
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
        color,
        fontWeight: 700,
        fontSize: 14,
      }}
    >
      {label}
    </Box>
  )
}

export default ServiceStatusBadge