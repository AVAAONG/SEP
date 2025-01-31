'use client';
import {
  AcademicCapIcon,
  Bars4Icon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  LanguageIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Button, Link, Select, SelectItem } from '@nextui-org/react';

import { usePathname, useRouter } from 'next/navigation';

const SIDEBAR_NAV_ITEMS = [
  {
    title: 'Datos personales',
    href: '/captacion/postulacion',
    icon: <UserIcon className="w-5" />,
    step: 1,
  },
  {
    title: 'Datos de contacto',
    href: '/captacion/postulacion/contacto',
    icon: <AcademicCapIcon className="w-5" />,
    step: 2,
  },
  {
    title: 'Datos familiares',
    href: '/captacion/postulacion/familia',
    icon: <UserGroupIcon className="w-5" />,
    step: 3,
  },
  {
    title: 'Situación laboral',
    href: '/captacion/postulacion/laboral',
    icon: <BriefcaseIcon className="w-5" />,
    step: 4,
  },
  {
    title: 'Conocimiento de idiomas',
    href: '/captacion/postulacion/idiomas',
    icon: <LanguageIcon className="w-5" />,
    step: 5,
  },
  {
    title: 'Educación secundaria',
    href: '/captacion/postulacion/secundaria',
    icon: <BuildingOfficeIcon className="w-5" />,
    step: 6,
  },
  {
    title: 'Educación universitaria',
    href: '/captacion/postulacion/universidad',
    icon: <BuildingLibraryIcon className="w-5" />,
    step: 7,
  },
  {
    title: 'Información adicional',
    href: '/captacion/postulacion/adicional',
    icon: <Bars4Icon className="w-5" />,
    step: 8,
  },
  {
    title: 'Anexos',
    href: '/captacion/postulacion/anexos',
    icon: <ClipboardDocumentListIcon className="w-5" />,
    step: 9,
  },
];

export function SidebarNav({ currentStep }: { currentStep: number }) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const router = useRouter();

  const disabledSteps = SIDEBAR_NAV_ITEMS.filter((item) => item.step > currentStep).map(
    (item) => item.href
  );

  const handleChange = (value: string) => router.push(value);
  if (!isDesktop) {
    return (
      <div className="w-full">
        <Select
          items={SIDEBAR_NAV_ITEMS}
          disabledKeys={disabledSteps}
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.data?.href} className="flex items-center space-x-2">
                {item.data?.icon} <p>{item.data?.title}</p>
              </div>
            ));
          }}
          radius="sm"
          className="!w-full"
          defaultSelectedKeys={[pathname]}
          onChange={(event) => handleChange(event.target.value)}
        >
          {(item) => (
            <SelectItem key={item.href} startContent={item.icon}>
              {item.title}
            </SelectItem>
          )}
        </Select>
      </div>
    );
  }

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {SIDEBAR_NAV_ITEMS.map((item) => (
        <Button
          radius="sm"
          size="md"
          color="success"
          as={Link}
          isDisabled={item.step > currentStep}
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
