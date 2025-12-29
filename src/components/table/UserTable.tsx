import React, { useState, useRef, useEffect } from 'react'
import type { User } from '../../types/types'
import './table.scss'
import { formatDateShortComma } from '../../utils/helperFn'

interface Props {
  users: User[]
  currentPage: number
  setCurrentPage: (cp: number) => void
  recordsPerPage: number
  setRecordsPerPage: (cp: number) => void
  loading?: boolean
}

const UserTable = ({
  users,
  currentPage,
  setCurrentPage,
  recordsPerPage,
  setRecordsPerPage,
  loading = false
}: Props) => {
  const [showFilter, setShowFilter] = useState(false)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const totalRecords = 100
  const totalPages = Math.ceil(totalRecords / recordsPerPage)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false)
      }

      if (activeMenuId) {
        const menuRef = menuRefs.current[activeMenuId]
        if (menuRef && !menuRef.contains(event.target as Node)) {
          setActiveMenuId(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeMenuId])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleRecordsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecordsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const toggleMenu = (userId: string) => {
    setActiveMenuId(activeMenuId === userId ? null : userId)
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages - 1)
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push(2)
        pages.push('...')
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const renderSkeletonRows = () => {
    return Array.from({ length: recordsPerPage }).map((_, index) => (
      <tr key={`skeleton-${index}`} className="skeleton-row">
        <td><div className="skeleton-cell" /></td>
        <td><div className="skeleton-cell" /></td>
        <td><div className="skeleton-cell skeleton-cell-wide" /></td>
        <td><div className="skeleton-cell" /></td>
        <td><div className="skeleton-cell skeleton-cell-wide" /></td>
        <td><div className="skeleton-cell skeleton-cell-small" /></td>
        <td><div className="skeleton-cell skeleton-cell-tiny" /></td>
      </tr>
    ))
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  ORGANIZATION
                  <button
                    className="filter-icon"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                {showFilter && (
                  <div className="filter-dropdown" ref={filterRef}>
                    <div className="filter-group">
                      <label>Organization</label>
                      <select>
                        <option value="">Select</option>
                        <option value="lendsqr">Lendsqr</option>
                        <option value="irorun">Irorun</option>
                        <option value="lendstar">Lendstar</option>
                      </select>
                    </div>
                    <div className="filter-group">
                      <label>Username</label>
                      <input type="text" placeholder="User" />
                    </div>
                    <div className="filter-group">
                      <label>Email</label>
                      <input type="email" placeholder="Email" />
                    </div>
                    <div className="filter-group">
                      <label>Date</label>
                      <input type="date" placeholder="Date" />
                    </div>
                    <div className="filter-group">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="Phone Number" />
                    </div>
                    <div className="filter-group">
                      <label>Status</label>
                      <select>
                        <option value="">Select</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                        <option value="blacklisted">Blacklisted</option>
                      </select>
                    </div>
                    <div className="filter-actions">
                      <button className="btn-reset">Reset</button>
                      <button className="btn-filter">Filter</button>
                    </div>
                  </div>
                )}
              </th>
              <th>
                <div className="th-content">
                  USERNAME
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th>
                <div className="th-content">
                  EMAIL
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th>
                <div className="th-content">
                  PHONE NUMBER
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th>
                <div className="th-content">
                  DATE JOINED
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th>
                <div className="th-content">
                  STATUS
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              renderSkeletonRows()
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{'organization'}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{formatDateShortComma(user.createdAt, true)}</td>
                  <td>
                    <span className={'status status-active'}>
                      {'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="action-menu-wrapper">
                      <button
                        className="menu-btn"
                        onClick={() => toggleMenu(user.id)}
                      >
                        <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                          <circle cx="2" cy="2" r="2" fill="currentColor"/>
                          <circle cx="2" cy="8" r="2" fill="currentColor"/>
                          <circle cx="2" cy="14" r="2" fill="currentColor"/>
                        </svg>
                      </button>
                      {activeMenuId === user.id && (
                        <div
                          className="action-menu"
                          ref={(el) => {
                            menuRefs.current[user.id] = el
                          }}
                        >
                          <button className="action-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8 3.5C5.5 3.5 3.5 5.5 3.5 8C3.5 10.5 5.5 12.5 8 12.5C10.5 12.5 12.5 10.5 12.5 8C12.5 5.5 10.5 3.5 8 3.5Z" stroke="currentColor" strokeWidth="1.2"/>
                              <path d="M8 6V8L9.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                            </svg>
                            View Details
                          </button>
                          <button className="action-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12Z" stroke="currentColor" strokeWidth="1.2"/>
                              <path d="M8 4V2M12 5L13.5 3.5M12 9H14M4 9H2M4 5L2.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                            </svg>
                            Blacklist User
                          </button>
                          <button className="action-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8 3.5C5.5 3.5 3.5 5.5 3.5 8C3.5 10.5 5.5 12.5 8 12.5C10.5 12.5 12.5 10.5 12.5 8" stroke="currentColor" strokeWidth="1.2"/>
                              <path d="M12 4L8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                            </svg>
                            Activate User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-info">
          <span>Showing</span>
          <select
            value={recordsPerPage}
            onChange={handleRecordsPerPageChange}
            disabled={loading}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>out of {totalRecords}</span>
        </div>

        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.5 3.5L5 7L8.5 10.5" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`pagination-number ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...' || loading}
            >
              {page}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5.5 3.5L9 7L5.5 10.5" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserTable
