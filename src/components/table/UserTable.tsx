import React from 'react'
import type { User } from '../../types/types'
import './table.scss'

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
  const totalRecords = 100

  const totalPages = Math.ceil(totalRecords / recordsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleRecordsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecordsPerPage(Number(e.target.value))
    setCurrentPage(1)
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
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 6L8 3L11 6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 10L8 13L11 10" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </th>
              <th>
                <div className="th-content">
                  USERNAME
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 6L8 3L11 6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 10L8 13L11 10" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </th>
              <th>
                <div className="th-content">
                  EMAIL
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 6L8 3L11 6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 10L8 13L11 10" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </th>
              <th>
                <div className="th-content">
                  PHONE NUMBER
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 6L8 3L11 6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 10L8 13L11 10" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </th>
              <th>
                <div className="th-content">
                  DATE JOINED
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 6L8 3L11 6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 10L8 13L11 10" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </th>
              <th>
                <div className="th-content">
                  STATUS
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 6L8 3L11 6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 10L8 13L11 10" stroke="currentColor" strokeWidth="1.5"/>
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
                  <td>{user.createdAt}</td>
                  <td>
                    <span className={'status status-active'}>
                      {'Active'}
                    </span>
                  </td>
                  <td>
                    <button className="menu-btn">
                      <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                        <circle cx="2" cy="2" r="2" fill="currentColor"/>
                        <circle cx="2" cy="8" r="2" fill="currentColor"/>
                        <circle cx="2" cy="14" r="2" fill="currentColor"/>
                      </svg>
                    </button>
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
