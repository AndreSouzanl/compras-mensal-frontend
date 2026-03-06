'use client'

import { createContext, useContext, useState } from "react"

const SidebarContext = createContext()

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  function abrirMenu() { setIsOpen(true) }
  function fecharMenu() { setIsOpen(false) }
  function toggleMenu() { setIsOpen(!isOpen) }

  return (
    <SidebarContext.Provider value={{ isOpen, abrirMenu, fecharMenu, toggleMenu }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}