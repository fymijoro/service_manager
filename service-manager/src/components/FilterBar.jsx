import { useState } from 'react'
import { Box, Typography, Menu, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const FILTER_LABELS = {
  all: 'All services',
  running: 'Running',
  stopped: 'Stopped',
}

function FilterBar({ filter, onFilterChange }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5, mb: 2 }}>
      <Typography sx={{ color: '#FFFFFF', fontWeight: 700 }}>Filter by</Typography>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          border: '1px solid #3B82F6',
          borderRadius: '20px',
          color: '#FFFFFF',
          px: 2,
          py: 0.5,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {FILTER_LABELS[filter]}
        <KeyboardArrowDownIcon fontSize="small" />
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {Object.entries(FILTER_LABELS).map(([value, label]) => (
          <MenuItem
            key={value}
            selected={value === filter}
            onClick={() => {
              onFilterChange(value)
              setAnchorEl(null)
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default FilterBar