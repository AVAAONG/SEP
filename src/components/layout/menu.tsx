'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getMenuList } from '@/lib/layout/admin-menu-list';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Button, cn, Tooltip } from '@heroui/react';
import { CollapseMenuButton } from './collapse-menu-buttons';

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <nav className="mt-8 h-full w-full">
      <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
        {menuList.map(({ groupLabel, menus }, index) => (
          <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
            {(isOpen && groupLabel) || isOpen === undefined ? (
              <p className="text-sm font-medium  px-4 pb-2 max-w-[248px] truncate">{groupLabel}</p>
            ) : !isOpen && isOpen !== undefined && groupLabel ? (
              <Tooltip content={<p>{groupLabel}</p>}>
                <div className="w-full flex justify-center items-center">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </div>
              </Tooltip>
            ) : (
              <p className="pb-2"></p>
            )}
            {menus.map(({ href, label, icon: Icon, active, submenus }, index) =>
              !submenus || submenus.length === 0 ? (
                <div className="w-full" key={index}>
                  <Tooltip
                    isDisabled={!isOpen}
                    content={isOpen === false ? label : null}
                    placement="right-start"
                  >
                    <Button
                      as={Link}
                      href={href}
                      isIconOnly={!isOpen}
                      variant={
                        (active === undefined && pathname.startsWith(href)) || active
                          ? 'solid'
                          : 'light'
                      }
                    >
                      <Icon className="w-8 h-8" />
                      <p
                        className={cn(
                          'max-w-[200px] truncate',
                          isOpen === false
                            ? '-translate-x-96 opacity-0'
                            : 'translate-x-0 opacity-100'
                        )}
                      >
                        {label}
                      </p>
                    </Button>
                  </Tooltip>
                </div>
              ) : (
                <div className="w-full" key={index}>
                  <CollapseMenuButton
                    icon={Icon}
                    label={label}
                    active={active === undefined ? pathname.startsWith(href) : active}
                    submenus={submenus}
                    isOpen={isOpen}
                  />
                </div>
              )
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
