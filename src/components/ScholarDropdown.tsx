'use client';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { useState } from 'react';
import EditScholarForm from './EditScholarForm';
import ProbationForm from './ProbationForm';

type ModalsOpen = {
  probation: boolean;
  edit: boolean;
};

const ScholarDropdown = () => {
  const [modalOpen, setModalOpen] = useState<ModalsOpen>({
    probation: false,
    edit: false,
  });
  const [probationKind, setProbationKind] = useState<'PROBATION_I' | 'PROBATION_II'>();
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button radius="full" isIconOnly variant="bordered" className="p-1">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dropdown menu with description"
          onAction={(key) => {
            setProbationKind(key as 'PROBATION_I' | 'PROBATION_II');
            setModalOpen({ ...modalOpen, probation: true });
          }}
        >
          <DropdownSection title="Actions" showDivider>
            <DropdownItem
              key="edit"
              description="Edita los datos del becario"
              onAction={(key) => {
                setProbationKind(key as 'PROBATION_I' | 'PROBATION_II');
                setModalOpen({ ...modalOpen, edit: true });
              }}
            >
              Editar informacion de becario
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Acciones peligrosas" showDivider>
            <DropdownItem
              key="PROBATION_I"
              description="Pasar becario al estatus de probatorio I"
              color="warning"
            >
              Pasar a Probatorio I
            </DropdownItem>
            <DropdownItem
              key="PROBATION_II"
              description="Pasar becario al estatus de probatorio II"
              color="danger"
            >
              Pasar a Probatorio II
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Acciones especiales">
            <DropdownItem key="cert" description="Pasar becario al estatus de probatorio I">
              Crear certificado de becario
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <ProbationForm isOpen={modalOpen.probation} probationKind={probationKind} />
      <EditScholarForm isOpen={modalOpen.edit} />
    </>
  );
};

export default ScholarDropdown;
