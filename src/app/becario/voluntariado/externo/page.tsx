'use client';
import { uploadBlob } from '@/lib/azure/azure';
import { MODALITY } from '@/lib/constants';
import { createExternalVolunteer } from '@/lib/db/utils/volunteer';
import externalVolunteerSubmisionSchema from '@/lib/schemas/scholar/externalVolunteerSubmisionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { Prisma } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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

const page = () => {
  const router = useRouter();
  const sesion = useSession();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm<z.infer<typeof externalVolunteerSubmisionSchema>>({
    resolver: zodResolver(externalVolunteerSubmisionSchema),
  });
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const submitExternalVolunter = async (
    data: z.infer<typeof externalVolunteerSubmisionSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    const proofInBase64 = await readFileAsBase64(selectedDocument);
    const proof = await uploadBlob(proofInBase64, 'application/pdf', 'files');
    const volunteerData: Prisma.VolunteerCreateInput = {
      beneficiary: data.beneficiary,
      description: data.description,
      end_dates: [new Date(data.end_dates).toISOString()],
      modality: data.modality,
      platform: data.platform,
      proof,
      start_dates: [new Date(data.start_dates).toISOString()],
      supervisor: data.supervisor,
      supervisor_email: data.supervisor_email,
      title: data.title,
      kind_of_volunteer: 'EXTERNAL',
      status: 'PENDING',
    };
    if (!sesion.data?.scholarId) throw new Error('No se encontro el id del becario');
    const externalVolunteer = await createExternalVolunteer(volunteerData, sesion.data?.scholarId, data.asigned_hours);
    reset(undefined);
    setSelectedDocument(null);
    router.push(`/becario/voluntariado/${externalVolunteer.id}`);
  };
  return (
    <section className="flex flex-col md:px-12 justify-start items-center w-full gap-4">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4">
        ¡Sube tu voluntariado externo!
      </h1>
      <form
        onSubmit={handleSubmit((data, event) =>
          toast.promise(submitExternalVolunter(data, event), {
            pending: 'Subiendo voluntariado...',
            success: 'Voluntariado externo subido con exito 🎉',
            error: 'Ocurrió un error al subir el voluntariado',
          })
        )}
        className="flex flex-col gap-8 w-full justify-center items-center"
      >
        <div className="flex flex-col lg:flex-row gap-8 justify-center w-full">
          <div className="grid grid-cols-2 gap-4 w-full justify-center">
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field, formState }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['title']?.message}
                    errorMessage={formState.errors?.['title']?.message?.toString()}
                    isRequired
                    type="text"
                    label="Titulo de la actividad"
                    classNames={{ base: 'col-span-2', inputWrapper: 'bg-gray-100' }}
                    radius="sm"
                    labelPlacement="outside"
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
                    classNames={{
                      base: 'col-span-2 md:col-span-1',
                      innerWrapper: 'bg-gray-100',
                      helperWrapper: 'bg-gray-100',
                      trigger: 'bg-gray-100',
                    }}
                    radius="sm"
                    isRequired
                    label="Modalidad"
                    labelPlacement="outside"
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
              name="start_dates"
              control={control}
              rules={{ required: true }}
              render={({ field, formState }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['start_dates']?.message}
                    errorMessage={formState.errors?.['start_dates']?.message?.toString()}
                    isRequired
                    type="date"
                    label="Fecha de inicio"
                    radius="sm"
                    labelPlacement="outside"
                    classNames={{ base: 'col-span-2 md:col-span-1', inputWrapper: 'bg-gray-100' }}
                    placeholder="Fecha de inicio de la actividad"
                  />
                );
              }}
            />
            <Controller
              name="end_dates"
              control={control}
              rules={{ required: true }}
              render={({ field, formState }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['end_dates']?.message}
                    errorMessage={formState.errors?.['end_dates']?.message?.toString()}
                    isRequired
                    type="date"
                    label="Fecha de cierre"
                    radius="sm"
                    labelPlacement="outside"
                    classNames={{ base: 'col-span-2 md:col-span-1', inputWrapper: 'bg-gray-100' }}
                    placeholder="Fecha de cierre de la actividad"
                  />
                );
              }}
            />

            <Controller
              name="platform"
              control={control}
              rules={{ required: true }}
              render={({ field, formState }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['platform']?.message}
                    errorMessage={formState.errors?.['platform']?.message?.toString()}
                    isRequired
                    type="text"
                    label="Lugar donde se realizo la actividad"
                    radius="sm"
                    classNames={{ base: 'col-span-2 md:col-span-1', inputWrapper: 'bg-gray-100' }}
                    labelPlacement="outside"
                  />
                );
              }}
            />
            <Controller
              name="beneficiary"
              control={control}
              rules={{ required: true }}
              render={({ field, formState }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['beneficiary']?.message}
                    errorMessage={formState.errors?.['beneficiary']?.message?.toString()}
                    isRequired
                    type="text"
                    label="Beneficiario"
                    classNames={{ base: 'col-span-2 md:col-span-1', inputWrapper: 'bg-gray-100' }}
                    radius="sm"
                    labelPlacement="outside"
                  />
                );
              }}
            />
            <Controller
              name="supervisor"
              control={control}
              rules={{ required: true }}
              render={({ field, formState }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['supervisor']?.message}
                    errorMessage={formState.errors?.['supervisor']?.message?.toString()}
                    isRequired
                    type="text"
                    classNames={{ base: 'col-span-2 md:col-span-1', inputWrapper: 'bg-gray-100' }}
                    label="Supervisor de la actividad"
                    radius="sm"
                    labelPlacement="outside"
                  />
                );
              }}
            />
            <Controller
              name="supervisor_email"
              control={control}
              rules={{ required: true }}
              render={({ field, formState }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['supervisor_email']?.message}
                    errorMessage={formState.errors?.['supervisor_email']?.message?.toString()}
                    isRequired
                    type="email"
                    classNames={{ base: 'col-span-2 md:col-span-1', inputWrapper: 'bg-gray-100' }}
                    label="Correo del supervisor"
                    radius="sm"
                    labelPlacement="outside"
                  />
                );
              }}
            />
            <Controller
              name="asigned_hours"
              control={control}
              rules={{ required: true }}
              render={({ field, formState }) => {
                return (
                  <Input
                    value={field.value?.toString()}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['asigned_hours']?.message}
                    errorMessage={formState.errors?.['asigned_hours']?.message?.toString()}
                    isRequired
                    type="number"
                    classNames={{ base: 'col-span-2 md:col-span-1', inputWrapper: 'bg-gray-100' }}
                    label="Horas asignadas"
                    radius="sm"
                    labelPlacement="outside"
                  />
                );
              }}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              shouldUnregister={true}
              render={({ field, formState }) => {
                return (
                  <Textarea
                    radius="sm"
                    value={field.value || undefined}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['description']?.message}
                    errorMessage={formState.errors?.['description']?.message?.toString()}
                    label="Descripción"
                    labelPlacement="outside"
                    classNames={{
                      base: 'col-span-2 h-fit w-full',
                      inputWrapper: 'bg-gray-100',
                    }}
                    placeholder="(Opcional) Coloca la descripcion de la actividad"
                  />
                );
              }}
            />
          </div>

          <div className="flex flex-col w-full lg:w-2/3 justify-center ">
            {selectedDocument && (
              <>
                <iframe
                  className="w-full h-full"
                  src={URL.createObjectURL(selectedDocument)}
                ></iframe>
              </>
            )}
            {!selectedDocument && (
              <label
                htmlFor="dropzone-file"
                className=" p-4 flex flex-col items-center justify-center w-full h-full border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 dark:hover:bg-bray-800 dark:bg-emerald-950 hover:bg-green-100 dark:border-emerald-900 dark:hover:border-emerald-800 dark:hover:bg-emerald-900"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-green-500 dark:text-green-400 font-semibold text-center">
                    Adjunte aqui la constancia emitida por la organización, empresa o institución
                    beneficiada.
                  </p>
                  <p className="text-xs text-green-500 dark:text-green-400">
                    {' '}
                    Solo archivos en formato PDF
                  </p>
                </div>
                <Controller
                  name="proof"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, formState }) => {
                    return (
                      <input
                        value={field.value || ''}
                        accept="application/pdf"
                        onChange={(e) => {
                          setSelectedDocument((prev) => {
                            prev = e?.target.files?.[0] || null;
                            return prev;
                          });
                          field.onChange(e);
                        }}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    );
                  }}
                />
              </label>
            )}
          </div>
        </div>
        <Button
          className="text-white w-64 bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
          isDisabled={!isValid || isSubmitting}
        >
          Subir voluntariado
        </Button>
      </form>
    </section>
  );
};

export default page;
