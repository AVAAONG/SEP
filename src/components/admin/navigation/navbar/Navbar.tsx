'use client';
import ThemeToggleButton from '@/components/scholar/NavigationBar/ThemeToggleButton';
import { sidebarAtom } from '@/lib/state/mainState';
import { Avatar } from "@heroui/avatar";
import { useAtom } from 'jotai';
import { signOut } from 'next-auth/react';
import { MenuIcon } from '../../../../../public/svgs/svgs';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";

const Navbar = ({ image, email }: { image: string; email: string }) => {
  const [isOpen, setSidebar] = useAtom(sidebarAtom);
  const setUpSidebar = () => (isOpen ? setSidebar(false) : setSidebar(true));
  return (
    <nav className="block h-12 w-full left-0 right-0 top-0 mb-4">
      <div className="flex justify-between gap-4">
        <div className="flex gap-8 justify-center items-center">
          <button
            onClick={setUpSidebar}
            type="button"
            className="w-6 text-primary-light font-medium p-2 text-xl"
          >
            <div className="w-6 font-bold">
              <MenuIcon />
            </div>
          </button>
        </div>

        <div className="flex gap-4  items-center justify-start">
          <div className="inline-flex items-center p-2 text-sm rounded-lg">
            <ThemeToggleButton />
          </div>
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

export default Navbar;
