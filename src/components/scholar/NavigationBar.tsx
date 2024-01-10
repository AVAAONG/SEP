'use client';
import { scholarSidebarAtom } from '@/lib/state/mainState';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useAtom } from 'jotai';
import { signOut } from 'next-auth/react';
import { MenuIcon } from 'public/svgs/svgs';
import ThemeToggleButton from './NavigationBar/ThemeToggleButton';
interface NavigationBarProps {
  image: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
}

const NavigationBar = ({ image, name, email }: NavigationBarProps) => {
  const [isSidebarOpen, setSidebarOpen] = useAtom(scholarSidebarAtom);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <nav className="bg-gray-50  px-4 py-2 dark:bg-black  left-0 right-0 top-0 z-30">
      <div
        className={`${isSidebarOpen ? 'md:ml-72' : ''} flex items-center justify-between gap-4 `}
      >
        <div className="flex justify-start items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 text-green-600 rounded-lg cursor-pointer  hover:text-green-900 dark:text-green-700  dark:hover:text-emerald-950 focus:bg-transparent hover:bg-green-100 dark:hover:bg-emerald-900 focus:outline-none focus:ring-1 focus:ring-green-200 hover:bg-transparent"
          >
            <div className="w-6 h-6">
              <MenuIcon />
            </div>
            <span className="sr-only">Toggle sidebar</span>
          </button>
        </div>
        <div className="flex gap-4 md:gap-8 items-center justify-start">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" color="success">
                Solicitudes
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Solicitudes" variant="flat">
              <DropdownItem key="constancia de becario">Carta de recomendación</DropdownItem>
              <DropdownItem key="CVA">Carta de incorporación al CVA</DropdownItem>
              <DropdownItem key="constancia de becario">Constancia de becario</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <span className="hidden md:flex">Registra tus higlights</span>
              <span className="visible sm:hidden">Higlights</span>
            </span>
            {/* <HighlightsForm /> */}
          </button>
          <ThemeToggleButton />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                src={image as string | undefined}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Registrad@ con</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>
              <DropdownItem key="configurations" href="/becario/configuracion">
                Configuracion
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={async () => signOut()}>
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
