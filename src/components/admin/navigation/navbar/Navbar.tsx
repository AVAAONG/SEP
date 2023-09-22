'use client';
import ThemeToggleButton from '@/components/scholar/NavigationBar/ThemeToggleButton';
import ProfileDropdown from '@/components/scholar/ProfileDropdown';
import { sidebarAtom } from '@/lib/state/mainState';
import { useAtom } from 'jotai';
import { MenuIcon } from '../../../../../public/svgs/svgs';

const Navbar = () => {
  const [isOpen, setSidebar] = useAtom(sidebarAtom);
  const setUpSidebar = () => (isOpen ? setSidebar(false) : setSidebar(true));

  return (
    <nav className="block h-10 w-full left-0 right-0 top-0 mb-4">
      <div className="flex justify-between gap-4">
        <button
          onClick={setUpSidebar}
          type="button"
          className="w-6 text-primary-light font-medium p-2 text-xl"
        >
          <div className="w-6 font-bold">
            <MenuIcon />
          </div>
        </button>
        <div className="flex gap-4 ">
          <div className="inline-flex items-center p-2 text-sm rounded-lg">
            <ThemeToggleButton />
          </div>
          <div className="flex items-center justify-start ">
            <ProfileDropdown name={'Erika Campos'} email={'Erika Campos'} image={null} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
