import { useState } from 'react'
import { PageTitle } from '../../components/PageTitle'
import DashboardLayout from '../../layouts/DashboardLayout'
import UserStats from './UserStats'
import { useUsers } from '../../hooks/useUsers'
import UserTable from '../../components/table/UserTable'

export default function LoginPage() {

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading } = useUsers(page, limit)

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
      />
    </DashboardLayout>
  )
}
