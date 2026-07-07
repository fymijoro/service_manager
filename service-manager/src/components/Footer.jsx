import { Box, Link, IconButton, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import { useNavigate } from 'react-router-dom'

const footerLinks = [
  { label: 'About', path: '/about' },
  { label: 'Dashboard', path: '/' },
  { label: 'Manage Account', path: '/manage-account' },
]

const socialIcons = [
  { icon: <EmailIcon sx={{ fontSize: 35 }} />, href: 'mailto:contact@trackerteam.com' },
  { icon: <LinkedInIcon sx={{ fontSize: 35 }} />, href: 'https://linkedin.com' },
  { icon: <WhatsAppIcon sx={{ fontSize: 35 }} />, href: 'https://wa.me/0000000000' },
  { icon: <FacebookIcon sx={{ fontSize: 35 }} />, href: 'https://facebook.com' },
]

function Footer() {
  const navigate = useNavigate()

  return (
    <Box component="footer" sx={{ backgroundColor: '#070126' }}>
      <Box
        sx={{
          maxWidth: 1440,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2,
          px: { xs: 4, md: 8 },
          py: { xs: 0.75, md: 1 },
          minHeight: 120,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              component="button"
              onClick={() => navigate(link.path)}
              underline="hover"
              color="inherit"
              sx={{
                textAlign: 'left',
                fontSize: 20,
                fontWeight: 400,
                textTransform: 'none',
                px: 0,
              }}
            >
              {link.label}
            </Link>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: { xs: 'flex-start', md: 'flex-start' } }}>
          <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#FFFFFF', textAlign: 'left' }}>
            Contact us
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {socialIcons.map((social, index) => (
              <Box
                key={index}
                component="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  width: 35,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                {social.icon}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ py: 0.25 }}>
        <Typography sx={{ fontSize: 20, textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
          Copyright © {new Date().getFullYear()} All rights reserved
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
