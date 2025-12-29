import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import UsersPage from './pages/dashboard/Users'
import { HelmetProvider } from 'react-helmet-async'
import { routes } from './constants/routePath'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
    </QueryClientProvider>
  )
}

export default App
