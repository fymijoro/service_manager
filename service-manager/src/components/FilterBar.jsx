import { useState } from 'react'
import { Box, Typography, Menu, MenuItem, Divider } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const FILTER_LABELS = {
  all: 'All services',
  running: 'Running',
  stopped: 'Stopped',
}

function FilterBar({ filter, onFilterChange }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const entries = Object.entries(FILTER_LABELS)

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
          borderRadius: 0,           // ← carré
          color: '#FFFFFF',
          background: '#0F1730',
          px: 2.5,
          py: 0.75,
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {FILTER_LABELS[filter]}
        <KeyboardArrowDownIcon fontSize="small" sx={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              background: '#0F1730',
              border: '1px solid #3B82F6',
              borderRadius: 0,       // ← carré
              color: '#FFFFFF',
              minWidth: 160,
            },
          },
        }}
      >
        {entries.map(([value, label], index) => (
          <div key={value}>
            <MenuItem
              selected={value === filter}
              onClick={() => {
                onFilterChange(value)
                setAnchorEl(null)
              }}
              sx={{
                fontWeight: value === filter ? 700 : 400,
                '&.Mui-selected': { background: 'rgba(59, 130, 246, 0.15)' },
                '&:hover': { background: 'rgba(59, 130, 246, 0.1)' },
              }}
            >
              {label}
            </MenuItem>
            {index < entries.length - 1 && (
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)' }} />
            )}
          </div>
        ))}
      </Menu>
    </Box>
  )
}

export default FilterBar