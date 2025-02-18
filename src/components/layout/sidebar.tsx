'use client';

import { useStore } from '@/hooks/use-store';
import { ChevronLeftIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';
import { Button, cn } from '@nextui-org/react';
import Link from 'next/link';

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        !getOpenState() ? 'w-[90px]' : 'w-72',
        settings.disabled && 'hidden'
      )}
    >
      <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
        <Button
          isIconOnly
          // onClick={() => setIsOpen?.()}
          className="rounded-md w-8 h-8"
          // variant="outline"
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
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            !getOpenState() ? 'translate-x-1' : 'translate-x-0'
          )}
          variant="link"
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <PresentationChartLineIcon className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
                !getOpenState() ? '-translate-x-96 opacity-0 hidden' : 'translate-x-0 opacity-100'
              )}
            >
              Brand
            </h1>
          </Link>
        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
