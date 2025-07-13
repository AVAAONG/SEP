'use client';
import { createCVACard, KindOfCard } from '@/lib/serverAction';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Input, Tab, Tabs, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from '../BasicModal';

const LetterRequests = ({ email }: { email: string }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const cvaDesincorporationModal = useDisclosure();
  const programProof = useDisclosure();
  const [selected, setSelected] = useState<KindOfCard | undefined>();
  const [programName, setProgramName] = useState('');
  return (
    <>
      <Dropdown placement="bottom-end" size="sm">
        <DropdownTrigger>
          <Button variant="light" color="success" size="sm">
            Solicitudes
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Solicitudes" variant="flat">
          <DropdownSection title="Cartas para el C.V.A." showDivider>
            <DropdownItem key="CVA_INCORPORATION" onPress={onOpen}>
              Incorporación al CVA
            </DropdownItem>
            <DropdownItem key="CVA_DESINCORPORATION" onPress={cvaDesincorporationModal.onOpen}>
              Desincorporación del CVA
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
            Carta de recomendación inglés
          </DropdownItem>
          <DropdownItem
            key="PROGRAM_PROOF_SPANISH"
            onPress={() => {
              programProof.onOpen();
              setSelected('program_proof_spanish');
              setProgramName('');
            }}
          >
            Carta de recomendación español
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
            Constancia genérica
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <BasicModal
        isOpen={cvaDesincorporationModal.isOpen}
        onOpenChange={cvaDesincorporationModal.onOpenChange}
        title="Carta de desincorporación al CVA"
        Content={() => {
          return (
            <div className="w-full flex flex-col gap-4 text-sm">
              <h1 className="text-center font-bold">
                ¿En cual sede del CVA vas a dejar de cursar estudios?
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
            success: 'Carta de CVA creada correctamente, revisa tu correo para descargar la carta',
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
            success: 'Carta de CVA creada correctamente, revisa tu correo para descargar la carta',
            error: 'Error al crear carta de incorporación',
          });
        }}
        confirmText="Confirmar solicitud"
      />
    </>
  );
};

export default LetterRequests;
