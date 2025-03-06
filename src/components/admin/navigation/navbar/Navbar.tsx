'use client';

import { sidebarAtom } from '@/lib/state/mainState';
import { useAtom } from 'jotai';

import { ThemeToggleButton } from '@/components/layout/theme-toggle';
import { UserDropdown } from '@/components/layout/user-dropdown';

const Navbar = () => {
  const [isOpen, setSidebar] = useAtom(sidebarAtom);
  const setUpSidebar = () => (isOpen ? setSidebar(false) : setSidebar(true));
  return (
    <nav className="block h-10 w-full left-0 right-0 top-0 mb-4">
      <div className="flex justify-end gap-4">
        <div className="flex gap-4  items-center justify-start">
          <ThemeToggleButton />
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
