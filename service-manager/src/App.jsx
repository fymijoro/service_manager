import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import MainLayout from './layouts/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import ManageAccount from './pages/ManageAccount.jsx'
import { initialServices } from './data/services.js'
import { createInitialHistory, appendHistoryPoint } from './utils/historyUtils.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [services, setServices] = useState(initialServices)
  const [history, setHistory] = useState(() => createInitialHistory(initialServices))
  const isFirstRender = useRef(true)

  // À chaque changement de `services` (sauf le tout premier rendu),
  // on ajoute un nouveau point à l'historique.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setHistory((prev) => appendHistoryPoint(prev, services))
  }, [services])

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    // Réinitialisation complète des données à la déconnexion
    setServices(initialServices)
    setHistory(createInitialHistory(initialServices))
    isFirstRender.current = true
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
        }
      />
      <Route
        element={
          isLoggedIn ? (
            <MainLayout
              onLogout={handleLogout}
              services={services}
              setServices={setServices}
              history={history}
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
  );
}

export default App