'use client';
import { changeVolunteerStatus } from '@/lib/db/utils/volunteer';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useDisclosure } from '@nextui-org/modal';
import { VolunteerStatus } from '@prisma/client';
import { toast } from 'react-toastify';
const VolunteerStatusUpdate = ({ volunteerId }: { volunteerId: string }) => {
  const suspendModal = useDisclosure();

  const handleStatusUpdate = async (status: VolunteerStatus) => {
    toast.promise(changeVolunteerStatus(volunteerId, status), {
      pending: 'Actualizando estatus...',
      success: 'Estatus actualizado exitosamente',
      error: 'Error al actualizar estatus',
    });
    revalidateSpecificPath(`/admin/voluntariado/${volunteerId}`);
  };
  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button className="w-full">Cambiar estatus</Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          onAction={async (key) => await handleStatusUpdate(key as VolunteerStatus)}
        >
          <DropdownItem key="APPROVED" color="success" onPress={suspendModal.onOpen}>
            Realizado / Aprovado
          </DropdownItem>
          <DropdownItem key="REJECTED" color="danger" onPress={suspendModal.onOpen}>
            Suspendido / Rechazado
          </DropdownItem>
          {/* <DropdownItem key="SCHEDULED" onPress={suspendModal.onOpen}>
            Agendado
          </DropdownItem>
          <DropdownItem key="SENT" onPress={suspendModal.onOpen}>
            Enviado
          </DropdownItem> */}
          <DropdownItem key="SENT" color="warning" onPress={suspendModal.onOpen}>
            Pendiente por aprovacion
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default VolunteerStatusUpdate;
