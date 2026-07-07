import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import MainLayout from './layouts/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import ManageAccount from './pages/ManageAccount.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true"); 
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); //Decconnexion 
    setIsLoggedIn(false);
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
        element={isLoggedIn ? <MainLayout onLogout={handleLogout} /> : <Navigate to="/login" />}
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/manage-account" element={<ManageAccount />} />
      </Route>
    </Routes>
  );
}

export default App