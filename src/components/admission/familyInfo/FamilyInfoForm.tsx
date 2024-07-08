'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import familyFormSchema from './schema';

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
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 "
      >
        <InputField isRequired name="career" type="number" label="Promedio de ingreso familiar" />
        <SelectFormField
          isRequired
          label="¿Con quién vives?"
          name="study_regime"
          selectItems={[
            { label: 'Padres', value: 'PARENTS' },
            { label: 'Familiares', value: 'RELATIVES' },
            { label: 'Otros', value: 'OTHERS' },
          ]}
        />
        <SelectFormField
          isRequired
          label="Tipo de vivienda"
          name="study_regime"
          selectItems={[
            { label: 'Propia', value: 'OWNED' },
            { label: 'Alquilada', value: 'RENTED' },
            { label: 'Hipotecada', value: 'MORTGAGED' },
          ]}
        />
        <InputField isRequired name="career" type="text" label="Composición del núcleo familiar" />
        <InputField isRequired name="career" type="text" label="Composición del núcleo familiar" />
        <InputField isRequired name="career" type="text" label="Ocupación del padre" />
        <InputField
          isRequired
          name="career"
          type="text"
          label="Nombre de la empresa u organización en donde trabaja el padre"
        />
        <InputField isRequired name="career" type="number" label="Años de experiencia del padre" />
        <InputField isRequired name="career" type="text" label="Ocupación del madre" />
        <InputField
          isRequired
          name="career"
          type="text"
          label="Nombre de la empresa u organización en donde trabaja el madre"
        />
        <InputField isRequired name="career" type="number" label="Años de experiencia del madre" />

        <button type="submit">Siguiente</button>
      </form>
    </FormProvider>
  );
};

export default FamilyInfoForm;
