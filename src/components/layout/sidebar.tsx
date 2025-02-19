'use client';

import { useSidebar } from '@/hooks/use-sidebar';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Button, cn, Image } from '@heroui/react';
import Link from 'next/link';
import { Menu } from './menu';

export function Sidebar() {
  const sidebar = useSidebar();
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        !getOpenState() ? 'w-[70px]' : 'w-72',
        settings.disabled && 'hidden'
      )}
    >
      <div className="invisible lg:visible absolute top-[12px] -right-[17px] z-20">
        <Button
          isIconOnly
          onPress={toggleOpen}
          className="rounded-md w-8 h-8 bg-white"
          variant="flat"
        >
          <ChevronLeftIcon
            className={cn(
              'h-4 w-4 transition-transform ease-in-out duration-700',
              isOpen === false ? 'rotate-180' : 'rotate-0'
            )}
          />
        </Button>
      </div>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <Link
          className={cn(
            'flex gap-1 justify-center items-center',
            'transition-transform ease-in-out duration-300 ',
            !getOpenState() ? 'translate-x-1' : 'translate-x-0'
          )}
          href="/dashboard"
        >
          <Image src="/logo-proexcelencia-cap.png" width={40} />
          <Image
            src="/logo-proexcelencia-words.png"
            width={180}
            height={20}
            className={cn(
              'transition-[transform,opacity,display] ease-in-out duration-300 z-50',
              !getOpenState() ? '-translate-x-96 opacity-0 hidden' : 'translate-x-0 opacity-100'
            )}
          />
        </Link>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
