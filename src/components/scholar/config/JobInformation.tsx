'use client';
import { MODALITY } from '@/lib/constants';
import { updateScholarJobInformation } from '@/lib/db/utils/users';
import JobInformationSchema from '@/lib/schemas/scholar/scholarJobInformationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { JobInformation } from '@prisma/client';
import moment from 'moment';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface JobInformationFormProps {
  scholarJobInformation: JobInformation | undefined;
  scholarId: string;
}

const JobInformationForm: React.FC<JobInformationFormProps> = ({
  scholarJobInformation,
  scholarId,
}) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof JobInformationSchema>>({
    resolver: zodResolver(JobInformationSchema),
    defaultValues: {
      actions_to_get_job: scholarJobInformation?.actions_to_get_job || undefined,
      aspects_that_influenced_getting_job:
        scholarJobInformation?.aspects_that_influenced_getting_job || undefined,
      job_company: scholarJobInformation?.job_company || undefined,
      job_modality: scholarJobInformation?.job_modality || undefined,
      job_schedule: scholarJobInformation?.job_schedule || undefined,
      job_sector: scholarJobInformation?.job_sector || undefined,
      job_start_date: scholarJobInformation?.job_start_date
        ? moment(scholarJobInformation?.job_start_date).format('YYYY-MM-DD')
        : undefined,
      job_title: scholarJobInformation?.job_title || undefined,
      kind_of_job: scholarJobInformation?.kind_of_job || undefined,
      laboral_conditions: scholarJobInformation?.laboral_conditions || undefined,
    },
  });

  const saveData = async (
    data: z.infer<typeof JobInformationSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    data.job_start_date = moment(data.job_start_date).toISOString(true);
    console.log(data);
    await updateScholarJobInformation(scholarId, data, scholarJobInformation?.id!);
  };
  return (
    <>
      <h3 className="text-green-900 mb-4 text-xl font-semibold dark:text-white">
        Información laboral
      </h3>
      <form
        onSubmit={handleSubmit(async (data, event) =>
          toast.promise(saveData(data, event), {
            pending: 'Guardando cambios...',
            success: 'Cambios guardados',
            error: 'Error al guardar cambios',
          })
        )}
      >
        <div className="grid grid-cols-6 gap-6">
          <Controller
            name="job_title"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.job_title?.message}
                errorMessage={formState.errors?.job_title?.message?.toString()}
                isRequired
                type="text"
                label="Puesto de trabajo"
                radius="sm"
                classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                labelPlacement="outside"
              />
            )}
          />

          <Controller
            name="job_company"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.job_company?.message}
                errorMessage={formState.errors?.job_company?.message?.toString()}
                isRequired
                type="text"
                label="Empresa u organización donde trabaja"
                radius="sm"
                classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                labelPlacement="outside"
              />
            )}
          />
          <Controller
            name="job_modality"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.job_modality?.message}
                errorMessage={formState.errors?.job_modality?.message?.toString()}
                classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                radius="sm"
                label="Modalidad de trabajo"
                labelPlacement="outside"
                defaultSelectedKeys={[field.value]}
              >
                {MODALITY.map((modality) => (
                  <SelectItem key={modality.value} value={modality.value}>
                    {modality.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            name="job_schedule"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.job_schedule?.message}
                errorMessage={formState.errors?.job_schedule?.message?.toString()}
                classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                radius="sm"
                label="Horario de trabajo"
                labelPlacement="outside"
                defaultSelectedKeys={[field.value]}
              >
                {[
                  { value: 'PART_TIME', label: 'Medio tiempo' },
                  { value: 'WEEKENDS', label: 'Fines de semana' },
                  { value: 'FULL_TIME', label: 'Tiempo completo' },
                ].map((schedule) => (
                  <SelectItem key={schedule.value} value={schedule.value}>
                    {schedule.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            name="kind_of_job"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.kind_of_job?.message}
                errorMessage={formState.errors?.kind_of_job?.message?.toString()}
                classNames={{ base: 'col-span-6 lg:col-span-1 h-fit' }}
                radius="sm"
                label="Tipo de trabajo"
                labelPlacement="outside"
                defaultSelectedKeys={[field.value]}
              >
                {[
                  { value: 'FREELANCE', label: 'Freelancer' },
                  { value: 'INFORMAL', label: 'Informal' },
                  { value: 'FORMAL', label: 'Formal' },
                ].map((kind) => (
                  <SelectItem key={kind.value} value={kind.value}>
                    {kind.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            name="job_sector"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.job_sector?.message}
                errorMessage={formState.errors?.job_sector?.message?.toString()}
                classNames={{ base: 'col-span-6 lg:col-span-1 h-fit' }}
                radius="sm"
                label="Sector"
                labelPlacement="outside"
                defaultSelectedKeys={[field.value]}
              >
                {[
                  { value: 'PUBLIC', label: 'Publico' },
                  { value: 'PRIVATE', label: 'Privado' },
                ].map((sector) => (
                  <SelectItem key={sector.value} value={sector.value}>
                    {sector.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            name="job_start_date"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.job_start_date?.message}
                errorMessage={formState.errors?.job_start_date?.message?.toString()}
                isRequired
                type="date"
                placeholder="yyyy-mm-dd"
                label="Fecha de inicio de trabajo"
                radius="sm"
                classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                labelPlacement="outside"
              />
            )}
          />
          <Controller
            name="laboral_conditions"
            control={control}
            shouldUnregister={true}
            render={({ field, formState }) => (
              <Textarea
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.laboral_conditions?.message}
                errorMessage={formState.errors?.laboral_conditions?.message?.toString()}
                label="Condiciones laborales"
                radius="sm"
                classNames={{ base: 'col-span-6 lg:col-span-3 h-fit' }}
              />
            )}
          />
          <Controller
            name="actions_to_get_job"
            control={control}
            shouldUnregister={true}
            render={({ field, formState }) => (
              <Textarea
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.actions_to_get_job?.message}
                errorMessage={formState.errors?.actions_to_get_job?.message?.toString()}
                label="Acciones realizadas para obtener el trabajo"
                radius="sm"
                classNames={{ base: 'col-span-6 lg:col-span-3 h-fit' }}
              />
            )}
          />
          <Controller
            name="aspects_that_influenced_getting_job"
            control={control}
            shouldUnregister={true}
            render={({ field, formState }) => (
              <Textarea
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.aspects_that_influenced_getting_job?.message}
                errorMessage={formState.errors?.aspects_that_influenced_getting_job?.message?.toString()}
                label="Aspectos que influyeron para obtener el trabajo"
                radius="sm"
                classNames={{ base: 'col-span-6 h-fit' }}
              />
            )}
          />

          <Button
            type="submit"
            className="col-span-6 md:col-span-1 text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            isDisabled={isSubmitting}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  );
};

export default JobInformationForm;
