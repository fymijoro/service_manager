import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#050816]">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout