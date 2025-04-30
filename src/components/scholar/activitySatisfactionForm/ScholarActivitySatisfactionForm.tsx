'use client';
import RadioInputField from '@/components/fields/RadioInputField';
import useMobile from '@/hooks/use-mobile';
import {
  updateWorkshopAttendanceSatisfactionForm,
  updatechatAttendanceSatisfactionForm,
} from '@/lib/db/utils/Workshops';
import activitySatisfactionFormSchema from '@/lib/schemas/acivitySatisFactionFormSchema';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { ActivityStatus } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { QUESTIONS_BY_SECTION, VALORIZATION } from './questions';

const ScholarActivitySatisfactionForm = ({
  attendanceId,
  workshopStatus,
  satisfactionFormFilled,
  kindOfActivity,
}: {
  attendanceId: string | undefined;
  workshopStatus: ActivityStatus;
  satisfactionFormFilled: boolean | undefined | null;
  kindOfActivity: 'workshop' | 'chat';
}) => {
  const { isMobile } = useMobile();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const methods = useForm<z.infer<typeof activitySatisfactionFormSchema>>({
    resolver: zodResolver(activitySatisfactionFormSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleFormSummision = async (
    data: z.infer<typeof activitySatisfactionFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    if (!attendanceId) return;
    if (kindOfActivity === 'workshop') {
      await updateWorkshopAttendanceSatisfactionForm(attendanceId, data);
      revalidateSpecificPath(`/becario/chats/[workshopId]`, 'page');
    } else if (kindOfActivity === 'chat') {
      updatechatAttendanceSatisfactionForm(attendanceId, data);
      revalidateSpecificPath(`/becario/chats/[chatId]`, 'page');
    }
    onClose();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="success"
        className="text-white"
        isDisabled={workshopStatus !== 'ATTENDANCE_CHECKED' || Boolean(satisfactionFormFilled)}
      >
        {satisfactionFormFilled ? '✔ Encuesta de satisfacción llena' : 'Encuesta de satisfacción'}
      </Button>
      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        isDismissable={false}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(async (data, event) =>
              toast.promise(handleFormSummision(data, event), {
                pending: 'Confirmando llenado de encuesta...',
                success: 'Encuesta subida de forma correcta',
                error: 'Error al subir encuesta',
              })
            )}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
                    Encuesta de satisfacción
                  </ModalHeader>
                  <ModalBody className="flex flex-col gap-6">
                    {QUESTIONS_BY_SECTION.map((section) => (
                      <div key={section.title} className="flex flex-col gap-4">
                        <h2 className="font-medium truncate text-primary-light">{section.title}</h2>
                        <div className="space-y-6">
                          {section.questions.map((q) => (
                            <RadioInputField
                              key={q.name}
                              isVertical={isMobile}
                              name={q.name}
                              label={
                                typeof q.label === 'function' ? q.label(kindOfActivity) : q.label
                              }
                              radioItems={VALORIZATION}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      isDisabled={isSubmitting}
                      color="danger"
                      radius="sm"
                      variant="light"
                      onPress={() => {
                        reset();
                        onClose();
                      }}
                    >
                      Cerrar
                    </Button>
                    <Button
                      type="submit"
                      radius="sm"
                      color="success"
                      isLoading={isSubmitting} // Show loading state on submit button
                      isDisabled={isSubmitting} // Disable submit button while submitting
                    >
                      Guardar feedback
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default ScholarActivitySatisfactionForm;
