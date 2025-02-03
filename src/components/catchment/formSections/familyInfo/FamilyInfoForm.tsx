'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { createOrUpdateFamilyInfo } from '@/lib/db/utils/applicant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from '@nextui-org/react';
import { FamilyInfo } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import familyFormSchema from './FamilyInfoSchema';

type FamilyFormSchemaType = z.infer<typeof familyFormSchema>;

const FamilyInfoForm = ({
  applicantId,
  applicantFamilyInfo,
}: {
  applicantId: string;
  applicantFamilyInfo?: FamilyInfo;
}) => {
  const router = useRouter();

  const methods = useForm<FamilyFormSchemaType>({
    resolver: zodResolver(familyFormSchema),
    defaultValues: {
      ...applicantFamilyInfo,
      contributeToFamilyIncome: applicantFamilyInfo?.contributeToFamilyIncome ? 'YES' : 'NO',
    },
    mode: 'onBlur',
  });
  const { handleSubmit, formState } = methods;

  console.log(methods.formState.defaultValues);

  const onSubmit = async (data: FamilyFormSchemaType) => {
    const contribute = data.contributeToFamilyIncome === 'YES' ? true : false;
    await createOrUpdateFamilyInfo(applicantId, {
      ...data,
      contributeToFamilyIncome: contribute,
    });
    router.push('/captacion/postulacion/laboral');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
          <InputField
            isRequired={true}
            name="averageFamilyIncome"
            type="number"
            label="Promedio de ingreso familiar (En dolares)"
          />
          <SelectFormField
            isRequired={true}
            label="¿Con quién vives?"
            name="whitWhoDoYouLive"
            selectItems={[
              { label: 'Padres', value: 'PARENTS' },
              { label: 'Familiares', value: 'RELATIVES' },
              { label: 'Otros', value: 'OTHERS' },
            ]}
          />
          <SelectFormField
            isRequired={true}
            label="Tipo de vivienda"
            name="kindOfHouse"
            selectItems={[
              { label: 'Propia', value: 'OWNED' },
              { label: 'Alquilada', value: 'RENTED' },
              { label: 'Hipotecada', value: 'MORTGAGED' },
            ]}
          />
          <SelectFormField
            isRequired={true}
            label="¿Contribuye con el ingreso familiar?"
            name="contributeToFamilyIncome"
            selectItems={[
              {
                label: 'Sí',
                value: 'YES',
              },
              {
                label: 'No',
                value: 'NO', // we parse this when saving to the database to be false
              },
            ]}
          />
          <InputField
            isRequired={true}
            name="familyMembers"
            type="text"
            label="Composición del núcleo familiar"
          />
          <InputField name="fatherJob" type="text" label="Ocupación del padre" />
          <InputField
            name="fathersCompanyName"
            type="text"
            label="Nombre de la empresa u organización en donde trabaja el padre"
          />
          <InputField name="motherJob" type="text" label="Ocupación de la madre" />
          <InputField
            name="mothersCompanyName"
            type="text"
            label="Nombre de la empresa u organización en donde trabaja la madre"
          />
        </div>
        <div className="col-span-2 flex gap-4">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/postulacion/contacto"
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

export default FamilyInfoForm;
