// hooks/useSidebar.ts
import { useEffect, useState } from 'react';

type UseSidebarReturn = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

/**
 * Hook to manage sidebar state with localStorage persistence
 *
 * @param defaultValue - Default state if no value exists in localStorage
 * @param storageKey - Key used for localStorage
 * @returns Object with sidebar state and control functions
 */
export const useSidebar = (
  defaultValue = false,
  storageKey = 'sidebar-state'
): UseSidebarReturn => {
  // Initialize state from localStorage or use default
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    // Only access localStorage during client-side rendering
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        return stored !== null ? JSON.parse(stored) : defaultValue;
      } catch (error) {
        console.error('Error reading sidebar state from localStorage:', error);
        return defaultValue;
      }
    }
    return defaultValue;
  });

  // Persist state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(isOpen));
    } catch (error) {
      console.error('Error saving sidebar state to localStorage:', error);
    }
  }, [isOpen, storageKey]);

  // Control functions
  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, toggle, open, close };
};
