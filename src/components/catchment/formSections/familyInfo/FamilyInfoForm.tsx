'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import familyFormSchema from './FamilyInfoSchema';

type FamilyFormSchemaType = z.infer<typeof familyFormSchema>;

const FamilyInfoForm = () => {
  const methods = useForm<FamilyFormSchemaType>({
    resolver: zodResolver(familyFormSchema),
    mode: 'all',
  });
  const onSubmit = (data: FamilyFormSchemaType) => {
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
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
          <InputField
            isRequired
            name="average_family_income"
            type="number"
            label="Promedio de ingreso familiar (En dolares)"
          />
          <SelectFormField
            isRequired
            label="¿Con quién vives?"
            name="whit_who_do_you_live"
            selectItems={[
              { label: 'Padres', value: 'PARENTS' },
              { label: 'Familiares', value: 'RELATIVES' },
              { label: 'Otros', value: 'OTHERS' },
            ]}
          />
          <SelectFormField
            isRequired
            label="Tipo de vivienda"
            name="kind_of_house"
            selectItems={[
              { label: 'Propia', value: 'OWNED' },
              { label: 'Alquilada', value: 'RENTED' },
              { label: 'Hipotecada', value: 'MORTGAGED' },
            ]}
          />
          <SelectFormField
            isRequired
            label="¿Contribuye con el ingreso familiar?"
            name="contribute_to_family_income"
            selectItems={[
              {
                label: 'Sí',
                value: 'YES',
              },
              {
                label: 'No',
                value: 'NO',
              },
            ]}
          />
          <InputField
            isRequired
            name="family_members"
            type="text"
            label="Composición del núcleo familiar"
          />
          <InputField isRequired name="father_job" type="text" label="Ocupación del padre" />
          <InputField
            isRequired
            name="fathers_company_name"
            type="text"
            label="Nombre de la empresa u organización en donde trabaja el padre"
          />
          <InputField isRequired name="mother_job" type="text" label="Ocupación del madre" />
          <InputField
            isRequired
            name="mothers_company_name"
            type="text"
            label="Nombre de la empresa u organización en donde trabaja el madre"
          />
        </div>
        <div className="col-span-2 flex gap-4">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/contacto"
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

export default FamilyInfoForm;
