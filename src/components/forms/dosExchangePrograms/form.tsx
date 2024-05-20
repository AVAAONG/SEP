'use client';
import { createAcademicPeriod, updateAcademicPeriod } from '@/lib/db/utils/collage';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { formatDateToDisplayInInput, formatDateToStoreInDB } from '@/lib/utils/dates';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { Prisma, ScholarCollagePeriod } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import scholarDosExchangeProgramsApplications from './schema';

const AddDOSApplication = ({
  collageInformationId,
  edit,
  collagePeriod,
}: {
  collageInformationId: string | null;
  edit: boolean;
  collagePeriod?: ScholarCollagePeriod | null;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
    reset,
    setValue,
  } = useForm<z.infer<typeof scholarDosExchangeProgramsApplications>>({
    resolver: zodResolver(scholarDosExchangeProgramsApplications),
  });

  if (edit && collagePeriod) {
    setValue('start_date', formatDateToDisplayInInput(collagePeriod.start_date));
    setValue('end_date', formatDateToDisplayInInput(collagePeriod.end_date));
    setValue('current_academic_period', collagePeriod.current_academic_period);
    setValue('class_modality', collagePeriod.class_modality);
    setValue('grade', collagePeriod.grade);
  }

  const saveData = async (
    data: z.infer<typeof scholarDosExchangeProgramsApplications>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (!collageInformationId) return;
    event?.preventDefault();
    let scholarAcademicPeriod: Prisma.ScholarCollagePeriodCreateInput = {
      class_modality: data.class_modality,
      grade: data.grade,
      current_academic_period: data.current_academic_period,
      start_date: formatDateToStoreInDB(data.start_date),
      end_date: formatDateToStoreInDB(data.end_date),
    };
    if (edit && collagePeriod) await updateAcademicPeriod(scholarAcademicPeriod, collagePeriod.id);
    else await createAcademicPeriod(scholarAcademicPeriod, collageInformationId);
    await revalidateSpecificPath('becario/universidad');
    onClose();
  };
  return (
    <>
      {!edit ? (
        <Button
          isDisabled={collageInformationId === null}
          onPress={onOpen}
          className="col-span-2 lg:col-span-1 text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
        >
          Agregar aplicación
        </Button>
      ) : (
        <Button isIconOnly variant="light" onPress={onOpen}>
          <PencilSquareIcon className="w-4 h-4" />
        </Button>
      )}
      <Modal
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        classNames={{
          backdrop: 'bg-secondary-dark bg-opacity-80',
          base: 'bg-light dark:bg-dark',
        }}
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(async (data, event) =>
            toast.promise(saveData(data, event), {
              pending: 'Guardando cambios...',
              success: 'Cambios guardados',
              error: 'Error al guardar cambios',
            })
          )}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
                  Agregar aplicacion
                </ModalHeader>
                <ModalBody className="grid grid-cols-2 w-full items-center justify-center gap-4">
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.name?.message}
                          errorMessage={formState.errors?.name?.message?.toString()}
                          autoFocus
                          className="col-span-2 md:col-span-1"
                          type="text"
                          label="Nombre del programa"
                          radius="sm"
                        />
                      );
                    }}
                  />{' '}
                  <Controller
                    name="aaplication_date"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.aaplication_date?.message}
                          errorMessage={formState.errors?.aaplication_date?.message?.toString()}
                          className="col-span-2 md:col-span-1"
                          type="date"
                          label="Fecha de de aplicación"
                          placeholder="Fecha de de aplicación"
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="reached_stage"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.reached_stage?.message}
                          errorMessage={formState.errors?.reached_stage?.message?.toString()}
                          className="col-span-2 md:col-span-1"
                          type="text"
                          label="¿Cúal fue la etapa alcanzada?"
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="selected"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Select
                          value={field.value}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.selected?.message}
                          errorMessage={formState.errors?.selected?.message?.toString()}
                          classNames={{ base: 'col-span-2 md:col-span-1' }}
                          radius="sm"
                          label="Modalidad"
                          className="col-span-2 md:col-span-1"
                          selectedKeys={}
                          defaultSelectedKeys={field.value ? [field.value] : []}
                        >
                          {[
                            {
                              label: 'Si',
                              value: 'SI',
                            },
                            {
                              label: 'No',
                              value: 'NO',
                            },
                          ].map((modality) => (
                            <SelectItem
                              key={modality.value.toString()}
                              value={modality.value.toString()}
                            >
                              {modality.label}
                            </SelectItem>
                          ))}
                        </Select>
                      );
                    }}
                  />
                  <Controller
                    name="usa_state"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          className="col-span-2 md:col-span-1"
                          isInvalid={!!formState.errors?.usa_state?.message}
                          errorMessage={formState.errors?.usa_state?.message?.toString()}
                          step="0.01"
                          type="text"
                          label="Estado en el que hicieron el programa. "
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="usa_university"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          className="col-span-2 md:col-span-1"
                          isInvalid={!!formState.errors?.usa_university?.message}
                          errorMessage={formState.errors?.usa_university?.message?.toString()}
                          step="0.01"
                          type="text"
                          label="Universidad en el que hicieron el programa."
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="program_duration"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          className="col-span-2 md:col-span-1"
                          isInvalid={!!formState.errors?.program_duration?.message}
                          errorMessage={formState.errors?.program_duration?.message?.toString()}
                          step="0.01"
                          type="text"
                          label="Año y duración del programa"
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="usa_contact"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          className="col-span-2 md:col-span-1"
                          isInvalid={!!formState.errors?.usa_contact?.message}
                          errorMessage={formState.errors?.usa_contact?.message?.toString()}
                          step="0.01"
                          type="text"
                          label="Punto de contacto en USA"
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="currently_working_org"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          className="col-span-2 md:col-span-1"
                          isInvalid={!!formState.errors?.currently_working_org?.message}
                          errorMessage={formState.errors?.currently_working_org?.message?.toString()}
                          step="0.01"
                          type="text"
                          label="Organización en la que trabajan actualmente"
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="usa_connection"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, formState }) => {
                      return (
                        <Textarea
                          radius="sm"
                          value={field.value || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.usa_connection?.message}
                          errorMessage={formState.errors?.usa_connection?.message?.toString()}
                          label="Descripción"
                          labelPlacement="outside"
                          classNames={{
                            base: 'col-span-2 h-fit w-full',
                          }}
                          placeholder="(Opcional) Coloca la descripción de la actividad"
                        />
                      );
                    }}
                  />
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
                    Agregar
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

export default AddDOSApplication;
