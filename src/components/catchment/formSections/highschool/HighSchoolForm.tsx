'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import TextAreaFormField from '@/components/fields/TextAreaFormField';
import { createOrUpdateHighSchoolInfo } from '@/lib/db/utils/applicant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from "@heroui/react";
import { HighSchool } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import highSchoolFormSchema from './HighSchoolSchema';

type HighSchoolFormSchemaType = z.infer<typeof highSchoolFormSchema>;

const HighSchoolForm = ({
  applicantId,
  applicantHighSchoolInfo,
}: {
  applicantId: string;
  applicantHighSchoolInfo?: HighSchool;
}) => {
  const router = useRouter();

  const methods = useForm<HighSchoolFormSchemaType>({
    resolver: zodResolver(highSchoolFormSchema),
    defaultValues: applicantHighSchoolInfo,
    mode: 'onSubmit',
  });
  const { handleSubmit, formState } = methods;

  const graduationTitle = useWatch({
    control: methods.control,
    name: 'graduationTitle',
  });

  useEffect(() => {
    if (graduationTitle !== 'MEDIAN_TECHNICIAN') {
      methods.setValue('mention', '');
    }
  }, [graduationTitle]);

  const onSubmit = async (data: HighSchoolFormSchemaType) => {
    await createOrUpdateHighSchoolInfo(applicantId, data);
    router.push('/captacion/postulacion/universidad');
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
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
            isRequired
          />
          <SelectFormField
            isRequired
            label="Título obtenido al egresar de la institución"
            name="graduationTitle"
            selectItems={[
              { label: 'Bachiller en Ciencias', value: 'BACHELOR_IN_SCIENCE' },
              { label: 'Técnico medio', value: 'MEDIAN_TECHNICIAN' },
            ]}
          />
          <InputField
            isRequired={graduationTitle === 'MEDIAN_TECHNICIAN'}
            isDisabled={graduationTitle !== 'MEDIAN_TECHNICIAN'}
            type="text"
            description="Ejemplo: Industrial"
            label="Mención"
            name="mention"
          />
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
            href="/captacion/postulacion/idiomas"
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

export default HighSchoolForm;
