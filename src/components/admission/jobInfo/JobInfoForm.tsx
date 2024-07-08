import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

type CollageFormSchemaType = z.infer<typeof contactInfoFormSchema>;

const JobInfoForm = () => {
  const methods = useForm<familyFormSchemaType>({
    resolver: zodResolver(familyFormSchema),
    mode: 'all',
  });
  const onSubmit = (data: familyFormSchemaType) => {
    console.log(data);
    methods.reset(
      {},
      {
        keepErrors: false,
      }
    );
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 "
      >
        <SelectComponent
          label="¿Actualmente trabaja?"
          items={[
            { label: 'Si', value: 'YES' },
            { label: 'No', value: 'NO' },
          ]}
        />
        <Input type="number" label="Nombre de la organización/empresa donde trabaja" />

        <Input type="text" label="Cargo que desempeña" />
        <SelectComponent
          label="Modalidad de trabajo"
          items={[
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
              value: 'Hibrida',
            },
          ]}
        />
        <SelectComponent
          label="Horario de trabajo"
          items={[
            {
              label: 'Tiempo completo',
              value: 'IN_PERSON',
            },
            {
              label: 'Tiempo parcial',
              value: 'ONLINE',
            },
            {
              label: 'Freelancer',
              value: 'Hibrida',
            },
            {
              label: 'Fines de semana',
              value: 'Hibrida',
            },
          ]}
        />
        <SelectComponent
          label="¿Contribuye con el ingreso familiar?"
          items={[
            { label: 'Si', value: 'YES' },
            { label: 'No', value: 'NO' },
          ]}
        />

        <button type="submit">Siguiente</button>
      </form>
    </FormProvider>
  );
};

export default JobInfoForm;
