import { Box } from '@mui/material'
import ServiceCard from './ServiceCard.jsx'

function ServicesGrid({ services, onRestart, onStop, onStart, restartingId }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: { xs: 4, md: 5 },
      }}
    >
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onRestart={onRestart}
          onStop={onStop}
          onStart={onStart}
          isRestarting={restartingId === service.id}
        />
      ))}
    </Box>
  )
}

export default ServicesGrid