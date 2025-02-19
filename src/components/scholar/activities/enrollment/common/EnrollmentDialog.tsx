'use client';
import BasicModal from '@/components/BasicModal';
import { ActivityKind } from '@/lib/activities/utils';
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { handleEnrollment } from '../lib/handleScholarActivityEnrollment';

interface EnrollmentDialogProps {
  activityId: string;
  scholarId: string;
  eventId: string;
  kindOfActivity: ActivityKind;
  scholarEmail: string;
  scholarName: string;
  activityTitle: string;
  isButtonDisabled: boolean;
}

const EnrollmentDialog: React.FC<EnrollmentDialogProps> = ({
  activityId,
  scholarId,
  eventId,
  kindOfActivity,
  scholarEmail,
  scholarName,
  activityTitle,
  isButtonDisabled,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isCharging, setIsCharging] = useState(false);
  let bg = '';
  if (kindOfActivity === 'workshop') {
    bg = 'bg-blue-500';
  } else if (kindOfActivity === 'chat') {
    bg = 'bg-red-500';
  } else if (kindOfActivity === 'volunteer') {
    bg = 'bg-green-500';
  }

  return (
    <>
      <Button
        isDisabled={isButtonDisabled}
        onPress={onOpen}
        className={`${bg} text-white`}
        radius="full"
        size="sm"
      >
        ¡Inscribirse!
      </Button>

      <BasicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="¿Estas seguro de que deseas inscribirte en esta actividad?"
        Content={() => (
          <>
            <div>
              Al inscribirte te comprometes a asistir, participar activamente y cumplir con las
              responsabilidades y obligaciones que se te asignen en la actividad.
            </div>
            <div>Recuerda, tu participación es vital para el éxito de la actividad. ✨</div>
          </>
        )}
        isButtonDisabled={isButtonDisabled || isCharging}
        onConfirm={async () => {
          setIsCharging(true);
          toast.promise(
            handleEnrollment(
              activityId,
              scholarId,
              eventId,
              kindOfActivity,
              scholarEmail,
              scholarName,
              activityTitle
            ),
            {
              pending: 'Realizando inscripción',
              success: 'Inscripción exitosa 🎉',
              error: 'Error al inscribirte en la actividad. Inténtalo de nuevo más tarde 🙁',
            }
          );
          onClose();
          setIsCharging(false);
        }}
        confirmText="Confirmar Inscripción"
      />
    </>
  );
};

export default EnrollmentDialog;
