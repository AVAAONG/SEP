'use client';
import { setProbationToScholar } from '@/lib/db/utils/users';
import probationFormSchema from '@/lib/schemas/probationFormSchema';
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
import { Scholar, ScholarStatus } from '@prisma/client';
import React, { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
interface ProbationFormProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
  probationKind: ScholarStatus;
  scholar: Scholar;
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
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof probationFormSchema>>({
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

    await setProbationToScholar(scholar.id, probationData);
    reset();
  };

  return (
    <>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} className="bg-light">
        <form onSubmit={handleSubmit((data, event) => handleFormSubmit(data, event))}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-3 gap-4">
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
                            autoFocus
                            type="text"
                            label="Año en la carrera"
                            radius="sm"
                            classNames={{ base: ' h-fit' }}
                            labelPlacement="outside"
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
                        const errorMessage = formState.errors?.done_at_the_moment?.average?.message;
                        return (
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            isInvalid={!!errorMessage}
                            errorMessage={errorMessage?.toString()}
                            type="text"
                            label="Promedio hasta la fecha"
                            radius="sm"
                            classNames={{ base: 'h-fit' }}
                            labelPlacement="outside"
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
                            label="Actividades formativas realizadas"
                            radius="sm"
                            classNames={{ base: 'h-fit' }}
                            labelPlacement="outside"
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
                            label="Chat clubs realizadas"
                            radius="sm"
                            classNames={{ base: 'h-fit' }}
                            labelPlacement="outside"
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
                            label="Horas de voluntariado internas realizadas"
                            radius="sm"
                            classNames={{ base: 'h-fit' }}
                            labelPlacement="outside"
                          />
                        );
                      }}
                    />
                    <Controller
                      name="done_at_the_moment.external_volunteering_hours"
                      control={control}
                      rules={{ required: true }}
                      shouldUnregister={true}
                      render={({ field, formState }) => {
                        const errorMessage =
                          formState.errors?.done_at_the_moment?.external_volunteering_hours
                            ?.message;
                        return (
                          <Input
                            value={field.value?.toString()}
                            onChange={field.onChange}
                            isInvalid={!!errorMessage}
                            errorMessage={errorMessage?.toString()}
                            type="number"
                            label="Horas de voluntariado externas realizadas"
                            radius="sm"
                            classNames={{ base: 'h-fit' }}
                            labelPlacement="outside"
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
                            labelPlacement="outside"
                          />
                        );
                      }}
                    />
                    <Controller
                      name="next_meeting"
                      control={control}
                      rules={{ required: true }}
                      shouldUnregister={true}
                      render={({ field, formState }) => {
                        const errorMessage = formState.errors?.next_meeting?.message;
                        return (
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            isInvalid={!!errorMessage}
                            errorMessage={errorMessage?.toString()}
                            type="datetime-local"
                            label="Fecha de la siguiente reunión"
                            radius="sm"
                            placeholder="date"
                            classNames={{ base: 'h-fit' }}
                            labelPlacement="outside"
                          />
                        );
                      }}
                    />
                    <Controller
                      name="probation_reason"
                      control={control}
                      rules={{ required: true }}
                      shouldUnregister={true}
                      render={({ field, formState }) => {
                        const errorMessage = formState.errors?.probation_reason?.message;
                        return (
                          <Textarea
                            value={field.value}
                            onChange={field.onChange}
                            isInvalid={!!errorMessage}
                            errorMessage={errorMessage?.toString()}
                            className="col-span-3"
                            label="Motivos por los cuales entra en probatorio"
                          />
                        );
                      }}
                    />
                    <Controller
                      name="agreement"
                      control={control}
                      rules={{ required: true }}
                      shouldUnregister={true}
                      render={({ field, formState }) => {
                        const errorMessage = formState.errors?.agreement?.message;
                        return (
                          <Textarea
                            value={field.value}
                            onChange={field.onChange}
                            isInvalid={!!errorMessage}
                            errorMessage={errorMessage?.toString()}
                            className="col-span-2"
                            label="Acuerdo"
                          />
                        );
                      }}
                    />
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
                    isDisabled={!isValid || isSubmitting}
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    onPress={() => {
                      if (isValid || !isSubmitting) onClose();
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
