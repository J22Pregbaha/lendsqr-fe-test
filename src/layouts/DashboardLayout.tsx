import React from 'react'
import { useCustomMediaQuery } from '../hooks/useCustomMediaQuery'
import './dash-layout.scss'
import '../styles/globals.scss'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

export interface AuthLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { isMediumScreen, isMobile } = useCustomMediaQuery()

  return (
    <>
      <Navbar />
      <div className='page-content'>
        {!(isMediumScreen || isMobile) && <Sidebar isOpen={true} />}
        <div className='main-content custom-scrollbar'>
          {children}
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
