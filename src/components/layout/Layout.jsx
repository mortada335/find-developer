import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <>
    <main>
        <Navbar />
        <div className="container w-full ">
                <Outlet />
        </div>
    </main>
    </>
  )
}

export default Layout