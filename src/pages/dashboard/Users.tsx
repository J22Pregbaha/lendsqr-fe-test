import { useState } from 'react'
import { PageTitle } from '../../components/PageTitle'
import DashboardLayout from '../../layouts/DashboardLayout'
import UserStats from './UserStats'
import { useUsers } from '../../hooks/useUsers'
import UserTable from '../../components/table/UserTable'
import { handleApiError } from '../../utils/handleApiError'
import type { AxiosError } from 'axios'
import type { User } from '../../types/types'
import { useUser } from '../../contexts/UserInfoContext'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../constants/routePath'

export default function LoginPage() {
  const { setUser } = useUser()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const navigate = useNavigate()

  const { data, isLoading } = useUsers(page, limit, {
    onError: (err: AxiosError) => handleApiError(err),
  })

  const onRowClick = (user: User) => {
    setUser(user)
    navigate(routes.USER_DETAILS)
  }

  return (
    <DashboardLayout>
      <PageTitle
        title="Users"
        description="View Users"
      />

      <UserStats />
      <UserTable
        users={data}
        currentPage={page}
        setCurrentPage={setPage}
        recordsPerPage={limit}
        setRecordsPerPage={setLimit}
        loading={isLoading}
        onRowClick={onRowClick}
      />
    </DashboardLayout>
  )
}
