import React, { useState } from 'react'
import { ArrowLeft, Star, User } from 'lucide-react'
import './user-details.scss'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../constants/routePath'
import { useUser } from '../../contexts/UserInfoContext'

interface MockUserDetailsData {
  userTier: number;
  balance: string;
  accountNumber: string;
  bankName: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

const UserDetails: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  const [activeTab, setActiveTab] = useState('general-details')

  const userData: MockUserDetailsData = {
    userTier: 1,
    balance: '₦200,000.00',
    accountNumber: '9912345678',
    bankName: 'Providus Bank',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: 'Parent\'s Apartment',
    levelOfEducation: 'B.Sc',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'FinTech',
    durationOfEmployment: '2 years',
    officeEmail: 'grace@lendsqr.com',
    monthlyIncome: '₦200,000.00- ₦400,000.00',
    loanRepayment: '40,000'
  }

  const tabs = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System'
  ]

  const renderStars = (tier: number) => {
    return (
      <div className="stars">
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            size={16}
            fill={star <= tier ? '#E9B200' : 'none'}
            stroke={star <= tier ? '#E9B200' : '#E9B200'}
          />
        ))}
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="user-details-page">
        <button
          className="back-button"
          onClick={() => navigate(routes.USERS)}
        >
          <ArrowLeft size={20} />
          Back to Users
        </button>

        <div className="page-header">
          <h1>User Details</h1>
          <div className="action-buttons">
            <button className="btn-blacklist">BLACKLIST USER</button>
            <button className="btn-activate">ACTIVATE USER</button>
          </div>
        </div>

        <div className="user-summary-card">
          <div className='summary-details'>
            <div className="user-profile-section">
              <div className="user-picture">
                <User size={40} />
              </div>
              <div className="user-basic-info">
                <h2>{user.name}</h2>
                <p className="user-id">{user.id}</p>
              </div>
            </div>

            <div className="divider-vertical" />

            <div className="user-tier-section">
              <p className="label">User's Tier</p>
              {renderStars(userData.userTier)}
            </div>

            <div className="divider-vertical" />

            <div className="user-bank-section">
              <p className="balance">{userData.balance}</p>
              <p className="account-info">{userData.accountNumber}/{userData.bankName}</p>
            </div>
          </div>

          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab.toLowerCase().replace(/ /g, '-') ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.toLowerCase().replace(/ /g, '-'))}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="details-content">
          <section className="info-section">
            <h3 className="info-section-title">Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">FULL NAME</p>
                <p className="info-value">{user.name}</p>
              </div>
              <div className="info-item">
                <p className="info-label">PHONE NUMBER</p>
                <p className="info-value">{user.phoneNumber}</p>
              </div>
              <div className="info-item">
                <p className="info-label">EMAIL ADDRESS</p>
                <p className="info-value">{user.email}</p>
              </div>
              <div className="info-item">
                <p className="info-label">BVN</p>
                <p className="info-value">{user.bvn}</p>
              </div>
              <div className="info-item">
                <p className="info-label">GENDER</p>
                <p className="info-value">{user.gender}</p>
              </div>
              <div className="info-item">
                <p className="info-label">MARITAL STATUS</p>
                <p className="info-value">{userData.maritalStatus}</p>
              </div>
              <div className="info-item">
                <p className="info-label">CHILDREN</p>
                <p className="info-value">{userData.children}</p>
              </div>
              <div className="info-item">
                <p className="info-label">TYPE OF RESIDENCE</p>
                <p className="info-value">{userData.typeOfResidence}</p>
              </div>
            </div>
          </section>

          <div className="divider-horizontal" />

          <section className="info-section">
            <h3 className="info-section-title">Education and Employment</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">LEVEL OF EDUCATION</p>
                <p className="info-value">{userData.levelOfEducation}</p>
              </div>
              <div className="info-item">
                <p className="info-label">EMPLOYMENT STATUS</p>
                <p className="info-value">{userData.employmentStatus}</p>
              </div>
              <div className="info-item">
                <p className="info-label">SECTOR OF EMPLOYMENT</p>
                <p className="info-value">{userData.sectorOfEmployment}</p>
              </div>
              <div className="info-item">
                <p className="info-label">DURATION OF EMPLOYMENT</p>
                <p className="info-value">{userData.durationOfEmployment}</p>
              </div>
              <div className="info-item">
                <p className="info-label">OFFICE EMAIL</p>
                <p className="info-value">{userData.officeEmail}</p>
              </div>
              <div className="info-item">
                <p className="info-label">MONTHLY INCOME</p>
                <p className="info-value">{userData.monthlyIncome}</p>
              </div>
              <div className="info-item">
                <p className="info-label">LOAN REPAYMENT</p>
                <p className="info-value">{userData.loanRepayment}</p>
              </div>
            </div>
          </section>

          <div className="divider-horizontal" />

          <section className="info-section">
            <h3 className="info-section-title">Socials</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">TWITTER</p>
                <p className="info-value">@grace_effiom</p>
              </div>
              <div className="info-item">
                <p className="info-label">FACEBOOK</p>
                <p className="info-value">Grace Effiom</p>
              </div>
              <div className="info-item">
                <p className="info-label">INSTAGRAM</p>
                <p className="info-value">@grace_effiom</p>
              </div>
            </div>
          </section>

          <div className="divider-horizontal" />

          <section className="info-section">
            <h3 className="info-section-title">Guarantor</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">FULL NAME</p>
                <p className="info-value">Debby Ogana</p>
              </div>
              <div className="info-item">
                <p className="info-label">PHONE NUMBER</p>
                <p className="info-value">07060780922</p>
              </div>
              <div className="info-item">
                <p className="info-label">EMAIL ADDRESS</p>
                <p className="info-value">debby@gmail.com</p>
              </div>
              <div className="info-item">
                <p className="info-label">RELATIONSHIP</p>
                <p className="info-value">Sister</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default UserDetails
