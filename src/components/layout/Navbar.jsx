import { Github } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='header fixed top-0 w-full border-b'>
        <nav className='container h-14'>
                <div className="flex justify-between items-center gap-5">
                        <div className="flex justify-center items-center gap-4">
                                <Link to={"/"}>finDeveloper</Link>
                                <Link target='_blank' to={"https://www.github.com"}><Github /></Link>

                        </div>
                        <div className=" hidden md:flex justify-between items-center  gap-4">
                                <Link to={"/services"}>Services</Link>
                                <Link to={"/services"}>Services</Link>
                                <Link to={"/services"}>Services</Link>
                                <Link to={"/services"}>Services</Link>
                        </div>
                </div>
        </nav>
    </header>
  )
}

export default Navbar