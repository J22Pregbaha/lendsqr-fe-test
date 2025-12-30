import React, { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import { USER_INFO } from '../constants'
import type { User } from '../types/types'

export interface UserInfoContextType {
  user: User;
  setUser: (u: User) => void;
  resetContext: () => void;
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined)

export interface UserInfoProviderProps {
  children: ReactNode;
}

const getInitialUser = (): User => {
  try {
    const storedUser = localStorage.getItem(USER_INFO)
    if (storedUser) {
      return JSON.parse(storedUser)
    }
  } catch (error) {
    console.error('Error reading user from localStorage:', error)
  }

  return {
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    createdAt: '',
    bvn: 0,
    gender: '',
  }
}

export const UserProvider: React.FC<UserInfoProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(getInitialUser)

  const setUserInfo = (user: User) => {
    setUser(user)
    localStorage.setItem(USER_INFO, JSON.stringify(user))
  }

  const resetContext = () => {
    const emptyUser = {
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
      createdAt: '',
      bvn: 0,
      gender: '',
    }
    setUser(emptyUser)
    localStorage.removeItem(USER_INFO)
  }

  const contextValue = useMemo(
    () => ({
      user,
      setUser: setUserInfo,
      resetContext,
    }),
    [user]
  )

  return <UserInfoContext.Provider value={contextValue}>{children}</UserInfoContext.Provider>
}

export const useUser = (): UserInfoContextType => {
  const context = useContext(UserInfoContext)
  if (!context) {
    throw new Error('useUser must be used within an UserProvider')
  }
  return context
}
