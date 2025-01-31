'use client';
import ImageUpload from '@/components/fields/ImageUpload';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import personalInfoSchema from './PersonalInfoSchema';

const VENEZUELA_STATES: string[] = [
  'Amazonas',
  'Anzoátegui',
  'Apure',
  'Aragua',
  'Barinas',
  'Bolívar',
  'Carabobo',
  'Cojedes',
  'Delta Amacuro',
  'Falcón',
  'Guárico',
  'Lara',
  'Mérida',
  'Miranda',
  'Monagas',
  'Nueva Esparta',
  'Portuguesa',
  'Sucre',
  'Táchira',
  'Trujillo',
  'Yaracuy',
  'Dependencias Federales',
  'Distrito Capital (Caracas)',
];

type TPersonalInfo = z.infer<typeof personalInfoSchema>;

const PersonalInfo = (props) => {
  const { id, photo, first_names, last_names, dni, gender, state, address, birthdate } = props;

  const methods = useForm<TPersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onChange',
    defaultValues: {
      first_names,
      last_names,
      dni,
      gender,
      state,
      address,
      birthdate,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const handleFormSubmit = async (data: TPersonalInfo) => {
    console.log(data);
    // await updatePersonalInfo(id, data)
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-8 w-full">
        <ImageUpload name="photo" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectFormField
            isRequired
            label="Sede seleccionada"
            name="chapterId"
            selectItems={[
              { label: 'Caracas', value: `Rokk6_XCAJAg45heOEzYb` },
              { label: 'Carabobo', value: 'VYmgeeUPWwh_P_myJ1PCJ' },
              { label: 'Zulia', value: 'H0rvqSucbop6uozNUpuC' },
            ]}
          />
          <InputField isRequired autoFocus label="Nombre(s)" type="text" name="first_names" />
          <InputField isRequired label="Apellido(s)" type="text" name="last_names" />
          <InputField isRequired label="Cédula de identidad" type="number" name="dni" />
          <SelectFormField
            isRequired
            label="Género"
            name="gender"
            selectItems={[
              { label: 'Masculino', value: 'M' },
              { label: 'Femenino', value: 'F' },
            ]}
          />
          <InputField
            isRequired
            placeholder="YYY/MM/DD"
            label="Fecha de nacimiento"
            name="birthdate"
            type="date"
          />
          <SelectFormField
            isRequired
            label="Estado de procedencia"
            name="state"
            selectItems={VENEZUELA_STATES.map((state) => ({
              label: state,
              value: state,
            }))}
          />
          <InputField
            isRequired
            label="Dirección de residencia actual"
            name="address"
            type="text"
          />

          <Button radius="sm">Siguiente</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PersonalInfo;
