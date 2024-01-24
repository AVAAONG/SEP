'use client';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { useDisclosure } from '@nextui-org/modal';
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

const ScholarDropdown = ({ scholar }) => {
  const [probationKind, setProbationKind] = useState<'PROBATION_I' | 'PROBATION_II'>();
  const [dropdownIsOpen, setDropdownOpen] = useState(false);
  const [editModalIsOpen, setEditModalOpen] = useState(false);
  const probation1 = useDisclosure();
  const probation2 = useDisclosure();
  const edit = useDisclosure();
  return (
    <>
      <Dropdown isOpen={dropdownIsOpen} onOpenChange={(open) => setDropdownOpen(open)}>
        <DropdownTrigger>
          <Button radius="full" isIconOnly color="success" variant="light" className="w-8">
            <EllipsisHorizontalCircleIcon className="rotate-90 w-full" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dropdown menu with description"
          onAction={(key) => {
            setProbationKind(key as 'PROBATION_I' | 'PROBATION_II');
          }}
        >
          <DropdownSection title="Acciones" showDivider>
            <DropdownItem
              key="edit"
              description="Edita los datos del becario"
              onPress={() => {
                setDropdownOpen(false);
                setEditModalOpen(true);
              }}
            >
              Editar información del becario
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Cambiar estatus del becario" showDivider>
            <DropdownItem
              key="PROBATION_I"
              description="Pasar becario al estatus de probatorio I"
              color="warning"
              onPress={probation1.onOpen}
            >
              Pasar a Probatorio I
            </DropdownItem>
            <DropdownItem
              key="PROBATION_II"
              description="Pasar becario al estatus de probatorio II"
              color="danger"
              onPress={probation2.onOpen}
            >
              Pasar a Probatorio II
            </DropdownItem>
            <DropdownItem key="NORMAL" description="Quitar estatus de probatorio" color="default">
              Quitar estatus de probatorio
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Acciones especiales">
            <DropdownItem key="condition" description="Renuncias, Retiros, Egreso">
              Cambiar condición
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <ProbationForm
        scholar={scholar}
        isOpen={probation1.isOpen}
        onOpenChange={probation1.onOpenChange}
        probationKind="PROBATION_I"
        onConfirm={() => {}}
      />
      <ProbationForm
        scholar={scholar}
        isOpen={probation2.isOpen}
        onOpenChange={probation2.onOpenChange}
        probationKind="PROBATION_II"
        onConfirm={() => {}}
      />

      <EditScholarForm modalIsOpen={editModalIsOpen} set={setEditModalOpen} scholar={scholar} />
    </>
  );
};

export default ScholarDropdown;
