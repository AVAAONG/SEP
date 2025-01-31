import { SidebarNav } from '@/components/catchment/SidebarPostulationForm';

import { Divider } from '@nextui-org/react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formulario de postulación',
  description: 'Formulario de postulación al Programa Excelencia AVAA',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <main className="p-10 min-h-screen flex flex-col space-y-4 bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold text-primary-light">
        Formulario de postulación ProExcelencia
      </h1>
      <Divider />
      <div className="flex flex-col lg:flex-row gap-4 md:gap-10 ">
        <aside className="lg:w-1/6 lg:h-full mt-1">
          <SidebarNav currentStep={9} />
        </aside>
        <div className="flex-1 lg:w-full">{children}</div>
      </div>
    </main>
  );
}
