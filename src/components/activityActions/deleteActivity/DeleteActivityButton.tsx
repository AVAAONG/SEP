'use client';
import { deleteChat } from '@/lib/db/utils/chats';
import { deleteVolunteer } from '@/lib/db/utils/volunteer';
import { deleteWorkshop } from '@/lib/db/utils/Workshops';
import { useConfirmation } from '@/lib/hooks/useConfirmation';
import { Button } from "@heroui/button";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const DeleteActivityButton = ({ kindOfActivity, activityId }) => {
  const modal1 = useConfirmation();
  const modal2 = useConfirmation();
  const router = useRouter();
  const handleDelete = () => {
    modal1.openConfirmation(
      {
        title: 'Confirmar eliminación',
        message:
          '¿Está seguro que desea borrar esta actividad? Se perderan todas las asistencias de los becarios. Esta acción no se puede deshacer.',
        confirmText: 'Borrar',
        cancelText: 'Cancelar',
      },
      async () =>
        modal2.openConfirmation(
          {
            title: 'Doble confirmacion de  eliminación',
            message:
              'Una vez eliminada esta actividad no se podran recuperar los datos de esta, ¿Está seguro que desea borrar esta actividad?',
            confirmText: 'Borrar',
            cancelText: 'Cancelar',
          },
          async () => {
            if (kindOfActivity === 'workshop') {
              toast.promise(deleteWorkshop(activityId), {
                error: 'Error al eliminar actividad',
                pending: 'Eliminando actividad',
                success: 'Actividad eliminada de forma exitosa',
              });
            } else if (kindOfActivity === 'chat') {
              toast.promise(deleteChat(activityId), {
                error: 'Error al eliminar actividad',
                pending: 'Eliminando actividad',
                success: 'Actividad eliminada de forma exitosa',
              });
            } else if (kindOfActivity === 'volunteer') {
              toast.promise(deleteVolunteer(activityId), {
                error: 'Error al eliminar actividad',
                pending: 'Eliminando actividad',
                success: 'Actividad eliminada de forma exitosa',
              });
            }
            router.push(`/admin/panel`);
          }
        )
    );
  };

  return (
    <>
      <Button onPress={handleDelete} color="danger" radius="sm">
        Eliminar actividad
      </Button>
      <modal1.ConfirmationModal />
      <modal2.ConfirmationModal />
    </>
  );
};

export default DeleteActivityButton;
