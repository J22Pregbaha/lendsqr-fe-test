import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserDetails from './UserDetails'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock('../../layouts/DashboardLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

jest.mock('../../contexts/UserInfoContext', () => ({
  useUser: () => ({
    user: {
      id: 'LSQFf587g90',
      name: 'Grace Effiom',
      email: 'grace@lendsqr.com',
      phoneNumber: '08012345678',
      bvn: '12345678901',
      gender: 'Female',
    },
  }),
}))

jest.mock('lucide-react', () => ({
  ArrowLeft: () => <span>ArrowLeft</span>,
  Star: ({ fill }: { fill?: string }) => (
    <span data-testid={fill !== 'none' && fill ? 'filled-star' : 'empty-star'}>Star</span>
  ),
  User: () => <span>UserIcon</span>,
}))

describe('UserDetails Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders user basic information', () => {
    render(<UserDetails />)

    expect(screen.getByText('User Details')).toBeInTheDocument()

    const nameElements = screen.getAllByText('Grace Effiom')
    expect(nameElements.length).toBeGreaterThan(0)

    expect(screen.getByText('LSQFf587g90')).toBeInTheDocument()

    const emails = screen.getAllByText('grace@lendsqr.com')
    expect(emails.length).toBeGreaterThan(0)

    const phoneNumbers = screen.getAllByText('08012345678')
    expect(phoneNumbers.length).toBeGreaterThan(0)

    const bvnElements = screen.getAllByText('12345678901')
    expect(bvnElements.length).toBeGreaterThan(0)
  })

  it('navigates back to users page when back button is clicked', async () => {
    render(<UserDetails />)

    await userEvent.click(
      screen.getByRole('button', { name: /back to users/i })
    )

    expect(mockNavigate).toHaveBeenCalled()
  })

  it('renders correct number of filled stars for user tier', () => {
    render(<UserDetails />)

    const filledStars = screen.getAllByTestId('filled-star')
    const emptyStars = screen.getAllByTestId('empty-star')

    expect(filledStars.length).toBe(1)
    expect(emptyStars.length).toBe(2)
  })

  it('switches active tab when a tab is clicked', async () => {
    render(<UserDetails />)

    const documentsTab = screen.getByRole('button', { name: /documents/i })

    await userEvent.click(documentsTab)

    expect(documentsTab).toHaveClass('active')
  })
})
