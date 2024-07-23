'use client';
import { ScholarWithAllData } from '@/lib/db/types';
import { createProbation } from '@/lib/db/utils/probation';
import probationFormSchema from '@/lib/schemas/probationFormSchema';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { ScholarStatus } from '@prisma/client';
import React, { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
interface ProbationFormProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
  probationKind: ScholarStatus;
  scholar: ScholarWithAllData;
}

const ProbationForm: React.FC<ProbationFormProps> = ({
  isOpen,
  probationKind,
  onOpenChange,
  scholar,
}) => {
  const title = probationKind === 'PROBATION_II' ? 'Probatorio II' : 'Probatorio I';
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, isSubmitted },
  } = useForm<z.infer<typeof probationFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(probationFormSchema),
  });
  const handleFormSubmit = async (
    data: z.infer<typeof probationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    const probationData = {
      ...data,
      kind_of_probation: probationKind as ScholarStatus,
      starting_date: new Date(),
    };

    await createProbation(scholar.id, probationData);
    await revalidateSpecificPath(`/admin/becarios/${scholar.id}`);
    reset();
  };

  return (
    <>
      <Modal
        scrollBehavior="outside"
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-light"
        isDismissable={false}
      >
        <form
          onSubmit={handleSubmit(
            async (data, event) =>
              toast.promise(handleFormSubmit(data, event), {
                pending: 'Guardando cambios...',
                success: 'Cambios guardados',
                error: 'Error al guardar cambios',
              }),
            (error) => console.log(error)
          )}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <h3 className="block font-bold truncate">Realizado hasta la fecha</h3>
                    <div className="grid lg:grid-cols-4 gap-2">
                      <Controller
                        name="done_at_the_moment.year_in_career"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage =
                            formState.errors?.done_at_the_moment?.year_in_career?.message;
                          return (
                            <Input
                              value={field.value}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="text"
                              label="Año en carrera"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="done_at_the_moment.average"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage =
                            formState.errors?.done_at_the_moment?.average?.message;
                          return (
                            <Input
                              value={field.value}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="text"
                              label="Promedio"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="done_at_the_moment.workshops"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage =
                            formState.errors?.done_at_the_moment?.workshops?.message;
                          return (
                            <Input
                              value={field.value?.toString()}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="number"
                              label="Actividades formativas"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="done_at_the_moment.chats"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage = formState.errors?.done_at_the_moment?.chats?.message;
                          return (
                            <Input
                              value={field.value?.toString()}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="number"
                              label="Chat clubs"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="done_at_the_moment.internal_volunteering_hours"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage =
                            formState.errors?.done_at_the_moment?.internal_volunteering_hours
                              ?.message;
                          return (
                            <Input
                              value={field.value?.toString()}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="number"
                              label="Horas de voluntariado"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="done_at_the_moment.cva"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage = formState.errors?.done_at_the_moment?.cva?.message;
                          return (
                            <Input
                              value={field.value}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="string"
                              label="CVA"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                    </div>
                    <h3 className="block font-bold truncate">Acuerdo</h3>
                    <div className="grid lg:grid-cols-3 gap-2">
                      <Controller
                        name="agreement.average"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage = formState.errors?.agreement?.average?.message;
                          return (
                            <Input
                              value={field.value}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="text"
                              label="Promedio"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="agreement.workshops"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage = formState.errors?.agreement?.workshops?.message;
                          return (
                            <Input
                              value={field.value?.toString()}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="number"
                              label="Actividades formativas"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="agreement.chats"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage = formState.errors?.agreement?.chats?.message;
                          return (
                            <Input
                              value={field.value?.toString()}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="number"
                              label="Chat clubs"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="agreement.internal_volunteering_hours"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage =
                            formState.errors?.agreement?.internal_volunteering_hours?.message;
                          return (
                            <Input
                              value={field.value?.toString()}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="number"
                              label="Horas de voluntariado"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="agreement.cva"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage = formState.errors?.agreement?.cva?.message;
                          return (
                            <Input
                              value={field.value}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="string"
                              label="CVA"
                              radius="sm"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="w-full lg:grid grid-cols-3">
                      <Controller
                        name="next_meeting"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({ field, formState }) => {
                          const errorMessage = formState.errors?.next_meeting?.message;
                          return (
                            <Input
                              value={field.value?.toString()}
                              onChange={field.onChange}
                              isInvalid={!!errorMessage}
                              errorMessage={errorMessage?.toString()}
                              type="datetime-local"
                              label="Fecha y hora de la siguiente reunión"
                              radius="sm"
                              placeholder="date"
                              classNames={{ base: 'h-fit' }}
                            />
                          );
                        }}
                      />
                    </div>
                    <Controller
                      name="observations"
                      control={control}
                      rules={{ required: true }}
                      shouldUnregister={true}
                      render={({ field, formState }) => {
                        const errorMessage = formState.errors?.observations?.message;
                        return (
                          <Textarea
                            value={field.value}
                            onChange={field.onChange}
                            isInvalid={!!errorMessage}
                            errorMessage={errorMessage?.toString()}
                            className="col-span-1"
                            label="Observaciones"
                          />
                        );
                      }}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    isDisabled={isSubmitting}
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    onPress={() => {
                      // if (!isSubmitting) onClose();
                    }}
                  >
                    Pasar a {title}
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

export default ProbationForm;
