import React, { createContext, useContext, useState, useMemo, type ReactNode } from 'react'

export interface SidebarContextType {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (o: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false)

  const contextValue = useMemo(
    () => ({
      mobileSidebarOpen,
      setMobileSidebarOpen
    }),
    [mobileSidebarOpen]
  )

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>
}

export const useSidebarContext = (): SidebarContextType => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within an SidebarProvider')
  }
  return context
}
