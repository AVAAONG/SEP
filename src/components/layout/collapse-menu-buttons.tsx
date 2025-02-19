'use client';

import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip,
} from '@heroui/react';
import { usePathname } from 'next/navigation';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

interface CollapseMenuButtonProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  submenus: Submenu[];
  isOpen: boolean | undefined;
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
  isOpen,
}: CollapseMenuButtonProps) {
  const pathname = usePathname();
  const isSubmenuActive = submenus.some((submenu) =>
    submenu.active === undefined ? submenu.href === pathname : submenu.active
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  return isOpen ? (
    <Accordion onChange={() => setIsCollapsed(!isCollapsed)} className="w-full">
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        subtitle={
          <Button
            variant={isSubmenuActive ? 'solid' : 'light'}
            className="w-full justify-start h-10"
          >
            <div className="w-full items-center flex justify-between">
              <div className="flex items-center">
                <span className="mr-4">
                  <Icon className="w-5 h-5" />
                </span>
                <p className="max-w-[150px] truncate">{label}</p>
              </div>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
              />
            </div>
          </Button>
        }
      >
        {submenus.map(({ href, label, active }, index) => (
          <Button
            key={index}
            href={href}
            as={Link}
            variant={(active === undefined && pathname === href) || active ? 'solid' : 'light'}
            className="w-full justify-start h-10 mb-1"
          >
            <span className="mr-4 ml-2">
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </span>
            <p className="max-w-[170px] truncate">{label}</p>
          </Button>
        ))}
      </AccordionItem>
    </Accordion>
  ) : (
    <Dropdown>
      <Tooltip content={label}>
        <DropdownTrigger>
          <Button
            variant={isSubmenuActive ? 'solid' : 'light'}
            className="w-full justify-start h-10 mb-1"
          >
            <div className="w-full items-center flex justify-between">
              <div className="flex items-center">
                <div className={isOpen === false ? '' : 'mr-4'}>
                  <Icon className="w-5 h-5" />
                </div>
                <p
                  className={`max-w-[200px] truncate ${isOpen === false ? 'opacity-0' : 'opacity-100'}`}
                >
                  {label}
                </p>
              </div>
            </div>
          </Button>
        </DropdownTrigger>
      </Tooltip>

      <DropdownMenu>
        <DropdownSection showDivider aria-label="Profile & Actions">
          <DropdownItem key="label" className="max-w-[190px] truncate">
            {label}
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider aria-label="Profile & Actions">
          {submenus.map(({ href, label, active }, index) => (
            <DropdownItem
              key={index}
              href={href}
              className={`cursor-pointer ${((active === undefined && pathname === href) || active) && 'bg-secondary'}`}
            >
              <p className="max-w-[180px] truncate">{label}</p>
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
