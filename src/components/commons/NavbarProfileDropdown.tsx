'use client';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

const NavbarProfileDropdown = ({ image, email }: { image: string; email: string }) => {
  return (
    <Dropdown placement="bottom-end" size="sm" radius="sm">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform w-9 h-9"
          src={image as string | undefined}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={['profile']}>
        <DropdownItem key="profile" className="h-12 gap-2">
          <p className="font-medium">Registrad@ con</p>
          <p className="font-medium">{email}</p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={async () => signOut()}>
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarProfileDropdown;
