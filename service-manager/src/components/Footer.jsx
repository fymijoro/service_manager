import { Box, Link } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import { useNavigate } from 'react-router-dom'

const footerLinks = [
  { label: 'Dashboard', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Manage Account', path: '/manage-account' },
]

const socialIcons = [
  { icon: <EmailIcon />, href: 'mailto:contact@trackerteam.com' },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com' },
  { icon: <WhatsAppIcon />, href: 'https://wa.me/0000000000' },
  { icon: <FacebookIcon />, href: 'https://facebook.com' },
]

function Footer() {
  const navigate = useNavigate()

  return (
    <Box component="footer" sx={{ backgroundColor: '#070126' }} className="mt-16">
      <div className="flex flex-col md:flex-row justify-between gap-8 px-8 py-10 max-w-6xl mx-auto">
        {/* Colonne des liens */}
        <div className="flex flex-col gap-2">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              component="button"
              onClick={() => navigate(link.path)}
              underline="hover"
              color="inherit"
              className="text-left"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Colonne contact */}
        <div className="flex flex-col gap-3 md:items-end">
          <span className="font-semibold text-white">Contact us</span>
          <div className="flex gap-3">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pb-6 text-sm text-gray-300">
        Copyright © {new Date().getFullYear()} All rights reserved
      </div>
    </Box>
  )
}

export default Footer