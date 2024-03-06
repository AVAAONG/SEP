'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Autocomplete, AutocompleteItem, Avatar, Button, useDisclosure } from '@nextui-org/react';
import { Scholar } from '@prisma/client';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from './BasicModal';

interface ActivityPanelInfoProps {
  scholars: Scholar[];
  attendanceId: string;
  activityId: string;
  kindOfActivity: 'workshop' | 'chat';
  isButtonDisabled: boolean;
  scholarWhoCeaseName: string;
  activityName: string;
  date: string;
  startDate: string;
  endDate: string;
  modality: string;
  eventId: string;
  platform: string;
}

const QuitScolarFromActivity: React.FC<ActivityPanelInfoProps> = ({
  scholars,
  eventId: eventId,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedScholar, setSelectedScholar] = useState<Scholar | undefined>();
  const memoizedScholars = useMemo(() => scholars, [scholars]);
  const handleCeaseSpot = async () => {};

  return (
    <div className="w-1/2 flex items-center justify-end gap-4">
      <>
        <Button
          onPress={onOpen}
          color="danger"
          className="text-white"
          startContent={<XMarkIcon className="h-5 w-5" />}
          isDisabled={false}
        >
          Quitar becario
        </Button>
        <BasicModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          title="Busca al becario que quitaras de la actividad"
          Content={() => (
            <div className="flex flex-col gap-4">
              <Autocomplete
                defaultItems={memoizedScholars}
                radius="sm"
                label="Selecciona un becario al cual cederle tu cupo"
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
            toast.promise(handleCeaseSpot(), {
              pending: 'Creando correo de confirmación...',
              success: 'Correo de confirmación creado exitosamente',
              error: 'Error al ceder cupo',
            });
            onClose();
          }}
          confirmText="Cancelar y ceder cupo"
        />
      </>
    </div>
  );
};

export default QuitScolarFromActivity;
