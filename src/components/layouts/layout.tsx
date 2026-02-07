import Navbar from './Navbar';
import Footer from './Footer';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full h-full">
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout