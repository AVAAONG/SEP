'use client';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { Scholar } from '@prisma/client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from './BasicModal';

interface ActivityPanelInfoProps {
  scholars: Scholar[];
  attendanceId: string;
  activityId: string;
  kindOfActivity: 'workshop' | 'chat';
  isButtonDisabled: boolean;
}

const ActivityScholarActions: React.FC<ActivityPanelInfoProps> = ({
  scholars,
  attendanceId,
  activityId,
  kindOfActivity,
  isButtonDisabled,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedScholar, setSelectedScholar] = useState<React.Key | undefined>();
  const handleCeaseSpot = async () => {
    //create html to confirm with the url that directs to the api.
    // send html to the scholar
    //display a confirmation
  };

  return (
    <div className="w-1/2 flex items-center justify-end">
      <Button onPress={onOpen} color="warning" className="text-white" isDisabled={isButtonDisabled}>
        Cancelar inscripcion
      </Button>
      <BasicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="¿Estás seguro de cancelar tu inscripción y ceder tu cupo?"
        Content={() => (
          <div className="flex flex-col gap-4">
            <p className="text-sm list-disc space-y-sm w-full">
              Al cancelar tu inscripción, cederás tu cupo a otro becario, y tu asistencia dentro de
              la actividad pasara a contarse como "Cancelado".
            </p>
            <p className="font-medium">Si te arrepientes, no podrás volver a inscribirte. 👀</p>
            <p className="text-sm list-disc space-y-sm w-full">
              Si estas seguro de cancelar tu inscripción, primero busca a un becario que pueda
              ocupar tu lugar en la actividad.
            </p>
            <Autocomplete
              defaultItems={scholars}
              radius="sm"
              label="Selecciona un becario al cual cederle tu cupo"
              labelPlacement="outside"
              onSelectionChange={setSelectedScholar}
            >
              {(scholar) => (
                <AutocompleteItem
                  key={scholar.id}
                  textValue={`${scholar.first_names.split(' ')[0]} ${
                    scholar.last_names.split(' ')[0]
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
                      <span className="text-small">{`${scholar.first_names.split(' ')[0]} ${
                        scholar.last_names.split(' ')[0]
                      }`}</span>
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
          toast.promise(handleCeaseSpot(), {
            pending: 'Cediendo cupo...',
            success: 'Cupo cedido exitosamente',
            error: 'Error al ceder cupo',
          });
          onClose();
        }}
        confirmText="Cancelar y ceder cupo"
      />
    </div>
  );
};

export default ActivityScholarActions;
