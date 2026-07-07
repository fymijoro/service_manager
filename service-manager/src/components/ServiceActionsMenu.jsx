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
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => handleAction(onRestart)}>Restart</MenuItem>
        {status === 'running' ? (
          <MenuItem onClick={() => handleAction(onStop)}>Stop</MenuItem>
        ) : (
          <MenuItem onClick={() => handleAction(onStart)}>Start</MenuItem>
        )}
      </Menu>
    </>
  )
}

export default ServiceActionsMenu