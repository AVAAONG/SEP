// hooks/use-sidebar-context.tsx
'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

// Define the context type
interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

// Create context with default values
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Provider component
export function SidebarProvider({
  children,
  defaultOpen = false,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  // Control functions
  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const sidebarState = { isOpen, toggle, open, close };

  return <SidebarContext.Provider value={sidebarState}>{children}</SidebarContext.Provider>;
}

// Consumer hook
export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
}
