'use client';
import { ChatWithSpeaker, WorkshopWithSpeaker } from '@/lib/db/types';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import { Volunteer } from '@prisma/client';
import 'moment/locale/es';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from '../BasicModal';
import ScheduledCardSelect from './cardKinds';
import DeleteActivityModalContent from './commonComponents/DeleteActivityModalContent';
import EditActivityModalContent from './commonComponents/EditActivityModalContent';
import deleteActivity from './utils/deleteActivity';

interface ScheduledCardI {
  activities: ChatWithSpeaker[] | WorkshopWithSpeaker[] | Volunteer[];
}

const ScheduledCard: React.FC<ScheduledCardI> = ({ activities }) => {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState<
    ChatWithSpeaker | WorkshopWithSpeaker | Volunteer | null
  >(null);
  const [buttonIsDisabled, setbuttonIsDisabled] = useState(false);

  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  const editActivity = useCallback(
    (activityId: string) => {
      router.push(`?activityToEdit=${activityId}`);
    },
    [router]
  );

  const getPathToRevalidate = () => {
    if ('level' in activities[0]) return '/admin/chats/crear';
    else if ('year' in activities[0]) return '/admin/actividadesFormativas/crear';
    else if ('kind_of_volunteer' in activities[0]) return '/admin/voluntariado/crear';
    return '';
  };

  return (
    <>
      {activities.map((activity: ChatWithSpeaker | WorkshopWithSpeaker | Volunteer) => {
        return (
          <ScheduledCardSelect activity={activity}>
            <>
              <Button
                variant="light"
                color="danger"
                radius="full"
                size="sm"
                isIconOnly
                className="w-4 font-medium"
                onPress={() => {
                  setSelectedActivity(activity);
                  deleteModal.onOpen();
                }}
              >
                X<span className="sr-only">Eliminar actividad</span>
              </Button>
              <BasicModal
                isButtonDisabled={buttonIsDisabled}
                isOpen={deleteModal.isOpen}
                onOpenChange={deleteModal.onOpenChange}
                title="¿Estas seguro que deseas eliminar esta actividad?"
                Content={() => <DeleteActivityModalContent activity={selectedActivity!} />}
                onConfirm={() => {
                  setbuttonIsDisabled(true);
                  toast.promise(deleteActivity(activities, selectedActivity!.id), {
                    pending: 'Eliminando actividad...',
                    success: 'Actividad eliminada de forma correcta 👌',
                    error: 'ERROR: No se pudo eliminar la actividad 🤯',
                  });
                  revalidateSpecificPath(getPathToRevalidate());
                  deleteModal.onClose();
                  setbuttonIsDisabled(false);
                }}
                confirmText="Eliminar"
              />
              {/* <Button
                variant="light"
                color="success"
                radius="full"
                size="sm"
                isIconOnly
                className="w-4 font-medium"
                onPress={() => {
                  setSelectedActivity(activity);
                  editModal.onOpen();
                }}
              >
                <PencilSquareIcon className="w-5 h-5" />
                <span className="sr-only">Editar actividad</span>
              </Button> */}

              <BasicModal
                isButtonDisabled={buttonIsDisabled}
                isOpen={editModal.isOpen}
                onOpenChange={editModal.onOpenChange}
                title="¿Estas seguro que deseas editar esta actividad?"
                Content={() => <EditActivityModalContent activity={selectedActivity!} />}
                onConfirm={() => {
                  setbuttonIsDisabled(true);
                  editActivity(selectedActivity?.id!);
                  revalidateSpecificPath(getPathToRevalidate());
                  editModal.onClose();
                  setbuttonIsDisabled(true);
                }}
                confirmText="Editar"
              />
            </>
          </ScheduledCardSelect>
        );
      })}
    </>
  );
};

export default ScheduledCard;
