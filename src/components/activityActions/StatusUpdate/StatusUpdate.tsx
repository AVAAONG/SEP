'use client';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useDisclosure } from '@nextui-org/modal';
import { toast } from 'react-toastify';
import BasicModal from '../../BasicModal';
import changeActivityStatus from './utils';

const StatusUpdateButton = ({
  kindOfActivity,
  activityForChangeId,
  scholarsEmails,
}: {
  kindOfActivity: 'workshop' | 'chat';
  activityForChangeId: string;
  scholarsEmails: (string | null)[];
}) => {
  const suspendModal = useDisclosure();
  const attendanceCheckedModal = useDisclosure();

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button className="w-full">Cambiar estatus</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
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
          toast.promise(
            changeActivityStatus('SUSPENDED', kindOfActivity, activityForChangeId, scholarsEmails),
            {
              pending: 'Suspendiendo actividad...',
              success: 'Actividad suspendida exitosamente',
              error: 'Error al suspender actividad',
            }
          );
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
          toast.promise(
            changeActivityStatus(
              'ATTENDANCE_CHECKED',
              kindOfActivity,
              activityForChangeId,
              scholarsEmails
            ),
            {
              pending: 'Marcando actividad como realizada...',
              success: 'Actividad marcada como realizada exitosamente',
              error: 'Error al marcar actividad como realizada',
            }
          );
          attendanceCheckedModal.onClose();
        }}
        confirmText="Marcar como realizado"
      />
    </>
  );
};

export default StatusUpdateButton;
