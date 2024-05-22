'use client';
import { changeScholarCondition } from '@/lib/db/lilb/scholar/utils';
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
import { toast } from 'react-toastify';
import ProbationForm from './ProbationForm';
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
            <DropdownItem key="NORMAL" color="success" description="Quitar estatus de probatorio">
              Quitar estatus de probatorio
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Cambiar condición del becario" showDivider>
            <DropdownItem
              key="WITHDRAWAL"
              description="Retirar a becario del programa"
              color="danger"
              onPress={async () => {
                toast.promise(changeScholarCondition(scholar.id, 'WITHDRAWAL'), {
                  pending: 'Cambiando condición de becario',
                  success: 'Exito al cambiar condición del becario',
                  error: 'Error al cambiar condición del becario',
                });
              }}
            >
              Retiro
            </DropdownItem>
            <DropdownItem
              key="RESIGNATION"
              description="Renuncia por parte del becarioo"
              color="danger"
              onPress={async () => {
                toast.promise(changeScholarCondition(scholar.id, 'RESIGNATION'), {
                  pending: 'Cambiando condición de becario',
                  success: 'Exito al cambiar condición del becario',
                  error: 'Error al cambiar condición del becario',
                });
              }}
            >
              Renuncia
            </DropdownItem>
            <DropdownItem
              key="ALUMNI"
              description="Pasar becario a la red de egresados"
              color="success"
              onPress={async () => {
                toast.promise(changeScholarCondition(scholar.id, 'ALUMNI'), {
                  pending: 'Cambiando condición de becario',
                  success: 'Exito al cambiar condición del becario',
                  error: 'Error al cambiar condición del becario',
                });
              }}
            >
              Egresado
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <ProbationForm
        scholar={scholar}
        isOpen={probation1.isOpen}
        onOpenChange={probation1.onOpenChange}
        probationKind="PROBATION_I"
        onConfirm={() => { }}
      />
      <ProbationForm
        scholar={scholar}
        isOpen={probation2.isOpen}
        onOpenChange={probation2.onOpenChange}
        probationKind="PROBATION_II"
        onConfirm={() => { }}
      />
      {/* <EditScholarForm modalIsOpen={editModalIsOpen} set={setEditModalOpen} scholar={scholar} /> */}
    </>
  );
};

export default ScholarDropdown;
