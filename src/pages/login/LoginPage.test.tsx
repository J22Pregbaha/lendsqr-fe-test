import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from './LoginPage'

const mockNavigate = jest.fn()
const mockToastError = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock('react-toastify', () => ({
  toast: {
    error: (msg: string) => mockToastError(msg),
  },
}))

jest.mock('../../hooks/useCustomMediaQuery', () => ({
  useCustomMediaQuery: () => ({
    isMediumScreen: false,
    isMobile: false,
  }),
}))

jest.mock('../../hooks/useViewportHeight', () => ({
  useViewportHeight: jest.fn(),
}))

jest.mock('../../components/PageTitle', () => ({
  PageTitle: ({ title }: { title: string }) => <title>{title}</title>,
}))

// ---- tests ----

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders login form correctly', () => {
    render(<LoginPage />)

    expect(screen.getByText(/welcome!/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('shows error when email is missing', async () => {
    render(<LoginPage />)

    await userEvent.click(
      screen.getByRole('button', { name: /log in/i })
    )

    expect(mockToastError).toHaveBeenCalledWith('Email is required.')
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('shows error when password is missing', async () => {
    render(<LoginPage />)

    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'test@mail.com'
    )

    await userEvent.click(
      screen.getByRole('button', { name: /log in/i })
    )

    expect(mockToastError).toHaveBeenCalledWith('Password is required.')
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('navigates to users page on successful login', async () => {
    render(<LoginPage />)

    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'test@mail.com'
    )

    await userEvent.type(
      screen.getByPlaceholderText(/password/i),
      'password123'
    )

    await userEvent.click(
      screen.getByRole('button', { name: /log in/i })
    )

    expect(mockNavigate).toHaveBeenCalled()
  })

  it('toggles password visibility', async () => {
    render(<LoginPage />)

    const passwordInput = screen.getByPlaceholderText(/password/i)
    const toggleButton = screen.getByRole('button', { name: /show/i })

    expect(passwordInput).toHaveAttribute('type', 'password')

    await userEvent.click(toggleButton)

    expect(passwordInput).toHaveAttribute('type', 'text')
    expect(toggleButton).toHaveTextContent(/hide/i)
  })
})
