'use client';
import ThemeToggleButton from '@/components/scholar/NavigationBar/ThemeToggleButton';
import ProfileDropdown from '@/components/scholar/ProfileDropdown';
import { sidebarAtom } from '@/lib/state/mainState';
import { useAtom } from 'jotai';

const Navbar = () => {
  const [isOpen, setSidebar] = useAtom(sidebarAtom);

  const setUpSidebar = () => {
    isOpen ? setSidebar(false) : setSidebar(true);
  };
  return (
    <nav className="block h-10 w-full left-0 right-0 top-0 mb-4">
      <div className="flex justify-between gap-4">
        <button
          onClick={setUpSidebar}
          type="button"
          className="inline-flex items-center p-2 text-sm rounded-lg"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
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
