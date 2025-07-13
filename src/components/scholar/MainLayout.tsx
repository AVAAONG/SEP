'use client';
import { scholarSidebarAtom } from '@/lib/state/mainState';
import { useAtom } from 'jotai';
import ScholarFooter from './ScholarFooter';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen] = useAtom(scholarSidebarAtom);
  return (
    <main className={`${isSidebarOpen ? 'md:ml-72' : ''} p-2.5 md:p-4 h-auto`}>
      {children}
      <ScholarFooter />
    </main>
  );
};

export default MainLayout;
