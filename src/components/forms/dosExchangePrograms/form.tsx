'use client';
import {
  addDOSExchangeProgramApplication,
  updateDOSExchangeProgramApplicationd,
} from '@/lib/db/utils/users';
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
import { DOSExchangeProgram, Prisma } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import scholarDosExchangeProgramsApplications from './schema';

const AddDOSApplication = ({
  scholarId,
  edit,
  dosProgramApplication,
}: {
  scholarId: string | undefined;
  edit: boolean;
  dosProgramApplication?: DOSExchangeProgram | null;
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

  if (edit && dosProgramApplication && !isDirty) {
    setValue('aplication_date', formatDateToDisplayInInput(dosProgramApplication.aplication_date));
    setValue('currently_working_org', dosProgramApplication.currently_working_org);
    setValue('name', dosProgramApplication.name);
    setValue('program_duration', dosProgramApplication.program_duration);
    setValue('reached_stage', dosProgramApplication.reached_stage);
    setValue('selected', dosProgramApplication.selected ? 'SI' : 'NO');
    setValue('usa_connection', dosProgramApplication.usa_connection);
    setValue('usa_contact', dosProgramApplication.usa_contact);
    setValue('usa_state', dosProgramApplication.usa_state);
    setValue('usa_university', dosProgramApplication.usa_university);
  }

  const saveData = async (
    data: z.infer<typeof scholarDosExchangeProgramsApplications>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (!scholarId) return;
    event?.preventDefault();

    const dosProgramApplicationCreationData: Prisma.DOSExchangeProgramCreateInput = {
      ...data,
      selected: data.selected === 'SI' ? true : false,
      aplication_date: formatDateToStoreInDB(data.aplication_date),
    };

    if (edit && dosProgramApplication) {
      await updateDOSExchangeProgramApplicationd(dosProgramApplication.id, dosProgramApplicationCreationData);
    }
    else {
      await addDOSExchangeProgramApplication(scholarId, dosProgramApplicationCreationData);
    }
    await revalidateSpecificPath('becario/dos');
    onClose();
  };
  return (
    <>
      {!edit ? (
        <Button
          isDisabled={scholarId === null}
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
                  Agregar aplicación
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
                    name="aplication_date"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.aplication_date?.message}
                          errorMessage={formState.errors?.aplication_date?.message?.toString()}
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
                          label="¿Quedaste seleccionado?"
                          className="col-span-2 md:col-span-1"
                          selectedKeys={[field.value]}
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
                          label="Estado en el que hiciste el programa. "
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
                          label="Universidad en el que hiciste el programa."
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
                          label="Punto de contacto en USA"
                          labelPlacement="outside"
                          classNames={{
                            base: 'col-span-2 h-fit w-full',
                          }}
                          placeholder=""
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
