import { useState } from 'react'
import './login.scss'
import '../../styles/globals.scss'
import { useCustomMediaQuery } from '../../hooks/useCustomMediaQuery'
import { PageTitle } from '../../components/PageTitle'
import { useViewportHeight } from '../../hooks/useViewportHeight'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../constants/routePath'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { isMediumScreen, isMobile } = useCustomMediaQuery()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted', { email, password })

    if (!email) {
      toast.error('Email is required.')
      return
    }
    if (!password) {
      toast.error('Password is required.')
      return
    }

    navigate(routes.USERS)
  }
  useViewportHeight()

  return (
    <div className="h-screen-dynamic">
      <PageTitle
        title="Login"
        description="Login Page"
      />

      <div className="login-content">
        <div className="left-section">
          <img
            src="/images/logo.svg"
            alt="Lendsqr logo"
            className="login__logo"
          />

          <img
            src="/images/illustration.png"
            alt="Login illustration"
            className="login__illustration"
          />
        </div>

        <div className='right-section'>
          <div className="login-form-wrapper">
            {(isMediumScreen || isMobile) && (
              <img
                src="/images/logo.svg"
                alt="Lendsqr logo"
                className="login__logo"
              />
            )}
            <h1 className="welcome-title">Welcome!</h1>
            <p className="welcome-subtitle">Enter details to login.</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group password-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>

              <a href="#" className="forgot-password">
              FORGOT PASSWORD?
              </a>

              <button type="submit" className="login-btn">
              LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
