'use client';
import { KindOfCard, createCVACard } from '@/lib/serverAction';
import { scholarSidebarAtom } from '@/lib/state/mainState';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { useDisclosure } from '@nextui-org/modal';
import { Input } from '@nextui-org/react';
import { Tab, Tabs } from '@nextui-org/tabs';
import { ScholarStatus } from '@prisma/client';
import { useAtom } from 'jotai';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from '../BasicModal';
import ScholarStatusIndicator from '../ScholarStatus';
import { ThemeToggleButton } from '../layout/theme-toggle';
interface NavigationBarProps {
  image: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  scholarStatus: ScholarStatus;
  scholarId: string | null | undefined;
}
const NavigationBar = ({ image, name, email, scholarId, scholarStatus }: NavigationBarProps) => {
  const [isSidebarOpen, setSidebarOpen] = useAtom(scholarSidebarAtom);
  const [programName, setProgramName] = useState('');
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const cvaDesincorporationModal = useDisclosure();
  const programProof = useDisclosure();
  const [selected, setSelected] = useState<KindOfCard | undefined>();
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
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" color="success">
                Solicitudes
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Solicitudes" variant="flat">
              <DropdownSection title="Cartas para el C.V.A." showDivider>
                <DropdownItem key="CVA_INCORPORATION" onPress={onOpen}>
                  Incorporación al CVA
                </DropdownItem>
                <DropdownItem key="CVA_DESINCORPORATION" onPress={cvaDesincorporationModal.onOpen}>
                  Desincorporación al CVA
                </DropdownItem>
              </DropdownSection>
              <DropdownItem
                key="PROGRAM_PROOF_ENGLISH"
                onPress={() => {
                  programProof.onOpen();
                  setSelected('program_proof_english');
                  setProgramName('');
                }}
              >
                Carta de recomendacion inglés
              </DropdownItem>
              <DropdownItem
                key="PROGRAM_PROOF_SPANISH"
                onPress={() => {
                  programProof.onOpen();
                  setSelected('program_proof_spanish');
                  setProgramName('');
                }}
              >
                Carta de recomendacion español
              </DropdownItem>
              <DropdownItem
                key="GENERIC_PROGRAM_PROOF"
                onPress={async () => {
                  toast.promise(createCVACard(email, 'generic_program_proof'), {
                    pending: 'Creando constancia de becario.',
                    success:
                      'Constancia de becario creada correctamente, revisa tu correo para descargar la carta',
                    error: 'Error al crear constancia de becario.',
                  });
                }}
              >
                Constancia generica
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

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
        <BasicModal
          isOpen={cvaDesincorporationModal.isOpen}
          onOpenChange={cvaDesincorporationModal.onOpenChange}
          title="Carta de desincorporacion al CVA"
          Content={() => {
            return (
              <div className="w-full flex flex-col gap-4 text-sm">
                <h1 className="text-center font-bold">
                  ¿En cual sede del CVA vas a dejar de cursar estuddios?
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
                    <Tab key="cva_desincorporation_centro" title="El centro" />
                    <Tab key="cva_desincorporation_mercedes" title="Las mercedes" />
                  </Tabs>
                </div>
              </div>
            );
          }}
          isButtonDisabled={false}
          onConfirm={async () => {
            cvaDesincorporationModal.onClose();
            toast.promise(createCVACard(email, selected), {
              pending: 'Creando carta del CVA',
              success:
                'Carta de CVA creada correctamente, revisa tu correo para descargar la carta',
              error: 'Error al crear carta de incorporación',
            });
          }}
          confirmText="Confirmar solicitud"
        />
        <BasicModal
          isOpen={programProof.isOpen}
          onOpenChange={programProof.onOpenChange}
          title="Constancias de becario"
          Content={() => {
            return (
              <div className="w-full flex flex-col gap-4 text-sm">
                <h1 className="text-center font-bold">
                  Ingresa el nombre del programa/ iniciativa en la cual participaras.{' '}
                </h1>
                <div className="flex justify-center items-center">
                  <Input
                    autoFocus={true}
                    type="text"
                    label="Programa"
                    variant="bordered"
                    placeholder="Ejemplo: Global Ugrad"
                    className="max-w-xs"
                    value={programName}
                    onValueChange={setProgramName}
                  />
                </div>
              </div>
            );
          }}
          isButtonDisabled={programName === ''}
          onConfirm={async () => {
            programProof.onClose();
            toast.promise(createCVACard(email, selected, programName.toString()), {
              pending: 'Creando Carta de recomendacion',
              success:
                'Carta de recomedacion creada correctamente, revisa tu correo para descargar la carta',
              error: 'Error al crear carta de incorporación',
            });
          }}
          confirmText="Confirmar solicitud"
        />
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
                    <Tab key="cva_incorporation_centro" title="El centro" />
                    <Tab key="cva_incorporation_mercedes" title="Las mercedes" />
                  </Tabs>
                </div>
              </div>
            );
          }}
          isButtonDisabled={false}
          onConfirm={async () => {
            onClose();
            toast.promise(createCVACard(email, selected), {
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
