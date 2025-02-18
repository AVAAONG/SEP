'use client';

import { ChevronDownIcon, DotIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@nextui-org/react';
import { Collapse, CollapseItem } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@nextui-org/react';
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
    <Collapse
      expanded={isCollapsed}
      onChange={() => setIsCollapsed(!isCollapsed)}
      className="w-full"
    >
      <CollapseItem
        title={
          <Button
            variant={isSubmenuActive ? 'secondary' : 'ghost'}
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
            variant={(active === undefined && pathname === href) || active ? 'secondary' : 'ghost'}
            className="w-full justify-start h-10 mb-1"
            asChild
          >
            <Link href={href}>
              <span className="mr-4 ml-2">
                <DotIcon className="w-5 h-5" />
              </span>
              <p className="max-w-[170px] truncate">{label}</p>
            </Link>
          </Button>
        ))}
      </CollapseItem>
    </Collapse>
  ) : (
    <Dropdown>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownTrigger>
              <Button
                variant={isSubmenuActive ? 'secondary' : 'ghost'}
                className="w-full justify-start h-10 mb-1"
              >
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span className={isOpen === false ? '' : 'mr-4'}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <p
                      className={`max-w-[200px] truncate ${isOpen === false ? 'opacity-0' : 'opacity-100'}`}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenu>
        <DropdownItem key="label" className="max-w-[190px] truncate">
          {label}
        </DropdownItem>
        {submenus.map(({ href, label, active }, index) => (
          <DropdownItem key={index} asChild>
            <Link
              className={`cursor-pointer ${((active === undefined && pathname === href) || active) && 'bg-secondary'}`}
              href={href}
            >
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
