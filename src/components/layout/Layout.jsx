import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1 pt-14">
        <div className="container mx-auto w-full px-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout