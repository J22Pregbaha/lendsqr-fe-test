import React, { useState } from 'react'
import './navbar.scss'
import '../../styles/globals.scss'

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    console.log('Search query:', searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img
            src="/images/logo.svg"
            alt="Lendsqr logo"
            className="login__logo"
          />
        </div>

        <div className="navbar-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 0C2.46244 0 0 2.46244 0 5.5C0 8.53756 2.46244 11 5.5 11C6.74393 11 7.8885 10.5789 8.81165 9.87199L12.4697 13.5303C12.7626 13.8232 13.2374 13.8232 13.5303 13.5303C13.8232 13.2374 13.8232 12.7626 13.5303 12.4697L9.87199 8.81165C10.5789 7.8885 11 6.74393 11 5.5C11 2.46244 8.53756 0 5.5 0ZM1.5 5.5C1.5 3.29086 3.29086 1.5 5.5 1.5C7.70914 1.5 9.5 3.29086 9.5 5.5C9.5 7.70914 7.70914 9.5 5.5 9.5C3.29086 9.5 1.5 7.70914 1.5 5.5Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="navbar-right">
          <a href="#" className="docs-link">Docs</a>

          <button className="notification-button">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7 18.5L19.5 17.3V12.5C19.5 9.43 17.59 6.86 14.75 6.18V5.5C14.75 4.67 14.08 4 13.25 4C12.42 4 11.75 4.67 11.75 5.5V6.18C8.91 6.86 7 9.43 7 12.5V17.3L5.8 18.5C5.29 19.01 5.65 20 6.38 20H20.13C20.86 20 21.22 19.01 20.7 18.5ZM13.25 23C14.36 23 15.25 22.11 15.25 21H11.25C11.25 22.11 12.14 23 13.25 23Z" fill="currentColor"/>
            </svg>
            <span className="notification-badge"></span>
          </button>

          <div className="user-profile">
            <img
              src="/images/avatar.png"
              alt="User profile"
              className="user-avatar"
            />
            <span className="user-name">Adedeji</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-icon">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <style>{}</style>
    </nav>
  )
}

export default Navbar
