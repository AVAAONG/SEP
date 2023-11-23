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

type ModalsOpen = {
  probation: boolean;
  edit: boolean;
};

const ScholarDropdown = ({ scholar }) => {
  const [probationKind, setProbationKind] = useState<'PROBATION_I' | 'PROBATION_II'>();
  const [dropdownIsOpen, setDropdownOpen] = useState(false);
  const [editModalIsOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <Dropdown isOpen={dropdownIsOpen} onOpenChange={(open) => setDropdownOpen(open)}>
        <DropdownTrigger>
          <Button radius="full" isIconOnly color="success" variant="bordered" className="p-1 w-8">
            <EllipsisVerticalIcon />
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
            <DropdownItem key="cert" description="Renuncias, Retiros, Egreso">
              Cambiar condición
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      {/* <ProbationForm isOpen={modalOpen.probation} probationKind={probationKind} />
       */}
      <EditScholarForm modalIsOpen={editModalIsOpen} set={setEditModalOpen} scholar={scholar} />
    </>
  );
};

export default ScholarDropdown;
