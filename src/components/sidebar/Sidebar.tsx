import React, { useState } from 'react'
import Briefcase from '../../assets/briefcase.svg'
import Home from '../../assets/home.svg'
import UserFriends from '../../assets/user-friends.svg'
import Users from '../../assets/users.svg'
import Sack from '../../assets/sack.svg'
import Decision from '../../assets/decision.svg'
import PiggyBank from '../../assets/piggy-bank.svg'
import Loan from '../../assets/loan.svg'
import UserCheck from '../../assets/user-check.svg'
import UserTimes from '../../assets/user-times.svg'
import Savings from '../../assets/savings.svg'
import CoinsSolid from '../../assets/coins-solid.svg'
import Transactions from '../../assets/transactions.svg'
import Galaxy from '../../assets/galaxy.svg'
import UserCog from '../../assets/user-cog.svg'
import Scroll from '../../assets/scroll.svg'
import ChartBar from '../../assets/chart-bar.svg'
import Sliders from '../../assets/sliders.svg'
import PercentBadge from '../../assets/badge-percent.svg'
import ClipboardList from '../../assets/clipboard-list.svg'
import './sidebar.scss'
import '../../styles/globals.scss'
import { ChevronDown } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState('Users')

  const menuItems = {
    main: [
      { icon: Briefcase, label: 'Switch Organization', hasDropdown: true },
      { icon: Home, label: 'Dashboard' },
    ],
    customers: [
      { icon: UserFriends, label: 'Users' },
      { icon: Users, label: 'Guarantors' },
      { icon: Sack, label: 'Loans' },
      { icon: Decision, label: 'Decision Models' },
      { icon: PiggyBank, label: 'Savings' },
      { icon: Loan, label: 'Loan Requests' },
      { icon: UserCheck, label: 'Whitelist' },
      { icon: UserTimes, label: 'Karma' },
    ],
    businesses: [
      { icon: Briefcase, label: 'Organization' },
      { icon: Loan, label: 'Loan Products' },
      { icon: Savings, label: 'Savings Products' },
      { icon: CoinsSolid, label: 'Fees and Charges' },
      { icon: Transactions, label: 'Transactions' },
      { icon: Galaxy, label: 'Services' },
      { icon: UserCog, label: 'Service Account' },
      { icon: Scroll, label: 'Settlements' },
      { icon: ChartBar, label: 'Reports' },
    ],
    settings: [
      { icon: Sliders, label: 'Preferences' },
      { icon: PercentBadge, label: 'Fees and Pricing' },
      { icon: ClipboardList, label: 'Audit Logs' },
    ],
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''} custom-scrollbar`}>
      <div className="sidebar-content">
        {menuItems.main.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${item.label === activeItem ? 'active' : ''}`}
            onClick={() => setActiveItem(item.label)}
          >
            <img src={item.icon} className="menu-icon" />
            <span className="menu-label">{item.label}</span>
            {item.hasDropdown && <ChevronDown className="dropdown-icon" style={{ marginLeft: 0 }} size={16} />}
          </div>
        ))}

        <div className="menu-section">
          <div className="section-title">CUSTOMERS</div>
          {menuItems.customers.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${item.label === activeItem ? 'active' : ''}`}
              onClick={() => setActiveItem(item.label)}
            >
              <img src={item.icon} className="menu-icon" />
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="menu-section">
          <div className="section-title">BUSINESSES</div>
          {menuItems.businesses.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${item.label === activeItem ? 'active' : ''}`}
              onClick={() => setActiveItem(item.label)}
            >
              <img src={item.icon} className="menu-icon" />
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="menu-section">
          <div className="section-title">SETTINGS</div>
          {menuItems.settings.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${item.label === activeItem ? 'active' : ''}`}
              onClick={() => setActiveItem(item.label)}
            >
              <img src={item.icon} className="menu-icon" />
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
