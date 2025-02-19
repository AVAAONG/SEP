'use client';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@heroui/react';

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebar();
  const { getOpenState, settings } = sidebar;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[70px]' : 'lg:ml-72')
        )}
      >
        <Navbar title={'Panel general'} />
        <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
      </main>
      {/* <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
        )}
      >
        <Footer />
      </footer> */}
    </>
  );
}
