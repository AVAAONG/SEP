'use client';
import { sendGenericEmail } from '@/lib/sendEmails';
import { parseModalityFromDatabase } from '@/lib/utils2';
import { Autocomplete, AutocompleteItem, Avatar, Button, useDisclosure } from '@nextui-org/react';
import { Modality, Scholar } from '@prisma/client';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from './BasicModal';

const createCeaseConfirmationMessage = (
  scholarName: string,
  scholarWhoCeaseName: string,
  activityName: string,
  date: string,
  startDate: string | Date,
  endDate: string | Date,
  modality: string,
  platform: string,
  link: string
) => {
  return `<table>
  <tr><td>Hola, ${scholarName}</td></tr>

  <tr><td style="height: 20px;"></td></tr>

  <tr><td>${scholarWhoCeaseName} te cedió el cupo a la actividad de ${activityName}</td></tr>
    
  <tr><td style="height: 20px;"></td></tr>

  <tr><td style="font-weight: bold;">Detalles de la actividad:</td></tr>

  <tr><td>Fecha: ${new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}</td></tr>

  <tr><td>Hora: De ${new Date(startDate).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })} a ${new Date(endDate).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}</td></tr>

  <tr><td>Modalidad: ${parseModalityFromDatabase(modality as Modality)}</td></tr>

  <tr><td>Plataforma: ${platform}</td></tr>
  
  <tr><td style="height: 20px;"></td></tr>

  <tr><td>Para confirmar tu asistencia haz clic en el siguiente enlace: ${link}</td></tr>
    
  <tr><td style="height: 20px;"></td></tr>

  <tr><td>👀 Recuerda, inscribirse es un compromiso que adquieres con AVAA y contigo mismo.</td></tr>

  <tr><td>Al inscribirte, te comprometes a asistir a la actividad y cumplir con las responsabilidades y obligaciones que se te asignen.</td></tr>
    
  <tr><td style="height: 20px;"></td></tr>

  <tr><td>Importante:</td></tr>

  <tr><td>Si no has recibido información previa sobre esta actividad por parte de ${scholarWhoCeaseName}, NO hagas clic en el enlace.</td></tr>

  <tr><td style="height: 20px;"></td></tr>

  <tr><td>¡Esperamos tu participación!</td></tr>
</table>
`;
};

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

    const message = createCeaseConfirmationMessage(
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
                      <span className="text-small">{`${scholar.first_names.trim().split(' ')[0]} ${
                        scholar.last_names.trim().split(' ')[0]
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
            pending: 'Creando correo de confirmación...',
            success: 'Correo de confirmación creado exitosamente',
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
