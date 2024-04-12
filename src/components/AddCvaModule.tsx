'use client';
import { uploadBlob } from '@/lib/azure/azure';
import { MODALITY } from '@/lib/constants';
import { createCvaModule } from '@/lib/db/utils/cva';
import scholarCVAModuleSchema from '@/lib/schemas/scholar/scholarCVAModuleSchema';
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

const AddCvaModule = ({ cvaInformationId }: { cvaInformationId: string | null }) => {
  const [record, setRecord] = useState<File | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<z.infer<typeof scholarCVAModuleSchema>>({
    resolver: zodResolver(scholarCVAModuleSchema),
  });
  const saveData = async (
    data: z.infer<typeof scholarCVAModuleSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (!cvaInformationId) return;
    event?.preventDefault();
    let scholarCvaModuleInfo: Prisma.ScholarCvaModuleCreateInput = {
      module: data.module,
      modality: data.modality,
      qualification: data.qualification,
      schedule: data.schedule,
    };
    if (record) {
      const recordBase64 = await readFileAsBase64(record);
      const recordForDb = await uploadBlob(recordBase64, 'application/pdf', 'files');
      scholarCvaModuleInfo.record = recordForDb!;
    }
    createCvaModule(scholarCvaModuleInfo, cvaInformationId);
    await revalidateSpecificPath('becario/cva');
    onClose();
  };
  return (
    <>
      <Button
        isDisabled={cvaInformationId === null}
        onPress={onOpen}
        className="col-span-2 lg:col-span-1 text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
      >
        Agregar registro
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
                    name="module"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.['module']?.message}
                          errorMessage={formState.errors?.['module']?.message?.toString()}
                          autoFocus
                          className="col-span-2 md:col-span-1"
                          type="number"
                          label="Numero del ultimo modulo cursado"
                          radius="sm"
                        />
                      );
                    }}
                  />

                  <Controller
                    name="modality"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Select
                          value={field.value}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.['modality']?.message}
                          errorMessage={formState.errors?.['modality']?.message?.toString()}
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
                    name="qualification"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value?.toString() || undefined}
                          onChange={field.onChange}
                          className="col-span-2 md:col-span-1"
                          isInvalid={!!formState.errors?.['qualification']?.message}
                          errorMessage={formState.errors?.['qualification']?.message?.toString()}
                          step="0.01"
                          type="number"
                          label="Calificacion obtenida en el ultimo modulo cursado"
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
                            placeholder="Constancia"
                          />
                        </div>
                      );
                    }}
                  />

                  <Controller
                    name="schedule"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field, formState }) => (
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        isInvalid={!!formState.errors?.['schedule']?.message}
                        errorMessage={formState.errors?.['schedule']?.message?.toString()}
                        radius="sm"
                        className="col-span-2 md:col-span-1"
                        label="Horario"
                        defaultSelectedKeys={[field.value]}
                        selectedKeys={[field.value]}
                      >
                        {[
                          { value: 'DIARY', label: 'Diario' },
                          { value: 'INTERDIARY', label: 'Interdiario' },
                          { value: 'SABATINO', label: 'Sabatino' },
                        ].map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
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
                    Agregar registro
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

export default AddCvaModule;
