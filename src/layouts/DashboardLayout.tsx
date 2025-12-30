import React from 'react'
import { useCustomMediaQuery } from '../hooks/useCustomMediaQuery'
import './dash-layout.scss'
import '../styles/globals.scss'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import { useViewportHeight } from '../hooks/useViewportHeight'
import { useSidebarContext } from '../contexts/SidebarContext'

export interface AuthLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { isMediumScreen, isMobile } = useCustomMediaQuery()
  const { mobileSidebarOpen } = useSidebarContext()
  useViewportHeight()

  return (
    <div className="h-screen-dynamic">
      <Navbar />
      <div className='page-content'>
        {!(isMediumScreen || isMobile) ?
          <Sidebar isOpen={true} /> :
          mobileSidebarOpen ? <Sidebar isOpen={mobileSidebarOpen} /> : null
        }
        <div className='main-content custom-scrollbar'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
