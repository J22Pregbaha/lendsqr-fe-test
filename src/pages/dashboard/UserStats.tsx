import React from 'react'
import { Users, UserCheck, FileText, PiggyBank } from 'lucide-react'
import './user-stats.scss'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  bgColor: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, bgColor }) => {
  return (
    <div className="stat-card">
      <div className="stat-card__icon" style={{ backgroundColor: bgColor }}>
        {icon}
      </div>

      <p className="stat-card__label">{label}</p>
      <h3 className="stat-card__value">{value}</h3>
    </div>
  )
}

const UserStats: React.FC = () => {
  return (
    <section className="user-stats">
      <h2 className="user-stats__title">Users</h2>

      <div className="user-stats__grid">
        <StatCard
          icon={<Users size={22} />}
          label="USERS"
          value="2,453"
          bgColor="#F5E8FF"
        />

        <StatCard
          icon={<UserCheck size={22} />}
          label="ACTIVE USERS"
          value="2,453"
          bgColor="#E7F0FF"
        />

        <StatCard
          icon={<FileText size={22} />}
          label="USERS WITH LOANS"
          value="12,453"
          bgColor="#FEF0E6"
        />

        <StatCard
          icon={<PiggyBank size={22} />}
          label="USERS WITH SAVINGS"
          value="102,453"
          bgColor="#FFE9ED"
        />
      </div>
    </section>
  )
}

export default UserStats
