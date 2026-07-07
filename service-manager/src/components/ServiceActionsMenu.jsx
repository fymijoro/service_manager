import { useState } from 'react'
import { IconButton, Menu, MenuItem, Divider } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

function ServiceActionsMenu({ status, onRestart, onStop, onStart }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleAction = (action) => {
    setAnchorEl(null)
    action()
  }

  const secondAction =
    status === 'running'
      ? { label: 'Stop', handler: onStop, hoverColor: 'rgba(221, 69, 21, 0.15)' }
      : { label: 'Start', handler: onStart, hoverColor: 'rgba(20, 164, 48, 0.15)' }

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: '#FFFFFF' }}>
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              background: '#0F1730',
              border: '1px solid #3B82F6',
              borderRadius: 0,
              color: '#FFFFFF',
              minWidth: 120,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleAction(onRestart)}
          sx={{ '&:hover': { background: 'rgba(59, 130, 246, 0.1)' } }}
        >
          Restart
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)' }} />
        <MenuItem
          onClick={() => handleAction(secondAction.handler)}
          sx={{ '&:hover': { background: secondAction.hoverColor } }}
        >
          {secondAction.label}
        </MenuItem>
      </Menu>
    </>
  )
}

export default ServiceActionsMenu