import Section from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Section>

      <div className='flex flex-col w-full h-dvh min-h-full max-h-fit max-w-screen-2xl justify-start py-4'>

        <div className='w-full h-full flex flex-col gap-3 font-roboto justify-center items-center'>
          <h1 className='text-3xl font-bold text-purple-800'>Find Your Perfect Developer</h1>
          <p className='text-muted-foreground text-2xl'>Discover talented developers ready to bring your projects to life</p>
          <Link to={"/register"}>
          <Button className="dark:bg-purple-600 dark:hover:bg-purple-700 dark:hover:text-white transition duration-200">Register as Developer</Button>
          </Link>

        </div>
        

      </div>
    </Section>
  )
}

export default Home