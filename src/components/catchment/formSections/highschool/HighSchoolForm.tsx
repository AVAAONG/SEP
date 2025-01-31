'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import TextAreaFormField from '@/components/fields/TextAreaFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from '@nextui-org/react';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import highSchoolFormSchema from './HighSchoolSchema';

type HighSchoolFormSchemaType = z.infer<typeof highSchoolFormSchema>;

const HighSchoolForm = () => {
  const methods = useForm<HighSchoolFormSchemaType>({
    resolver: zodResolver(highSchoolFormSchema),
    mode: 'all',
  });

  const graduationTitle = useWatch({
    control: methods.control,
    name: 'graduation_title',
  });

  useEffect(() => {
    if (graduationTitle !== 'MEDIAN_TECHNICIAN') {
      methods.setValue('mention', '');
    }
  }, [graduationTitle, methods.setValue]);

  const onSubmit = (data: HighSchoolFormSchemaType) => {
    console.log(data);
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
            name="institutionDependency"
            selectItems={[
              { label: 'Pública', value: 'PUBLIC' },
              { label: 'Privada', value: 'PRIVATE' },
              { label: 'Subsidiada', value: 'SUBSIDY' },
            ]}
          />
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
            name="graduation_title"
            selectItems={[
              { label: 'Bachiller en Ciencias', value: 'BACHELOR_IN_SCIENCE' },
              { label: 'Técnico medio', value: 'MEDIAN_TECHNICIAN' },
            ]}
          />
          {graduationTitle === 'MEDIAN_TECHNICIAN' && (
            <InputField
              isRequired={graduationTitle === 'MEDIAN_TECHNICIAN'}
              isDisabled={graduationTitle !== 'MEDIAN_TECHNICIAN'}
              type="text"
              description="Ejemplo: Industrial"
              label="Mención"
              name="mention"
            />
          )}

          <TextAreaFormField
            name="extracurricularActivities"
            label="Actividades extracurriculares realizadas durante la educación secundaria"
            className="md:col-span-2"
          />
        </div>
        <div className="col-span-2 flex gap-4">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/familia"
            className="w-full"
            variant="bordered"
          >
            Anterior
          </Button>
          <Button radius="sm" type="submit" className="w-full">
            Siguiente
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default HighSchoolForm;
