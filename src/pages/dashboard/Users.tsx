import { PageTitle } from '../../components/PageTitle'
import DashboardLayout from '../../layouts/DashboardLayout'
import UserStats from './UserStats'

export default function LoginPage() {

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
