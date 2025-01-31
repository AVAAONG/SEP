'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Button, Divider, Select } from '@nextui-org/react';

import { usePathname, useRouter } from 'next/navigation';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const router = useRouter();

  const handleChange = (value: string) => router.push(value);

  if (!isDesktop) {
    return (
      <div className="w-full">
        <Select
          radius="sm"
          className="!w-full"
          defaultValue={pathname}
          onChange={handleChange}
          options={items.map((item) => ({
            value: item.href,
            label: item.title,
          }))}
        />
        <Divider />
      </div>
    );
  }

  return (
    <nav className={'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'} {...props}>
      {items.map((item) => (
        <Button
          radius="sm"
          size="md"
          color="success"
          key={item.href}
          href={item.href}
          startContent={item.icon}
          variant={pathname === item.href ? 'solid' : 'light'}
        >
          <span className="block text-start w-full">{item.title}</span>
        </Button>
      ))}
    </nav>
  );
}
