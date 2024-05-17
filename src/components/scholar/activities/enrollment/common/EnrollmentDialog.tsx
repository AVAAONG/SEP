'use client';
import BasicModal from '@/components/BasicModal';
import { createEnrollementConfirmationMessage } from '@/lib/htmlConfirmationTemplate';
import { sendGenericEmail } from '@/lib/sendEmails';
import { handleEnrollment } from '@/lib/serverAction';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import { useState } from 'react';
import { toast } from 'react-toastify';

const EnrollmentDialog = ({ isButtonDisabled, kindOfActivity, isFull }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isCharging, setIsCharging] = useState(false);

  return (
    <>
      <Button
        isDisabled={isButtonDisabled}
        onPress={onOpen}
        className="bg-red-500 text-white"
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
        isButtonDisabled={isFull || isCharging}
        onConfirm={async () => {
          setIsCharging(true);
          toast.promise(handleEnrollment(id, scholar.id, eventId, kindOfActivity, scholar.email), {
            pending: 'Realizando inscripción',
            success: 'Inscripción exitosa 🎉',
            error: 'Error al inscribirte en la actividad. Inténtalo de nuevo más tarde 🙁',
          });
          await sendGenericEmail(
            createEnrollementConfirmationMessage(
              scholar.name,
              `https://www.programaexcelencia.org/becario/chats/${id}`,
              activityTitle
            ),
            scholar.email,
            'Confirmación de inscripción'
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
