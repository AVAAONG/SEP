'use client';
import { createSpeaker } from '@/lib/db/utils/speaker';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Prisma } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import BaseSpeakerFormCreation, { SpeakerCreationFormSchema } from './BaseForm';

const SpeakerCreationForm = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof SpeakerCreationFormSchema>>({
    resolver: zodResolver(SpeakerCreationFormSchema),
    defaultValues: {},
  });
  const handleFormSubmit = async (
    inputData: z.infer<typeof SpeakerCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    const speaker: Prisma.SpeakerCreateInput = { speaker_kind: 'WORKSHOPS', ...inputData };
    await createSpeaker(speaker);
    reset();
    onClose();
  };
  return (
    <>
      <Button radius="sm" color="success" onPress={onOpen}>
        Crear facilitador
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="outside"
        classNames={{
          backdrop: 'bg-secondary-dark bg-opacity-80',
          base: 'bg-light dark:bg-dark',
        }}
      >
        <form
          onSubmit={handleSubmit((data, event) =>
            toast.promise(handleFormSubmit(data, event), {
              pending: 'Creando facilitador...',
              success: 'Facilitador creado',
              error: 'Error al crear facilitador',
            })
          )}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
                  Crear Facilitador
                </ModalHeader>
                <ModalBody className="grid grid-cols-4 w-full items-center justify-center gap-4">
                  <BaseSpeakerFormCreation control={control} />
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
                    isDisabled={!isValid || isSubmitting}
                    className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white "
                  >
                    Crear facilitador
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default SpeakerCreationForm;
