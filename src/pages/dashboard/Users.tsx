import { useState } from 'react'
import { PageTitle } from '../../components/PageTitle'
import DashboardLayout from '../../layouts/DashboardLayout'
import UserStats from './UserStats'
import { useUsers } from '../../hooks/useUsers'

export default function LoginPage() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading } = useUsers(page, limit)

  if (isLoading) {return <div>Loading...</div>}
  console.log('look for me', data)

  return (
    <DashboardLayout>
      <PageTitle
        title="Users"
        description="View Users"
      />

      <UserStats />
    </DashboardLayout>
  )
}
