import { SidebarNav } from '@/components/catchment/SidebarPostulationForm';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Divider } from '@nextui-org/react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Postulación al programa Excelencia',
  description: 'Formulario de postulación al programa de excelencia',
};

const sidebarNavItems = [
  {
    title: 'Datos personales',
    href: '/captacion/postulacion',
    icon: <UserIcon className="w-4" />,
  },
  {
    title: 'Datos de contacto',
    href: '/captacion/postulacion/contacto',
    icon: <AcademicCapIcon className="w-4" />,
  },
  {
    title: 'Datos familiares',
    href: '/captacion/postulacion/familia',
    icon: <BriefcaseIcon className="w-4" />,
  },
  {
    title: 'Situación laboral',
    href: '/captacion/postulacion/laboral',
    icon: <GlobeAltIcon className="w-4" />,
  },
  {
    title: 'Conocimiento de idiomas',
    href: '/captacion/postulacion/idiomas',
    icon: <GlobeAltIcon className="w-4" />,
  },
  {
    title: 'Educación secundaria',
    href: '/captacion/postulacion/secundaria',
    icon: <GlobeAltIcon className="w-4" />,
  },
  {
    title: 'Educación universitaria',
    href: '/captacion/postulacion/universidad',
    icon: <GlobeAltIcon className="w-4" />,
  },
  {
    title: 'Información adicional',
    href: '/captacion/postulacion/adicional',
    icon: <GlobeAltIcon className="w-4" />,
  },
  {
    title: 'Anexos',
    href: '/captacion/postulacion/anexos',
    icon: <GlobeAltIcon className="w-4" />,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <main className="p-10 min-h-screen flex flex-col space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold text-primary-light">
        Formulario de postulación ProExcelencia
      </h1>
      <Divider />
      <div className="flex flex-col lg:flex-row gap-6 ">
        <aside className="lg:w-1/6 lg:h-full mt-1">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:w-full">{children}</div>
      </div>
    </main>
  );
}
