'use client';
import { MODALITY } from '@/lib/constants';
import scholarCVAModuleSchema from '@/lib/schemas/scholar/scholarCVAModuleSchema';
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
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
const AddCvaModule = () => {
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
  return (
    <>
      <Button
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
        <form className="flex flex-col gap-4">
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
                          type="number"
                          label="Numero del modulo en el que te encuentras"
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
                          labelPlacement="outside"
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
                          isInvalid={!!formState.errors?.['qualification']?.message}
                          errorMessage={formState.errors?.['qualification']?.message?.toString()}
                          autoFocus
                          step="0.01"
                          type="number"
                          label="Calificacion obtenida en el modulo"
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
                        <Input
                          value={field.value || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.['record']?.message}
                          errorMessage={formState.errors?.['record']?.message?.toString()}
                          autoFocus
                          type="file"
                          accept="application/pdf"
                          label="Comprobante del modulo"
                          description="Solo en formato PDF"
                          radius="sm"
                          classNames={{ base: 'h-fit' }}
                          labelPlacement="outside"
                        />
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
