import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

function ServiceActionsMenu({ status, onRestart, onStop, onStart }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleAction = (action) => {
    setAnchorEl(null)
    action()
  }

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
              borderRadius: '10px',
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
        {status === 'running' ? (
          <MenuItem
            onClick={() => handleAction(onStop)}
            sx={{ '&:hover': { background: 'rgba(221, 69, 21, 0.15)' } }}
          >
            Stop
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => handleAction(onStart)}
            sx={{ '&:hover': { background: 'rgba(20, 164, 48, 0.15)' } }}
          >
            Start
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default ServiceActionsMenu