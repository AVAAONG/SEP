'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import FormButtonGroup from '../common/FormButtonGroup';
import jobInfoSchema from './schema';

type JobFormSchemaType = z.infer<typeof jobInfoSchema>;

const JobInfoForm = () => {
  const methods = useForm<JobFormSchemaType>({
    resolver: zodResolver(jobInfoSchema),
    mode: 'all',
  });
  const onSubmit = (data: JobFormSchemaType) => {
    console.log(data);
    methods.reset(
      {},
      {
        keepErrors: false,
      }
    );
  };

  const itsWorking = useWatch({
    control: methods.control,
    name: 'currently_working',
  });

  const itsWorkingBoolean = (itsWorking as unknown as string) === 'YES';
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <SelectFormField
            isRequired
            label="¿Actualmente trabaja?"
            name="currently_working"
            selectItems={[
              { label: 'Si', value: 'YES' },
              { label: 'No', value: 'NO' },
            ]}
          />
          <InputField
            isRequired={itsWorkingBoolean}
            isDisabled={!itsWorkingBoolean}
            type="number"
            label="Nombre de la organización/empresa donde trabaja"
            name="job_company"
          />
          <InputField
            isRequired={itsWorkingBoolean}
            isDisabled={!itsWorkingBoolean}
            type="text"
            label="Cargo que desempeña"
            name="job_title"
          />
          <SelectFormField
            isRequired={itsWorkingBoolean}
            isDisabled={!itsWorkingBoolean}
            label="Modalidad de trabajo"
            name="job_modality"
            selectItems={[
              {
                label: 'Prsencial',
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
            name="job_schedule"
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
        <FormButtonGroup />
      </form>
    </FormProvider>
  );
};

export default JobInfoForm;
