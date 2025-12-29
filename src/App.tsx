import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import UsersPage from './pages/dashboard/Users'
import UserDetailsPage from './pages/dashboard/UserDetails'
import { HelmetProvider } from 'react-helmet-async'
import { routes } from './constants/routePath'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from './contexts/UserInfoContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <UserProvider>
          <Routes>
            <Route
              path="/"
              element={<LoginPage />}
            />
            <Route
              path={routes.USERS}
              element={<UsersPage />}
            />
            <Route
              path={routes.USER_DETAILS}
              element={<UserDetailsPage />}
            />
          </Routes>
        </UserProvider>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
