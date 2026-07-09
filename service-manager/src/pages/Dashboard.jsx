import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import TypewriterTitle from '../components/TypewriterTitle.jsx'
import StatsSummary from '../components/StatsSummary.jsx'
import ServicesCharts from '../components/ServicesCharts.jsx'
import FilterBar from '../components/FilterBar.jsx'
import ServicesGrid from '../components/ServicesGrid.jsx'

function Dashboard() {
  const { services, histories, updateServiceStatus } = useOutletContext()
  const [filter, setFilter] = useState('all')
  const [restartingId, setRestartingId] = useState(null)

  const total = services.length
  const running = services.filter((s) => s.status === 'running').length
  const stopped = services.filter((s) => s.status === 'stopped').length

  const filteredServices = useMemo(
    () => (filter === 'all' ? services : services.filter((s) => s.status === filter)),
    [services, filter]
  )

  const handleStop = (id) => updateServiceStatus(id, 'stopped')
  const handleStart = (id) => updateServiceStatus(id, 'running')
  const handleRestart = (id) => {
    setRestartingId(id)
    setTimeout(() => {
      updateServiceStatus(id, 'running')
      setRestartingId(null)
    }, 1500)
  }

  return (
    <div className="p-8 flex flex-col items-center">
      <div className="mt-10 w-full max-w-[1200px]">
        <TypewriterTitle />
      </div>
      <StatsSummary total={total} running={running} stopped={stopped} filter={filter} onFilterChange={setFilter} />

      <div className="w-full max-w-[1200px] mt-6">
        <ServicesCharts running={running} stopped={stopped} filteredServices={filteredServices} histories={histories} />
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