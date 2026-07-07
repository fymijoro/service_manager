import { useState, useMemo } from 'react'
import TypewriterTitle from '../components/TypewriterTitle.jsx'
import StatsSummary from '../components/StatsSummary.jsx'
import FilterBar from '../components/FilterBar.jsx'
import ServicesGrid from '../components/ServicesGrid.jsx'
import { initialServices } from '../data/services.js'

function Dashboard() {
  const [services, setServices] = useState(initialServices)
  const [filter, setFilter] = useState('all')
  const [restartingId, setRestartingId] = useState(null)

  const total = services.length
  const running = services.filter((s) => s.status === 'running').length
  const stopped = services.filter((s) => s.status === 'stopped').length

  const filteredServices = useMemo(() => {
    if (filter === 'all') return services
    return services.filter((s) => s.status === filter)
  }, [services, filter])

  const updateStatus = (id, status) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
  }

  const handleStop = (id) => updateStatus(id, 'stopped')
  const handleStart = (id) => updateStatus(id, 'running')

  const handleRestart = (id) => {
    setRestartingId(id)
    setTimeout(() => {
      updateStatus(id, 'running')
      setRestartingId(null)
    }, 1500)
  }

  return (
    <div className="p-8 flex flex-col items-center">
      <TypewriterTitle />
      <StatsSummary
        total={total}
        running={running}
        stopped={stopped}
        filter={filter}
        onFilterChange={setFilter}
      />
      <div className="w-full max-w-[1200px] mt-6">
        <FilterBar filter={filter} onFilterChange={setFilter} />
        <ServicesGrid
          services={filteredServices}
          onRestart={handleRestart}
          onStop={handleStop}
          onStart={handleStart}
          restartingId={restartingId}
        />
      </div>
    </div>
  )
}

export default Dashboard