'use client';
import useMobile from '@/hooks/use-mobile';
import { deleteScholarFromChat, deleteScholarFromWorkshop } from '@/lib/db/utils/Workshops';
import { deleteScholarFromVolunteer } from '@/lib/db/utils/volunteer';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Autocomplete, AutocompleteItem, Avatar, Button, useDisclosure } from '@nextui-org/react';
import { Scholar } from '@prisma/client';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from './BasicModal';

interface ActivityPanelInfoProps {
  scholars: Scholar[];
  activityId: string;
  kindOfActivity: 'workshop' | 'chat' | 'volunteer';
}

const QuitScholarFromActivity: React.FC<ActivityPanelInfoProps> = ({
  scholars,
  activityId,
  kindOfActivity,
}) => {
  const { isMobile } = useMobile();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedScholar, setSelectedScholar] = useState<Scholar | undefined>();
  const memoizedScholars = useMemo(() => scholars, [scholars]);
  const handleAddScholar = async () => {
    if (selectedScholar) {
      if (kindOfActivity === 'workshop') {
        await deleteScholarFromWorkshop(activityId, selectedScholar.id);
        revalidateSpecificPath(`/admin/actividadesFormativas/${activityId}`);
      } else if (kindOfActivity === 'chat') {
        await deleteScholarFromChat(activityId, selectedScholar.id);
        revalidateSpecificPath(`/admin/chats/${activityId}`);
      } else if (kindOfActivity === 'volunteer') {
        await deleteScholarFromVolunteer(activityId, selectedScholar.id);
        revalidateSpecificPath(`/admin/volunteer/${activityId}`);
      }
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="danger"
        radius="sm"
        size="sm"
        isIconOnly={isMobile}
        className="text-white"
        startContent={<XMarkIcon className="h-5 w-5" />}
        isDisabled={false}
      >
        <span className="hidden md:block w-full">Eliminar becario</span>
      </Button>
      <BasicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Eliminar becario a la actividad"
        Content={() => (
          <div className="flex flex-col gap-4">
            <Autocomplete
              defaultItems={memoizedScholars}
              radius="sm"
              label="Elige al becario que eliminaras de la actividad"
              labelPlacement="outside"
              selectedKey={selectedScholar?.id || ''}
              onSelectionChange={(key) => {
                setSelectedScholar(memoizedScholars.find((scholar) => scholar.id === key));
              }}
            >
              {(scholar) => (
                <AutocompleteItem
                  key={scholar.id}
                  textValue={`${scholar.first_names.trim().split(' ')[0]} ${
                    scholar.last_names.trim().split(' ')[0]
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={scholar.first_names}
                      className="flex-shrink-0"
                      size="sm"
                      src={scholar.photo || ''}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{`${
                        scholar.first_names.trim().split(' ')[0]
                      } ${scholar.last_names.trim().split(' ')[0]}`}</span>
                      <span className="text-tiny text-default-400">{scholar.email}</span>
                    </div>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        )}
        isButtonDisabled={selectedScholar === undefined}
        onConfirm={async () => {
          toast.promise(handleAddScholar(), {
            pending: 'Quitando Becario',
            success: 'Becario eliminado exitosamente',
            error: 'Error al quitar becario',
          });
          onClose();
        }}
        confirmText="Quitar becario"
      />
    </>
  );
};

export default QuitScholarFromActivity;
