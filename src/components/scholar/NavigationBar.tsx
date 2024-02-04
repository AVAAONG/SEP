'use client';
import { createCVACard } from '@/lib/serverAction';
import { scholarSidebarAtom } from '@/lib/state/mainState';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useDisclosure } from '@nextui-org/modal';
import { Tab, Tabs } from '@nextui-org/tabs';
import { useAtom } from 'jotai';
import { signOut } from 'next-auth/react';
import { MenuIcon } from 'public/svgs/svgs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import BasicModal from '../BasicModal';
import ThemeToggleButton from './NavigationBar/ThemeToggleButton';
interface NavigationBarProps {
  image: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const NavigationBar = ({ image, name, email }: NavigationBarProps) => {
  const [isSidebarOpen, setSidebarOpen] = useAtom(scholarSidebarAtom);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selected, setSelected] = useState<React.Key>('centro');
  useSWR(`/api/setAuthCookie?cookieValue=SCHOLAR`, fetcher);
  return (
    <nav className="bg-gray-50  px-4 py-2 dark:bg-black  left-0 right-0 top-0 z-30">
      <div
        className={`${isSidebarOpen ? 'md:ml-72' : ''} flex items-center justify-between gap-4 `}
      >
        <div className="flex justify-start items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 text-green-600 rounded-lg cursor-pointer  hover:text-green-900 dark:text-green-700  dark:hover:text-emerald-950 focus:bg-transparent hover:bg-green-100 dark:hover:bg-emerald-900 focus:outline-none focus:ring-1 focus:ring-green-200 hover:bg-transparent"
          >
            <div className="w-6 h-6">
              <MenuIcon />
            </div>
            <span className="sr-only">Toggle sidebar</span>
          </button>
        </div>
        <div className="flex gap-4 md:gap-8 items-center justify-start">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" color="success">
                Solicitudes
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Solicitudes" variant="flat">
              {/* <DropdownItem key="constancia de becario">Carta de recomendación</DropdownItem> */}
              <DropdownItem key="CVA" onPress={onOpen}>
                Carta de incorporación al CVA
              </DropdownItem>
              {/* <DropdownItem key="constancia de becario">Constancia de becario</DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
          {/* <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <span className="hidden md:flex">Registra tus higlights</span>
              <span className="visible sm:hidden">Higlights</span>
            </span>
            <HighlightsForm />
          </button> */}
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
              {/* <DropdownItem key="configurations" href="/becario/configuracion">
                Configuracion
              </DropdownItem> */}
              <DropdownItem key="logout" color="danger" onClick={async () => signOut()}>
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <BasicModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          title="Carta de inscripción al CVA"
          Content={() => {
            return (
              <div className="w-full flex flex-col gap-4 text-sm">
                <h1 className="text-center font-bold">
                  ¿En cual sede del CVA te gustaria cursar estudios?
                </h1>
                <div className="flex justify-center items-center">
                  <Tabs
                    color="success"
                    selectedKey={selected}
                    onSelectionChange={(key) => {
                      setSelected(key);
                    }}
                    classNames={{
                      tabList: 'bg-gray-100 dark:bg-gray-800',
                    }}
                    aria-label="Tabs colors"
                    radius="full"
                  >
                    <Tab key="centro" title="El centro" />
                    <Tab key="mercedes" title="Las mercedes" />
                  </Tabs>
                </div>
              </div>
            );
          }}
          isButtonDisabled={false}
          onConfirm={async () => {
            onClose();
            toast.promise(createCVACard(email, selected.toString() as 'mercedes' | 'centro'), {
              pending: 'Creando carta del CVA',
              success:
                'Carta de CVA creada correctamente, revisa tu correo para descargar la carta',
              error: 'Error al crear carta de incorporación',
            });
          }}
          confirmText="Confirmar solicitud"
        />
      </div>
    </nav>
  );
};

export default NavigationBar;
