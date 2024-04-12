'use client';
import createTransferSpotMessage from '@/lib/htmls/transferSpotMessage';
import { sendGenericEmail } from '@/lib/sendEmails';
import { Autocomplete, AutocompleteItem, Avatar, Button, useDisclosure } from '@nextui-org/react';
import { Scholar } from '@prisma/client';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from '../BasicModal';
import { ChatsWithAllData } from '../table/columns/chatsColumns';
import {
  IChatAttendance,
  IWorkshopAttendance,
} from '../table/columns/scholars/activityAttendanceWithNoPrivilege/formater';
import { WorkshopWithAllData } from '../table/columns/workshopColumns';
import isDisabled from './utils';

interface CeaseSpotButtonProps {
  kindOfActivity: 'workshop' | 'chat';
  scholarsToCeaseSpot: Scholar[];
  activity: WorkshopWithAllData | ChatsWithAllData;
  scholarWhoCeaseAttendance: IChatAttendance | IWorkshopAttendance;
}

const CeaseSpotButtonProps: React.FC<CeaseSpotButtonProps> = ({
  kindOfActivity,
  scholarsToCeaseSpot,
  scholarWhoCeaseAttendance,
  activity,
}) => {
  const { id, title, start_dates, end_dates, modality, platform, calendar_ids } = activity;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedScholar, setSelectedScholar] = useState<Scholar | undefined>();
  const memoizedScholars = useMemo(() => scholarsToCeaseSpot, [scholarsToCeaseSpot]);
  const handleCeaseSpot = async () => {
    if (!selectedScholar) return;
    const link = `https://programaexcelencia.org/becario/api/ceaseConfirmation?activityId=${encodeURIComponent(
      id
    )}&scholarWhoCeaseAttendanceId=${encodeURIComponent(
      scholarWhoCeaseAttendance.id
    )}&scholarId=${encodeURIComponent(selectedScholar.id)}&kindOfActivity=${encodeURIComponent(
      kindOfActivity
    )}&scholarWhoReceiveEmail=${encodeURIComponent(
      selectedScholar.email || ''
    )}&scholarWhoReceiveName=${encodeURIComponent(
      selectedScholar.first_names.split(' ')[0] || ''
    )}&eventId=${encodeURIComponent(calendar_ids[0])}&activityName=${encodeURIComponent(title)}`;

    const message = createTransferSpotMessage(
      selectedScholar.first_names.split(' ')[0] || '',
      scholarWhoCeaseAttendance.scholar.scholar.first_names.split(' ')[0] || '',
      title,
      new Date(start_dates[0]).toISOString(),
      new Date(start_dates[0]).toISOString(),
      new Date(end_dates[0]).toISOString(),
      modality,
      platform,
      link
    );
    await sendGenericEmail(
      message,
      selectedScholar.email ?? 'avaatecnologia@gmail.com',
      `Te han cedido el cupo a la actividad: ${title}`
    );
  };

  return (
    <div className="flex items-center justify-end gap-4">
      <>
        <Button
          onPress={onOpen}
          color="warning"
          className="text-white"
          isDisabled={isDisabled(
            scholarWhoCeaseAttendance?.attendance!,
            start_dates[0].toISOString(),
            activity.activity_status
          )}
        >
          Cancelar inscripcion
        </Button>
        <BasicModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          title="¿Estás seguro de cancelar tu inscripción y ceder tu cupo?"
          Content={() => (
            <div className="flex flex-col gap-4">
              <p className="text-sm list-disc space-y-sm w-full">
                Al cancelar tu inscripción, cederás tu cupo a otro becario, y tu asistencia dentro
                de la actividad pasara a contarse como "Cancelado".
              </p>
              <p className="font-medium">Si te arrepientes, no podrás volver a inscribirte.👀</p>
              <p className="text-sm list-disc space-y-sm w-full">
                Si estas seguro de cancelar tu inscripción, primero busca a un becario que pueda
                ocupar tu lugar en la actividad, luego, Asegurate de que este confirme su asistencia
                a la actividad.
              </p>
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

export default CeaseSpotButtonProps;
