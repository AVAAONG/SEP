'use client';
import { useSidebarContext } from '@/hooks/sidebar-context';
import ScholarFooter from './ScholarFooter';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen: isSidebarOpen } = useSidebarContext();
  return (
    <main
      className={`${isSidebarOpen ? 'md:ml-72' : ''} p-2.5 md:p-4 h-auto transition-all duration-300 ease-in-out`}
    >
      {children}
      <ScholarFooter />
    </main>
  );
};

export default MainLayout;
