'use client';
import { changeWorkshopStatus } from '@/lib/db/utils/Workshops';
import { changeChatStatus } from '@/lib/db/utils/chats';
import createAttendanceCheckedActivityMessage from '@/lib/htmls/attendanceCheckedActivityMessage';
import createSuspendedActivityMessage from '@/lib/htmls/suspendedActivityMessage';
import { sendGenericEmail } from '@/lib/sendEmails';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useDisclosure } from '@nextui-org/modal';
import { ActivityStatus } from '@prisma/client';
import { toast } from 'react-toastify';
import BasicModal from '../BasicModal';

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
  const changeActivityStatus = async (status: ActivityStatus) => {
    let activityName = '',
      link = '',
      startDate = '',
      path = '',
      activityId = '';
    const emails = scholarsEmails.filter((email) => email !== null) as string[];

    if (kindOfActivity === 'workshop') {
      const workshop = await changeWorkshopStatus(activityForChangeId, status);
      link = `https://programaexcelencia.org/becario/actividadesFormativas/${workshop.id}`;
      activityName = workshop.title;
      startDate = workshop.start_dates[0].toISOString();
      path = `actividadesFormativas`;
      activityId = workshop.id;
    } else if (kindOfActivity === 'chat') {
      const chat = await changeChatStatus(activityForChangeId, status);
      link = `https://programaexcelencia.org/becario/chats/${chat.id}`;
      activityName = chat.title;
      startDate = chat.start_dates[0].toISOString();
      path = `chats`;
      activityId = chat.id;
    }

    await revalidateSpecificPath(`/becario/${path}/${activityId}`);
    await revalidateSpecificPath(`/admin/${path}/${activityId}`);

    if (status === 'SUSPENDED') {
      await sendGenericEmail(
        createSuspendedActivityMessage(activityName, startDate),
        emails,
        `La actividad ${activityName} ha sido suspendida`
      );
    }
    if (status === 'ATTENDANCE_CHECKED') {
      await sendGenericEmail(
        createAttendanceCheckedActivityMessage(activityName, startDate, link),
        emails,
        `Encuesta de satisfacción de la activdad: ${activityName}`
      );
    }
  };
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

export default StatusUpdateButton;
