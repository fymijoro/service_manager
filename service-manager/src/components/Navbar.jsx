import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import InfoIcon from '@mui/icons-material/Info'
import LogoutIcon from '@mui/icons-material/Logout'
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop'
import { useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { label: 'Manage account', icon: <PersonIcon />, path: '/manage-account' },
  { label: 'About', icon: <InfoIcon />, path: '/about' },
  { label: 'Logout', icon: <LogoutIcon />, path: '/login' },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleNavigate = (path) => {
    navigate(path)
    setDrawerOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          background:
            'linear-gradient(90deg, #050A24 0%, #0F1D5A 51%, #050A24 100%)',
        }}
      >
        <Toolbar className="flex justify-between">
          <Box className="flex items-center gap-2 font-bold text-lg">
            <ScreenSearchDesktopIcon />
            TRACKER TEAM
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }} gap={1}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                startIcon={link.icon}
                color="inherit"
                sx={{
                  textTransform: 'none',
                  fontWeight: isActive(link.path) ? '700' : '400',
                  fontSize: isActive(link.path) ? '1.05rem' : '1rem',
                }}
                onClick={() => handleNavigate(link.path)}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <IconButton
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250, height: '100%', background: '#050A24' }}
          role="presentation"
        >
          <List>
            {navLinks.map((link, index) => (
              <div key={link.label}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleNavigate(link.path)}>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{
                        sx: {
                          textTransform: 'none',
                          fontWeight: isActive(link.path) ? '700' : '400',
                          fontSize: isActive(link.path) ? '1.05rem' : '1rem',
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                {index < navLinks.length - 1 && (
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                )}
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar