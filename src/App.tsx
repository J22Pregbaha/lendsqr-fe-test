import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import UsersPage from './pages/dashboard/Users'
import { HelmetProvider } from 'react-helmet-async'
import { routes } from './constants/routePath'

function App() {

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />
        <Route
          path={routes.USERS}
          element={<UsersPage />}
        />
      </Routes>
    </HelmetProvider>
  )
}

export default App
