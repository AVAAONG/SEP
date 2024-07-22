'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import TextAreaFormField from '@/components/fields/TextAreaFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormButtonGroup from '../common/FormButtonGroup';
import highSchoolFormSchema from './schema';

type HighSchoolFormSchemaType = z.infer<typeof highSchoolFormSchema>;

const HighSchoolForm = () => {
  const methods = useForm<HighSchoolFormSchemaType>({
    resolver: zodResolver(highSchoolFormSchema),
    mode: 'all',
  });

  const onSubmit = (data: HighSchoolFormSchemaType) => {
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
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <InputField
            label="Nombre de la institución"
            type="text"
            name="institutionName"
            autoFocus
            isRequired
          />
          <SelectFormField
            isRequired
            label="Dependencia de la institución"
            name="study_regime"
            selectItems={[
              { label: 'Pública', value: 'PUBLIC' },
              { label: 'Privada', value: 'PRIVATE' },
              { label: 'Subsidiada', value: 'SUBSIDY' },
            ]}
          />
          {/* <InputField
          label="Nombre del director(a) de la institución"
          type="text"
          name="directorName"
          isRequired
        /> */}
          {/* <InputField
          label="Dirección de la institución"
          type="text"
          name="institutionAddress"
          className="md:col-span-2" // Pass Tailwind class directly
          isRequired
        /> */}
          <InputField
            label="Promedio de notas de bachillerato"
            type="number"
            name="gpa"
            min={1}
            max={20}
            isRequired
          />
          <SelectFormField
            isRequired
            label="Título obtenido al egresar de la institución"
            name="study_regime"
            selectItems={[
              { label: 'Bachiller en Ciencias', value: 'BACHELOR_IN_CIENCE' },
              { label: 'Técnico medio', value: 'MEDIAN_TECNICIAN' },
            ]}
          />
          <InputField
            type="text"
            description="Ejemplo: Industrial"
            label="Mención"
            name="degree"
            isRequired
          />
          {/* <InputField
          type="text"
          label="Lugar donde realizó sus horas de labor social"
          name="socialServiceLocation"
          className="md:col-span-2"
          isRequired
        /> */}
          {/* <TextAreaFormField
          name="socialServiceLearnings"
          label="Aprendizajes obtenidos en la labor social"
          className="md:col-span-2"
          isRequired
        /> */}
          <TextAreaFormField
            name="extracurricularActivities"
            label="Actividades extracurriculares realizadas durante la educación secundaria"
            className="md:col-span-2"
          />
        </div>
        <FormButtonGroup />
      </form>
    </FormProvider >
  );
};

export default HighSchoolForm;
