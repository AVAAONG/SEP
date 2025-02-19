'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { createOrUpdateJobInfo } from '@/lib/db/utils/applicant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from "@heroui/react";
import { JobInfo, JobSchedule, Modality, Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import jobInfoSchema from './jobInfoSchema';

type JobFormSchemaType = z.infer<typeof jobInfoSchema>;

const JobInfoForm = ({
  applicantId,
  applicantJobInfo,
}: {
  applicantId: string;
  applicantJobInfo?: JobInfo;
}) => {
  const router = useRouter();

  const methods = useForm<JobFormSchemaType>({
    resolver: zodResolver(jobInfoSchema),
    defaultValues: {
      currentlyWorking: applicantJobInfo?.currentlyWorking === true ? 'YES' : 'NO',
      jobModality: applicantJobInfo?.jobModality ?? undefined,
      jobTitle: applicantJobInfo?.jobTitle ?? undefined,
      jobSchedule: applicantJobInfo?.jobSchedule ?? undefined,
      jobCompany: applicantJobInfo?.jobCompany ?? undefined,
    },
    mode: 'onSubmit',
  });

  const itsWorking = useWatch({
    control: methods.control,
    name: 'currentlyWorking',
  });

  const itsWorkingBoolean = itsWorking === 'YES';

  useEffect(() => {
    if (!itsWorkingBoolean) {
      methods.reset(
        {
          currentlyWorking: 'NO',
          jobCompany: '',
          jobTitle: '',
          jobModality: '',
          jobSchedule: '',
        },
        {
          keepErrors: false,
        }
      );
    }
  }, [itsWorkingBoolean]);

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: JobFormSchemaType) => {
    const dataToSubmit: Prisma.JobInfoUpdateInput = {
      ...data,
      currentlyWorking: data.currentlyWorking === 'YES',
      jobSchedule: data.jobSchedule as JobSchedule,
      jobModality: data.jobModality as Modality,
    };
    if (data.currentlyWorking === 'NO') {
      dataToSubmit.jobCompany = null;
      dataToSubmit.jobTitle = null;
      dataToSubmit.jobModality = null;
      dataToSubmit.jobSchedule = null;
    }
    await createOrUpdateJobInfo(applicantId, dataToSubmit);
    router.push('/captacion/postulacion/idiomas');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <SelectFormField
            isRequired
            label="¿Actualmente trabaja?"
            name="currentlyWorking"
            selectItems={[
              { label: 'Si', value: 'YES' },
              { label: 'No', value: 'NO' },
            ]}
          />
          <InputField
            isRequired={itsWorkingBoolean}
            isDisabled={!itsWorkingBoolean}
            type="text"
            label="Nombre de la organización/empresa donde trabaja"
            name="jobCompany"
          />
          <InputField
            isRequired={itsWorkingBoolean}
            isDisabled={!itsWorkingBoolean}
            type="text"
            label="Cargo que desempeña"
            name="jobTitle"
          />
          <SelectFormField
            isRequired={itsWorkingBoolean}
            isDisabled={!itsWorkingBoolean}
            label="Modalidad de trabajo"
            name="jobModality"
            selectItems={[
              {
                label: 'Presencial',
                value: 'IN_PERSON',
              },
              {
                label: 'Virtual',
                value: 'ONLINE',
              },
              {
                label: 'Mixta',
                value: 'HYBRID',
              },
            ]}
          />
          <SelectFormField
            isRequired={itsWorkingBoolean}
            isDisabled={!itsWorkingBoolean}
            label="Horario de trabajo"
            name="jobSchedule"
            selectItems={[
              {
                label: 'Tiempo completo',
                value: 'FULL_TIME',
              },
              {
                label: 'Tiempo parcial',
                value: 'PART_TIME',
              },
              {
                label: 'Fines de semana',
                value: 'WEEKENDS',
              },
            ]}
          />
        </div>
        <div className="col-span-2 flex gap-4">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/postulacion/familia"
            className="w-full"
            variant="bordered"
          >
            Anterior
          </Button>
          <Button radius="sm" type="submit" className="w-full" isLoading={formState.isSubmitting}>
            Siguiente
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default JobInfoForm;
