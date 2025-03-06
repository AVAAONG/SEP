// hooks/use-sidebar-context.tsx
'use client';
import { createContext, ReactNode, useContext } from 'react';
import { useSidebar } from './use-sidebar';

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
  defaultOpen = true,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const sidebarState = useSidebar(defaultOpen);

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
