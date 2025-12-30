import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UsersPage from './Users'
import type { User } from '../../types/types'

const mockNavigate = jest.fn()
const mockSetUser = jest.fn()
const mockHandleApiError = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock('../../contexts/UserInfoContext', () => ({
  useUser: () => ({
    setUser: mockSetUser,
  }),
}))

jest.mock('../../utils/handleApiError', () => ({
  handleApiError: (err: unknown) => mockHandleApiError(err),
}))

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn(),
}))

jest.mock('../../layouts/DashboardLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

jest.mock('../../components/PageTitle', () => ({
  PageTitle: ({ title }: { title: string }) => <h1>{title}</h1>,
}))

jest.mock('./UserStats', () => () => <div>User Stats</div>)

jest.mock('../../components/table/UserTable', () => ({
  __esModule: true,
  default: ({
    users,
    loading,
    onRowClick,
  }: {
    users?: User[]
    loading: boolean
    onRowClick: (user: User) => void
  }) => (
    <div>
      {loading && <p>Loading...</p>}
      {users?.map((user) => (
        <button
          key={user.id}
          onClick={() => onRowClick(user)}
        >
          {user.email}
        </button>
      ))}
    </div>
  ),
}))

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '1234567890',
    createdAt: '2023-01-01',
    gender: 'Male',
    bvn: 0
  },
]

import { useUsers } from '../../hooks/useUsers'

describe('UsersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders users page correctly', () => {
    (useUsers as jest.Mock).mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
      error: null,
    })

    render(<UsersPage />)

    expect(screen.getByText(/users/i)).toBeInTheDocument()
    expect(screen.getByText('User Stats')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    (useUsers as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    })

    render(<UsersPage />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('handles API error', () => {
    const apiError = new Error('Failed to fetch users')

    ;(useUsers as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: apiError,
    })

    render(<UsersPage />)

    expect(mockHandleApiError).toHaveBeenCalledWith(apiError)
  })

  it('navigates to user details on row click', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
      error: null,
    })

    render(<UsersPage />)

    await userEvent.click(screen.getByText('john@example.com'))

    expect(mockSetUser).toHaveBeenCalledWith(mockUsers[0])
    expect(mockNavigate).toHaveBeenCalled()
  })
})
