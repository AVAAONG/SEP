'use client';
import { scholarSidebarAtom } from '@/lib/state/mainState';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { ScholarStatus } from '@prisma/client';
import { useAtom } from 'jotai';
import { signOut } from 'next-auth/react';
import ScholarStatusIndicator from '../ScholarStatus';
import { ThemeToggleButton } from '../layout/theme-toggle';
import LetterRequests from './LetterRequests';
interface NavigationBarProps {
  image: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  scholarStatus: ScholarStatus;
  scholarId: string | null | undefined;
}
const NavigationBar = ({ image, name, email, scholarId, scholarStatus }: NavigationBarProps) => {
  const [isSidebarOpen, setSidebarOpen] = useAtom(scholarSidebarAtom);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <nav className="bg-gray-50  px-4 py-2 dark:bg-black  left-0 right-0 top-0 z-30">
      <div
        className={`${isSidebarOpen ? 'md:ml-72' : ''} flex items-center justify-between gap-4 `}
      >
        <div className="flex justify-start items-center">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            startContent={<Bars3Icon className="w-6 h-6" />}
            onPress={toggleSidebar}
          />
        </div>
        <div className="flex gap-4 md:gap-8 items-center justify-start">
          <ScholarStatusIndicator
            scholarData={{
              dni: '',
              firstName: '',
              status: scholarStatus,
              id: '',
              surNames: '',
            }}
            isAdmin={false}
          />
          <LetterRequests email={email} />
          <ThemeToggleButton />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                src={image as string | undefined}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Registrad@ con</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>
              <DropdownItem key="publicProfile" href={`/perfilBecario/${scholarId}`}>
                Ver perfil público
              </DropdownItem>
              <DropdownItem key="configurations" href="/becario/configuracion">
                Configuracion
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={async () => signOut()}>
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
