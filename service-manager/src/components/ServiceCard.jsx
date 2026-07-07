import { Box, Typography } from '@mui/material'
import ServiceLogo from './ServiceLogo.jsx'
import ServiceStatusBadge from './ServiceStatusBadge.jsx'
import ServiceActionsMenu from './ServiceActionsMenu.jsx'
import { formatDateTime, formatRelativeTime } from '../utils/dateUtils.js'

const hangingIndentSx = {
  color: '#B0B7C3',
  fontSize: 13,
  pl: '52px',
  textIndent: '-52px',
}

const ACTIVE_LABELS = {
  running: 'active (running)',
  stopped: 'inactive (dead)',
  restarting: 'activating (auto-restart)',
}

function ServiceCard({ service, onRestart, onStop, onStart, isRestarting }) {
  const { name, unit, code, docsCmd, description, status, enabledPreset, startedAt } = service
  const displayStatus = isRestarting ? 'restarting' : status

  return (
    <Box
      sx={{
        background: '#2b3550',
        borderRadius: '16px',
        border: '1px solid transparent',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
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

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, color: '#B0B7C3', fontSize: 13, mt: 1, lineHeight: 1.2 }}>
            <Typography component="span" sx={{ color: '#FFFFFF', fontWeight: 700, minWidth: '72px' }}>
              Loaded:
            </Typography>
            <Typography component="span" sx={{ lineHeight: 1.2 }}>
              <b style={{ color: '#FFFFFF' }}>loaded</b> (/usr/lib/systemd/system/{unit}.service; {enabledPreset}; vendor preset: enabled)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, color: '#B0B7C3', fontSize: 13, lineHeight: 1.2 }}>
            <Typography component="span" sx={{ color: '#FFFFFF', fontWeight: 700, minWidth: '72px' }}>
              Active:
            </Typography>
            <Typography component="span" sx={{ lineHeight: 1.2 }}>
              <b style={{ color: '#FFFFFF' }}>{ACTIVE_LABELS[displayStatus]}</b>
              {displayStatus !== 'stopped' && (
                <> since {formatDateTime(startedAt)} EAT; {formatRelativeTime(startedAt)}</>
              )}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, color: '#B0B7C3', fontSize: 13, lineHeight: 1.2 }}>
            <Typography component="span" sx={{ color: '#FFFFFF', fontWeight: 700, minWidth: '72px' }}>
              Docs:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2, lineHeight: 1.2 }}>
              <Typography component="span" sx={{ lineHeight: 1.2 }}>man:{docsCmd}(8)</Typography>
              <Typography component="span" sx={{ lineHeight: 1.2 }}>man:{docsCmd}_config(5)</Typography>
            </Box>
          </Box>
        </Box>
        <ServiceLogo code={code} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
        <ServiceStatusBadge status={displayStatus} />
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