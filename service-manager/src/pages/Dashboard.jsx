import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import TypewriterTitle from '../components/TypewriterTitle.jsx'
import StatsSummary from '../components/StatsSummary.jsx'
import ServicesCharts from '../components/ServicesCharts.jsx'
import FilterBar from '../components/FilterBar.jsx'
import ServicesGrid from '../components/ServicesGrid.jsx'
import { generateMockServiceHistories } from '../utils/serviceHistoryUtils.js'

function Dashboard() {
  const { services, setServices, history } = useOutletContext()
  const [filter, setFilter] = useState('all')
  const [restartingId, setRestartingId] = useState(null)

  const serviceHistories = useMemo(() => {
    return generateMockServiceHistories(services)
  }, [services])

  const total = services.length
  const running = services.filter((s) => s.status === 'running').length
  const stopped = services.filter((s) => s.status === 'stopped').length

  // Mémorisé : garde la même référence tant que `services` et `filter` ne
  // changent pas réellement, pour éviter de recalculer inutilement les
  // graphes (et éviter de casser leur zoom) à chaque re-rendu du Dashboard.
  const filteredServices = useMemo(() => {
    return filter === 'all' ? services : services.filter((s) => s.status === filter)
  }, [services, filter])

  const updateStatus = (id, status) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, startedAt: new Date() } : s))
    )
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
      <div className="mt-10 w-full max-w-[1200px]">
        <TypewriterTitle />
      </div>
      <StatsSummary
        total={total}
        running={running}
        stopped={stopped}
        filter={filter}
        onFilterChange={setFilter}
      />

      {/* Même conteneur (largeur + marges) que la grille de cartes plus bas */}
      <div className="w-full max-w-[1200px] mt-6">
        <ServicesCharts
          running={running}
          stopped={stopped}
          filteredServices={filteredServices}
          histories={serviceHistories}
        />
      </div>

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