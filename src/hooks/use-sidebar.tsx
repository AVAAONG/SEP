import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type SidebarSettings = {
  disabled: boolean;
  isHoverOpen: boolean;
};

export type SidebarStore = {
  isOpen: boolean;
  isHover: boolean;
  settings: SidebarSettings;
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsHover: (isHover: boolean) => void;
  getOpenState: () => boolean;
  setSettings: (settings: Partial<SidebarSettings>) => void;
};

const defaultSettings: SidebarSettings = {
  disabled: false,
  isHoverOpen: false,
};

const SidebarContext = createContext<SidebarStore | undefined>(undefined);

type SidebarProviderProps = { children: ReactNode };

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const stored = localStorage.getItem('sidebar:isOpen');
    return stored ? JSON.parse(stored) : true;
  });
  const [isHover, setIsHover] = useState<boolean>(false);
  const [settings, setSettingsState] = useState<SidebarSettings>(() => {
    const stored = localStorage.getItem('sidebar:settings');
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('sidebar:isOpen', JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar:settings', JSON.stringify(settings));
  }, [settings]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const setSettings = (newSettings: Partial<SidebarSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...newSettings }));
  };

  const getOpenState = () => {
    return isOpen || (settings.isHoverOpen && isHover);
  };

  const store: SidebarStore = {
    isOpen,
    isHover,
    settings,
    toggleOpen,
    setIsOpen,
    setIsHover,
    getOpenState,
    setSettings,
  };

  return <SidebarContext.Provider value={store}>{children}</SidebarContext.Provider>;
};

export const useSidebar = (): SidebarStore => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
