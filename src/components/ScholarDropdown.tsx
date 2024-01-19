'use client';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { useState } from 'react';

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
            <DropdownItem key="NORMAL" description="Pasar becario a estatus normal" color="default">
              Pasar a estado normal
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Acciones especiales">
            <DropdownItem key="condition" description="Renuncias, Retiros, Egreso">
              Cambiar condición
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      {/* <ProbationForm isOpen={modalOpen.probation} probationKind={probationKind} />
       */}
      {/* <EditScholarForm modalIsOpen={editModalIsOpen} set={setEditModalOpen} scholar={scholar} /> */}
    </>
  );
};

export default ScholarDropdown;
