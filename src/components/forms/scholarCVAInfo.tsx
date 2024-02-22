'use client';
import { updateCvaInformation } from '@/lib/db/utils/cva';
import scholarCVAInformationSchema from '@/lib/schemas/scholar/scholarCVAInformationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { CvaLocation, ScholarCVAInformation } from '@prisma/client';
import moment from 'moment';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
const ScholarCVAInformation = ({
  scholarCvaInformation,
}: {
  scholarCvaInformation: ScholarCVAInformation;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<z.infer<typeof scholarCVAInformationSchema>>({
    resolver: zodResolver(scholarCVAInformationSchema),
    defaultValues: {
      already_finished_cva: scholarCvaInformation.already_finished_cva === true ? 'YES' : 'NO',
      is_in_cva: scholarCvaInformation.is_in_cva === true ? 'YES' : 'NO',
      certificate: scholarCvaInformation.certificate,
      cva_ended_date: moment(scholarCvaInformation?.cva_ended_date).format('YYYY-MM-DD'),
      cva_location: scholarCvaInformation.cva_location as CvaLocation,
      cva_started_date: moment(scholarCvaInformation.cva_started_date).format('YYYY-MM-DD'),
      not_started_cva_reason: scholarCvaInformation.not_started_cva_reason,
    },
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
    await updateCvaInformation(scholarCvaInformation.scholarId, {
      already_finished_cva: data.already_finished_cva === 'YES',
      certificate: data.certificate,
      cva_ended_date: data.cva_ended_date ? new Date(data.cva_ended_date).toISOString() : null,
      cva_location: data.cva_location,
      cva_started_date: data.cva_started_date
        ? new Date(data.cva_started_date).toISOString()
        : null,
      is_in_cva: data.is_in_cva === 'YES',
      not_started_cva_reason: data.not_started_cva_reason,
    });
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
        <div className="gap-4 grid grid-cols-3 w-full">
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
                        <Input
                          value={field.value || undefined}
                          onChange={field.onChange}
                          isInvalid={!!formState.errors?.['certificate']?.message}
                          errorMessage={formState.errors?.['certificate']?.message?.toString()}
                          type="file"
                          accept="application/pdf"
                          label="Sube tu certificado del CVA"
                          description="Solo en formato PDF"
                          radius="sm"
                          classNames={{ base: 'h-fit' }}
                        />
                      );
                    }}
                  />
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
