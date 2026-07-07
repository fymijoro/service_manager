import { useState, useMemo, useEffect } from 'react'
import TypewriterTitle from '../components/TypewriterTitle.jsx'
import StatsSummary from '../components/StatsSummary.jsx'
import FilterBar from '../components/FilterBar.jsx'
import ServicesGrid from '../components/ServicesGrid.jsx'
import { initialServices } from '../data/services.js'

function Dashboard() {
  const [services, setServices] = useState(initialServices)
  const [filter, setFilter] = useState('all')
  const [restartingId, setRestartingId] = useState(null)
  const [isBlurring, setIsBlurring] = useState(false)

  const triggerBlur = (ms = 600) => {
    setIsBlurring(true)
    setTimeout(() => setIsBlurring(false), ms)
  }

  const total = services.length
  const running = services.filter((s) => s.status === 'running').length
  const stopped = services.filter((s) => s.status === 'stopped').length

  const filteredServices = useMemo(() => {
    const list = filter === 'all' ? services : services.filter((s) => s.status === filter)
    return [...list].sort((a, b) => a.name.localeCompare(b.name))
  }, [services, filter])

  const updateStatus = (id, status) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, startedAt: new Date() } : s))
    )
  }

  const handleStop = (id) => {
    triggerBlur()
    updateStatus(id, 'stopped')
  }
  const handleStart = (id) => {
    triggerBlur()
    updateStatus(id, 'running')
  }

  const handleRestart = (id) => {
    triggerBlur()
    setRestartingId(id)
    setTimeout(() => {
      updateStatus(id, 'running')
      setRestartingId(null)
    }, 1500)
  }

  useEffect(() => {
    // small blur on initial load to match requested effect
    triggerBlur(700)
  }, [])

  return (
    <div className="py-8 px-4 flex flex-col items-center">
      <TypewriterTitle />
      <StatsSummary
        total={total}
        running={running}
        stopped={stopped}
        filter={filter}
        onFilterChange={setFilter}
      />
      <div className="w-full max-w-[1200px] mt-6">
        <FilterBar
          filter={filter}
          onFilterChange={(value) => {
            triggerBlur()
            setFilter(value)
          }}
        />
        <ServicesGrid
          services={filteredServices}
          onRestart={handleRestart}
          onStop={handleStop}
          onStart={handleStart}
          restartingId={restartingId}
          isBlurring={isBlurring}
        />
      </div>
    </div>
  )
}

export default Dashboard