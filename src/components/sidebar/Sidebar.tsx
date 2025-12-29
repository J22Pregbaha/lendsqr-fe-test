import React, { useState } from 'react'
import {
  Briefcase, Home, Users, UserCheck, DollarSign,
  GitBranch, PiggyBank, FileText, UserPlus, Award,
  Building2, Coins, Landmark, Receipt,
  Settings as SettingsIcon, Sliders, DollarSignIcon, FileCheck,
  ChevronDown
} from 'lucide-react'
import './sidebar.scss'
import '../../styles/globals.scss'

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
      { icon: Users, label: 'Users' },
      { icon: UserCheck, label: 'Guarantors' },
      { icon: DollarSign, label: 'Loans' },
      { icon: GitBranch, label: 'Decision Models' },
      { icon: PiggyBank, label: 'Savings' },
      { icon: FileText, label: 'Loan Requests' },
      { icon: UserPlus, label: 'Whitelist' },
      { icon: Award, label: 'Karma' },
    ],
    businesses: [
      { icon: Briefcase, label: 'Organization' },
      { icon: FileText, label: 'Loan Products' },
      { icon: Landmark, label: 'Savings Products' },
      { icon: Coins, label: 'Fees and Charges' },
      { icon: Receipt, label: 'Transactions' },
      { icon: SettingsIcon, label: 'Services' },
      { icon: UserCheck, label: 'Service Account' },
      { icon: FileCheck, label: 'Settlements' },
      { icon: Building2, label: 'Reports' },
    ],
    settings: [
      { icon: Sliders, label: 'Preferences' },
      { icon: DollarSignIcon, label: 'Fees and Pricing' },
      { icon: FileCheck, label: 'Audit Logs' },
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
            <item.icon className="menu-icon" size={16} />
            <span className="menu-label">{item.label}</span>
            {item.hasDropdown && <ChevronDown className="dropdown-icon" size={16} />}
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
              <item.icon className="menu-icon" size={16} />
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
              <item.icon className="menu-icon" size={16} />
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
              <item.icon className="menu-icon" size={16} />
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
