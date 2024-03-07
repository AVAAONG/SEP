'use client';
import { uploadBlob } from '@/lib/azure/azure';
import { MODALITY } from '@/lib/constants';
import { createAcademicPeriod } from '@/lib/db/utils/collage';
import scholarAcademicPeriodCreationSchema from '@/lib/schemas/scholar/scholarAcademicPeriodCreationSchema';
import { revalidateSpecificPath } from '@/lib/serverAction';
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
  useDisclosure,
} from '@nextui-org/react';
import { Prisma } from '@prisma/client';
import { BaseSyntheticEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const readFileAsBase64 = (file: File | null): Promise<string> => {
  if (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } else {
    throw new Error('No file provided');
  }
};

const AddCollageAcademicPeriod = ({
  collageInformationId,
}: {
  collageInformationId: string | null;
}) => {
  const [record, setRecord] = useState<File | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<z.infer<typeof scholarAcademicPeriodCreationSchema>>({
    resolver: zodResolver(scholarAcademicPeriodCreationSchema),
  });
  const saveData = async (
    data: z.infer<typeof scholarAcademicPeriodCreationSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (!collageInformationId) return;
    event?.preventDefault();
    let scholarAcademicPeriod: Prisma.ScholarCollagePeriodCreateInput = {
      class_modality: data.class_modality,
      grade: data.grade,
      current_academic_period: data.current_academic_period,
      record: '',
    };
    if (record) {
      const recordBase64 = await readFileAsBase64(record);
      const recordForDb = await uploadBlob(recordBase64, 'application/pdf', 'files');
      scholarAcademicPeriod.record = recordForDb!;
    }
    await createAcademicPeriod(scholarAcademicPeriod, collageInformationId);
    await revalidateSpecificPath('becario/universidad');
    onClose();
  };
  return (
    <>
      <Button
        isDisabled={collageInformationId === null}
        onPress={onOpen}
        className="col-span-2 lg:col-span-1 text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
      >
        Agregar periodo academico
      </Button>
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
                  Agregar registro
                </ModalHeader>
                <ModalBody className="grid grid-cols-2 w-full items-center justify-center gap-4">
                  <Controller
                    name="start_date"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.['start_date']?.message}
                          errorMessage={formState.errors?.['start_date']?.message?.toString()}
                          autoFocus
                          placeholder="Fecha de inicio de periodo"
                          className="col-span-2 md:col-span-1"
                          type="date"
                          label="Fecha de inicio de periodo"
                          radius="sm"
                        />
                      );
                    }}
                  />{' '}
                  <Controller
                    name="end_date"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.['end_date']?.message}
                          errorMessage={formState.errors?.['end_date']?.message?.toString()}
                          className="col-span-2 md:col-span-1"
                          type="date"
                          label="Fecha de finalizacion de periodo"
                          placeholder="Fecha de finalizacion de periodo"
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="current_academic_period"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.['current_academic_period']?.message}
                          errorMessage={formState.errors?.[
                            'current_academic_period'
                          ]?.message?.toString()}
                          className="col-span-2 md:col-span-1"
                          type="number"
                          label="Numero del ultimo periodo cursado"
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="class_modality"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Select
                          value={field.value}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.['class_modality']?.message}
                          errorMessage={formState.errors?.['class_modality']?.message?.toString()}
                          classNames={{ base: 'col-span-2 md:col-span-1' }}
                          radius="sm"
                          label="Modalidad"
                          className="col-span-2 md:col-span-1"
                          defaultSelectedKeys={[field.value]}
                        >
                          {MODALITY.map((modality) => (
                            <SelectItem key={modality.value} value={modality.value}>
                              {modality.label}
                            </SelectItem>
                          ))}
                        </Select>
                      );
                    }}
                  />
                  <Controller
                    name="grade"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          className="col-span-2 md:col-span-1"
                          isInvalid={!!formState.errors?.['grade']?.message}
                          errorMessage={formState.errors?.['grade']?.message?.toString()}
                          step="0.01"
                          type="number"
                          label="Calificacion obtenida en el ultimo periodo cursado"
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="record"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <div className="flex gap-2 text-sm flex-col col-span-2 md:col-span-1">
                          <label htmlFor="recorInput">
                            Comprobante del modulo (Solo documentos PDF)
                          </label>
                          <input
                            id="recorInput"
                            value={field.value?.toString()}
                            onChange={async (e) => {
                              setRecord((prev) => {
                                prev = e?.target.files?.[0] || null;
                                return prev;
                              });
                              field.onChange(e);
                            }}
                            type="file"
                            accept=".pdf, .jpg, .jpeg, .png"
                            className="flex items-center"
                            placeholder="Adjunta tus últimas notas y promedio obtenido"
                          />
                        </div>
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
                    Agregar periodo
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

export default AddCollageAcademicPeriod;
