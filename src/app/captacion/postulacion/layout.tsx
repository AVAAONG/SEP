import { SidebarNav } from '@/components/catchment/SidebarPostulationForm';
import { getServerSession } from '@/lib/auth/authOptions';
import { getApplicantCurrentStep } from '@/lib/db/utils/applicant';
import { redirect } from 'next/navigation';

import { Divider } from '@nextui-org/react';

import Navbar from '@/components/public/admision/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formulario de postulación',
  description: 'Formulario de postulación al Programa Excelencia AVAA',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
  const session = await getServerSession();
  if (!session) redirect('/signin');
  const currentStep = (await getApplicantCurrentStep(session.id)) ?? 1;
  return (
    <>
      <Navbar image={session.image} email={session.email} showProfileDropdown={!!session} />
      <main className="p-10 min-h-screen flex flex-col space-y-4 bg-gray-100 dark:bg-black">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0069B0]">
          Formulario de postulación ProExcelencia
        </h1>
        <Divider />
        <div className="flex flex-col lg:flex-row gap-4 md:gap-10 ">
          <aside className="lg:w-1/6 lg:h-full mt-1">
            <SidebarNav currentStep={currentStep} />
          </aside>
          <div className="flex-1 lg:w-full">{children}</div>
        </div>
      </main>
    </>
  );
}
