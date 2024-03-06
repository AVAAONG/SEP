'use client';
import createTransferSpotMessage from '@/lib/htmls/transferSpotMessage';
import { sendGenericEmail } from '@/lib/sendEmails';
import { Autocomplete, AutocompleteItem, Avatar, Button, useDisclosure } from '@nextui-org/react';
import { Scholar } from '@prisma/client';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from './BasicModal';
import ScholarActivitySatisfactionSurvey from './ScholarActivitySatisfactionSurvey';

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

const ActivityScholarActions: React.FC<ActivityPanelInfoProps> = ({
  scholars,
  attendanceId,
  activityId,
  kindOfActivity,
  scholarWhoCeaseName,
  activityName,
  date,
  startDate,
  endDate,
  modality,
  platform,
  eventId: eventId,
  isButtonDisabled,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const surveyModal = useDisclosure();
  const [selectedScholar, setSelectedScholar] = useState<Scholar | undefined>();
  const memoizedScholars = useMemo(() => scholars, [scholars]);
  const handleCeaseSpot = async () => {
    if (!selectedScholar) return;
    const link = `https://programaexcelencia.org/becario/api/ceaseConfirmation?activityId=${encodeURIComponent(
      activityId
    )}&scholarWhoCeaseAttendanceId=${encodeURIComponent(
      attendanceId
    )}&scholarId=${encodeURIComponent(selectedScholar.id)}&kindOfActivity=${encodeURIComponent(
      kindOfActivity
    )}&scholarWhoReceiveEmail=${encodeURIComponent(
      selectedScholar.email || ''
    )}&scholarWhoReceiveName=${encodeURIComponent(
      selectedScholar.first_names.split(' ')[0] || ''
    )}&eventId=${encodeURIComponent(eventId)}&activityName=${encodeURIComponent(activityName)}`;

    const message = createTransferSpotMessage(
      selectedScholar.first_names.split(' ')[0] || '',
      scholarWhoCeaseName,
      activityName,
      date,
      startDate,
      endDate,
      modality,
      platform,
      link
    );
    await sendGenericEmail(
      message,
      selectedScholar.email ?? 'avaatecnologia@gmail.com',
      `Te han cedido el cupo a la actividad: ${activityName}`
    );
  };

  return (
    ///TODO set isDisable option
    <div className="w-1/2 flex items-center justify-end gap-4">
      <>
        <Button
          onPress={onOpen}
          color="warning"
          className="text-white"
          isDisabled={isButtonDisabled}
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
              <p className="font-medium">Si te arrepientes, no podrás volver a inscribirte. 👀</p>
              <p className="text-sm list-disc space-y-sm w-full">
                Si estas seguro de cancelar tu inscripción, primero busca a un becario que pueda
                ocupar tu lugar en la actividad. Asegurate de que este confirme su asistencia a la
                actividad.
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
      <>
        <Button
          onPress={surveyModal.onOpen}
          color="success"
          className="text-white"
          isDisabled={false}
        >
          Encuesta de satisfacción
        </Button>
        <BasicModal
          isOpen={surveyModal.isOpen}
          scroll={true}
          size="5xl"
          onOpenChange={surveyModal.onOpenChange}
          title="Encuesta de satisfacción de la actividad"
          Content={() => <ScholarActivitySatisfactionSurvey />}
          isButtonDisabled={false}
          onConfirm={async () => {
            toast.promise(handleCeaseSpot(), {
              pending: 'Confirmando llenado de encuesta...',
              success: 'Encuesta subida de forma correcta',
              error: 'Error al subir encuesta',
            });
            surveyModal.onClose();
          }}
          confirmText="Subir respuestas"
        />
      </>
    </div>
  );
};

export default ActivityScholarActions;
