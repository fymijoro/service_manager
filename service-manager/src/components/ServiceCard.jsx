import { Box, Typography } from '@mui/material'
import ServiceLogo from './ServiceLogo.jsx'
import ServiceStatusBadge from './ServiceStatusBadge.jsx'
import ServiceActionsMenu from './ServiceActionsMenu.jsx'

function ServiceCard({ service, onRestart, onStop, onStart, isRestarting }) {
  const { name, unit, code, docsCmd, description, status } = service

  return (
    <Box
      sx={{
        background: '#2b3550',
        borderRadius: '16px',
        border: '1px solid transparent',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          borderColor: '#0C8CE9',
          boxShadow: '0 0 20px rgba(12, 140, 233, 0.5)',
          transform: 'translateY(-4px) scale(1.02)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ color: '#3B82F6', fontWeight: 700, fontSize: 22, textDecoration: 'underline' }}>
            {name}
          </Typography>
          <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15, mt: 0.5 }}>
            {description}
          </Typography>
          <Typography sx={{ color: '#B0B7C3', fontSize: 13, mt: 1 }}>
            Loaded: <b style={{ color: '#FFFFFF' }}>loaded</b> (/usr/lib/systemd/system/{unit}.service; disabled; preset: enabled)
          </Typography>
          <Typography sx={{ color: '#B0B7C3', fontSize: 13 }}>
            Active: {status === 'running' ? (
              <b style={{ color: '#FFFFFF' }}>active (running)</b>
            ) : (
              <b style={{ color: '#FFFFFF' }}>inactive (dead)</b>
            )} since Tue 2026-06-23 11:43:35 EAT; 1s ago
          </Typography>
          <Typography sx={{ color: '#B0B7C3', fontSize: 13 }}>
            Docs: man:{docsCmd}(8)<br />man:{docsCmd}_config(5)
          </Typography>
        </Box>
        <ServiceLogo code={code} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
        <ServiceStatusBadge status={isRestarting ? 'restarting' : status} />
        <ServiceActionsMenu
          status={status}
          onRestart={() => onRestart(service.id)}
          onStop={() => onStop(service.id)}
          onStart={() => onStart(service.id)}
        />
      </Box>
    </Box>
  )
}

export default ServiceCard