'use client';

import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import { signOut } from 'next-auth/react';

export function UserNavbarDropdown() {
  return (
    <Dropdown placement="bottom-end" radius="sm">
      <DropdownTrigger>
        <Avatar
          as="button"
          fallback="JD"
          className="transition-transform h-8 w-8"
          src={undefined}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={['info']}>
        <DropdownSection showDivider>
          <DropdownItem key="info" className="font-normal">
            <div className=" space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">johndoe@example.com</p>
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem key="logout" color="danger" onClick={async () => signOut()}>
          <div className="flex items-center justify-between w-full">
            <p>Cerrar sesión</p>
            <ArrowRightEndOnRectangleIcon className="w-4 h-4 mr-3 text-muted-foreground" />
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
