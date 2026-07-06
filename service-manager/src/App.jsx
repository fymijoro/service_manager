import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import ManageAccount from './pages/ManageAccount.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/manage-account" element={<ManageAccount />} />
      </Route>
    </Routes>
  )
}

export default App