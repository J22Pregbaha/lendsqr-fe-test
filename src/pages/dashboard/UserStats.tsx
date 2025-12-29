import React from 'react'
import './user-stats.scss'
import UsersCard from '../../assets/users-card.svg'
import ActiveUsersCard from '../../assets/active-users-card.svg'
import LoanUsersCard from '../../assets/loan-users-card.svg'
import SavingsUsersCard from '../../assets/savings-users-card.svg'

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
          icon={<img src={UsersCard} className='card-icon' />}
          label="USERS"
          value="2,453"
          bgColor="#FCE8FF"
        />

        <StatCard
          icon={<img src={ActiveUsersCard} className='card-icon' />}
          label="ACTIVE USERS"
          value="2,453"
          bgColor="#EEE8FF"
        />

        <StatCard
          icon={<img src={LoanUsersCard} className='card-icon' />}
          label="USERS WITH LOANS"
          value="12,453"
          bgColor="#FEEFEC"
        />

        <StatCard
          icon={<img src={SavingsUsersCard} className='card-icon' />}
          label="USERS WITH SAVINGS"
          value="102,453"
          bgColor="#FFEBF0"
        />
      </div>
    </section>
  )
}

export default UserStats
