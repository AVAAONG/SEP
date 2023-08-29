'use client';
import ThemeToggleButton from '@/components/scholar/NavigationBar/ThemeToggleButton';
import ProfileDropdown from '@/components/scholar/ProfileDropdown';
import { sidebarAtom } from '@/state/mainState';
import { useAtom } from 'jotai';

const Navbar = () => {
  const [isOpen, setSidebar] = useAtom(sidebarAtom);

  const setUpSidebar = () => {
    isOpen ? setSidebar(false) : setSidebar(true);
  };
  return (
    <nav className="block h-12 w-full top-0 left-0 mb-4">
      <div className="flex justify-between gap-4">
        <button
          onClick={setUpSidebar}
          type="button"
          className="inline-flex items-center p-2 text-sm text-white dark:text-emerald-500 rounded-lg  focus:outline-none focus:ring-2 bg-green-600  dark:bg-green-800 text-emerlad-400 hover:bg-emerald-600 dark:hover:bg-emerald-950 focus:ring-emerald-600"
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
          <div className="inline-flex items-center p-2 text-sm  rounded-lg  focus:outline-none focus:ring-2 bg-green-600 dark:bg-green-950 text-emerlad-400 hover:bg-emerald-600 dark:hover:bg-emerald-950 focus:ring-emerald-600">
            <ThemeToggleButton />
          </div>
          <div className="flex items-center justify-start">
            <ProfileDropdown name={'Erika Campos'} email={'Erika Campos'} image={null} />
          </div>
        </div>
      </div>
      {/* <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white bg-gray-800 md:bg-gray-900 border-gray-700">
                <li>
                    <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 text-white" aria-current="page">Home</a>
                </li>
                <li>
                    <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">About</a>
                </li>
                <li>
                    <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Services</a>
                </li>
                <li>
                    <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Contact</a>
                </li>
            </ul>
        </div> */}
    </nav>
  );
};

export default Navbar;
