import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import MainLayout from './layouts/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import ManageAccount from './pages/ManageAccount.jsx'
import { initialServices } from './data/services.js'
import { generateMockServiceHistories, updateServiceHistory } from './utils/serviceHistoryUtils.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true')
  const [services, setServices] = useState(initialServices)

  // Généré UNE SEULE FOIS au montage — jamais régénéré au hasard ensuite
  const [histories, setHistories] = useState(() => generateMockServiceHistories(initialServices))

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    setServices(initialServices)
    setHistories(generateMockServiceHistories(initialServices))
  }

  // Point d'entrée UNIQUE pour changer l'état d'un service : met à jour la
  // liste ET son historique dans la même fonction — ils ne peuvent plus
  // jamais se désynchroniser l'un de l'autre.
  const updateServiceStatus = (id, newStatus) => {
    const now = new Date()
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus, startedAt: now } : s)))
    setHistories((prev) => ({
      ...prev,
      [id]: updateServiceHistory(prev[id] ?? [], newStatus, now),
    }))
  }

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
      <Route
        element={
          isLoggedIn ? (
            <MainLayout
              onLogout={handleLogout}
              services={services}
              histories={histories}
              updateServiceStatus={updateServiceStatus}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/manage-account" element={<ManageAccount />} />
      </Route>
    </Routes>
  )
}

export default App