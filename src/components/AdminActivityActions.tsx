'use client';
import { changeWorkshopStatus } from '@/lib/db/utils/Workshops';
import { changeChatStatus } from '@/lib/db/utils/chats';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Button, useDisclosure } from '@nextui-org/react';
import { ActivityStatus } from '@prisma/client';
import { toast } from 'react-toastify';
import BasicModal from './BasicModal';
const AdminActivityActions = ({
  activityId,
  kindOfActivity,
  attendanceHadBeenPassed,
}: {
  activityId: string;
  kindOfActivity: 'workshop' | 'chat';
  attendanceHadBeenPassed: boolean | undefined;
}) => {
  const suspendModal = useDisclosure();
  const attendanceCheckedModal = useDisclosure();

  const changeActivityStatus = async (status: ActivityStatus) => {
    if (kindOfActivity === 'workshop') await changeWorkshopStatus(activityId, status);
    else if (kindOfActivity === 'chat') await changeChatStatus(activityId, status);
  };

  let whatI = [];
  if (attendanceHadBeenPassed) {
    whatI = ['SUSPENDED'];
  } else {
    whatI = ['ATTENDANCE_CHECKED'];
  }

  return (
    <>
      {/* suspender esta deshabilitado una vez haya pasado asistencia marcar como realizado esta
      suspendido hasta que se haya marcado la primera asistencia. */}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button>Cambiar estatus</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={whatI}>
          <DropdownItem
            key="ATTENDANCE_CHECKED"
            color="success"
            onPress={attendanceCheckedModal.onOpen}
          >
            Realizado
          </DropdownItem>
          <DropdownItem key="SUSPENDED" color="danger" onPress={suspendModal.onOpen}>
            Suspendido
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <BasicModal
        isOpen={suspendModal.isOpen}
        onOpenChange={suspendModal.onOpenChange}
        isButtonDisabled={false}
        title="¿Estas seguro que deseas suspender la actividad?"
        Content={() => (
          <div className="flex flex-col gap-4">
            <p>
              Si cancelas la actividad, los becarios inscritos seran notificados via correo
              electronico y se prohibira la inscripcion de nuevos becarios a la actividad.
            </p>
          </div>
        )}
        onConfirm={async () => {
          toast.promise(changeActivityStatus('SUSPENDED'), {
            pending: 'Suspendiendo actividad...',
            success: 'Actividad suspendida exitosamente',
            error: 'Error al suspender actividad',
          });
          suspendModal.onClose();
        }}
        confirmText="Suspender actividad"
      />
      <BasicModal
        isOpen={attendanceCheckedModal.isOpen}
        onOpenChange={attendanceCheckedModal.onOpenChange}
        isButtonDisabled={false}
        title="¿Estas seguro que deseas marcar la actividad como realizada?"
        Content={() => (
          <div className="flex flex-col gap-4">
            <p>
              Al marcar la actividad como realizada, se notificara a los becarios inscritos via
              correo electronico. Ademas, se habilitara la encuesta de satisfaccion de la actividad
            </p>
          </div>
        )}
        onConfirm={async () => {
          toast.promise(changeActivityStatus('ATTENDANCE_CHECKED'), {
            pending: 'Marcando actividad como realizada...',
            success: 'Actividad marcada como realizada exitosamente',
            error: 'Error al marcar actividad como realizada',
          });
          attendanceCheckedModal.onClose();
        }}
        confirmText="Marcar como realizado"
      />
    </>
  );
};

export default AdminActivityActions;
