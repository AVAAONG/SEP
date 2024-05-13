'use client';
import { deleteBlobFile, uploadBlob } from '@/lib/azure/azure';
import { createCvaInformation, updateCvaInformation } from '@/lib/db/utils/cva';
import scholarCVAInformationSchema from '@/lib/schemas/scholar/scholarCVAInformationSchema';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { formatDateToDisplayInInput, formatDateToStoreInDB } from '@/lib/utils/dates';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, Textarea, Tooltip } from '@nextui-org/react';
import { CvaLocation, ScholarCVAInformation as IScholarCVAInformation, Prisma } from '@prisma/client';
import Link from 'next/link';
import { BaseSyntheticEvent, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import shortUUID from 'short-uuid';
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

const ScholarCVAInformation = ({
  scholarCvaInformation,
  certificateUrl,
  scholarId,
}: {
  scholarCvaInformation: IScholarCVAInformation | null;
  certificateUrl: string | null;
  scholarId: string;
}) => {
  const [certificate, setCertificate] = useState<File | null>(null);

  let defaultValues = scholarCvaInformation
    ? {
      already_finished_cva: scholarCvaInformation?.already_finished_cva === true ? 'YES' : 'NO',
      is_in_cva: scholarCvaInformation?.is_in_cva === true ? 'YES' : 'NO',
      cva_ended_date: scholarCvaInformation.cva_ended_date
        ? formatDateToDisplayInInput(scholarCvaInformation?.cva_ended_date)
        : null,
      cva_location: scholarCvaInformation?.cva_location as CvaLocation,
      cva_started_date: scholarCvaInformation.cva_started_date
        ? formatDateToDisplayInInput(scholarCvaInformation?.cva_started_date)
        : null,
      not_started_cva_reason: scholarCvaInformation?.not_started_cva_reason,
    }
    : undefined;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof scholarCVAInformationSchema>>({
    resolver: zodResolver(scholarCVAInformationSchema),
    defaultValues: defaultValues,
  });
  const isInCva = useWatch({
    control,
    name: 'is_in_cva',
  });
  const alreadyFinishedCVA = useWatch({
    control,
    name: 'already_finished_cva',
  });
  const saveData = async (
    data: z.infer<typeof scholarCVAInformationSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    let scholarCvaInfo:
      | Prisma.ScholarCVAInformationUpdateInput
      | Prisma.ScholarCVAInformationCreateInput = {
      already_finished_cva: data.already_finished_cva === 'YES',
      cva_ended_date: data.cva_ended_date ? formatDateToStoreInDB(data.cva_ended_date) : null,
      cva_location: data.cva_location,
      cva_started_date: data.cva_started_date
        ? formatDateToStoreInDB(data.cva_started_date)
        : null,
      is_in_cva: data.is_in_cva === 'YES',
      not_started_cva_reason: data.not_started_cva_reason,
    };
    if (certificate) {
      const certificateBase64 = await readFileAsBase64(certificate);
      const fileType = certificate.type; // Get the type of the file dynamically
      const certificateForDb = await uploadBlob(certificateBase64, fileType, 'files');
      scholarCvaInfo.certificate = certificateForDb!;
    }
    if (scholarCvaInformation?.scholarId) {
      await updateCvaInformation(
        scholarCvaInformation?.scholarId,
        scholarCvaInfo as Prisma.ScholarCVAInformationUpdateInput
      );
    } else {
      await createCvaInformation({
        ...(scholarCvaInfo as Prisma.ScholarCVAInformationCreateInput),
        id: shortUUID.generate(),
        scholar: { connect: { id: scholarId } },
      });
    }
    await revalidateSpecificPath('becario/cva');
  };

  const options = [
    { value: 'YES', label: 'Sí' },
    { value: 'NO', label: 'No' },
  ];

  return (
    <>
      <form
        className="gap-4 flex flex-col w-full "
        onSubmit={handleSubmit(async (data, event) =>
          toast.promise(saveData(data, event), {
            pending: 'Guardando cambios...',
            success: 'Cambios guardados',
            error: 'Error al guardar cambios',
          })
        )}
      >
        <div className="gap-4 grid lg:grid-cols-3 w-full">
          <Controller
            name="cva_started_date"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  value={field.value || undefined}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['cva_started_date']?.message}
                  errorMessage={formState.errors?.['cva_started_date']?.message?.toString()}
                  type="date"
                  label="Fecha de inicio del CVA"
                  radius="sm"
                  placeholder="YYYY-MM-DD"
                />
              );
            }}
          />
          <Controller
            name="is_in_cva"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['is_in_cva']?.message}
                errorMessage={formState.errors?.['is_in_cva']?.message?.toString()}
                radius="sm"
                label="¿Te encuentras cursando el CVA?"
                defaultSelectedKeys={[field.value]}
                selectedKeys={[field.value]}
              >
                {options.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          {isInCva === 'NO' ? (
            <>
              <Controller
                name="already_finished_cva"
                control={control}
                rules={{ required: true }}
                render={({ field, formState }) => (
                  <Select
                    value={field.value || undefined}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['already_finished_cva']?.message}
                    errorMessage={formState.errors?.['already_finished_cva']?.message?.toString()}
                    radius="sm"
                    label="¿Culminaste el CVA?"
                    defaultSelectedKeys={[field.value]}
                    selectedKeys={[field.value]}
                  >
                    {options.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              {alreadyFinishedCVA === 'YES' ? (
                <>
                  {' '}
                  <Controller
                    name="cva_ended_date"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, formState }) => {
                      return (
                        <Input
                          value={field.value || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.['cva_ended_date']?.message}
                          errorMessage={formState.errors?.['cva_ended_date']?.message?.toString()}
                          type="date"
                          placeholder="YYYY-MM-DD"
                          label="Fecha de finalización del CVA"
                          radius="sm"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="certificate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, formState }) => {
                      return (
                        <div className="flex gap-2 text-sm flex-col">
                          <label htmlFor="certificateInput">
                            Certificado del CVA (Solo documentos PDF)
                          </label>
                          <input
                            id="certificateInput"
                            value={field.value?.toString()}
                            onChange={async (e) => {
                              if (scholarCvaInformation?.certificate) {
                                await deleteBlobFile(scholarCvaInformation?.certificate!);
                                await updateCvaInformation(scholarCvaInformation?.scholarId, {
                                  certificate: null,
                                });
                              }
                              setCertificate((prev) => {
                                prev = e?.target.files?.[0] || null;
                                return prev;
                              });
                              field.onChange(e);
                            }}
                            type="file"
                            className="flex items-center"
                            accept="application/pdf"
                            placeholder="Constancia"
                          />
                        </div>
                      );
                    }}
                  />
                  {scholarCvaInformation?.certificate && (
                    <Tooltip content="Certificado del CVA">
                      <div className="m-auto">
                        <Link href={certificateUrl ?? ''}>
                          <DocumentTextIcon className="w-10 h-10 text-primary-light" />
                        </Link>
                      </div>
                    </Tooltip>
                  )}
                </>
              ) : (
                <>
                  {alreadyFinishedCVA === 'NO' && (
                    <Controller
                      name="not_started_cva_reason"
                      control={control}
                      rules={{ required: true }}
                      render={({ field, formState }) => {
                        return (
                          <Textarea
                            radius="sm"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            isInvalid={!!formState.errors?.['not_started_cva_reason']?.message}
                            errorMessage={formState.errors?.[
                              'not_started_cva_reason'
                            ]?.message?.toString()}
                            label="Razon por la que no estas cursando el CVA"
                            classNames={{
                              base: 'col-span-3 h-fit w-full',
                            }}
                          />
                        );
                      }}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Controller
                name="cva_location"
                control={control}
                rules={{ required: true }}
                render={({ field, formState }) => (
                  <Select
                    value={field.value?.toString()}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['cva_location']?.message}
                    errorMessage={formState.errors?.['cva_location']?.message?.toString()}
                    radius="sm"
                    label="¿En que cede del CVA te encuentras?"
                    defaultSelectedKeys={[field.value || '']}
                    selectedKeys={[field.value || '']}
                  >
                    {[
                      { value: 'MERCEDES', label: 'Las mercedes' },
                      { value: 'CENTRO', label: 'El centro' },
                    ].map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </>
          )}
        </div>
        <Button
          type="submit"
          className=" w-72 text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          isDisabled={isSubmitting}
        >
          Guardar cambios
        </Button>
      </form>
    </>
  );
};

export default ScholarCVAInformation;
