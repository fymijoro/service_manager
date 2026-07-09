import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function MainLayout({ onLogout, services, histories, updateServiceStatus }) {
  return (
    <div className="min-h-screen bg-[#050816] flex flex-col">
      <Navbar onLogout={onLogout} />
      <main className="flex-1 pt-6">
        <Outlet context={{ services, histories, updateServiceStatus }} />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout