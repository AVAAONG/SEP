'use client';
import FormButtonGroup from '@/components/admission/common/FormButtonGroup';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import ImageInput from '@/components/forms/common/ImageInput';
import { AdmisionPersonalInfo } from '@/lib/db/utils/applicant';
import AdmisionPersonalInformationSchema from '@/lib/schemas/admision/PersonalInformationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const VENEZUELA_STATES: string[] = [
  "Amazonas",
  "Anzoátegui",
  "Apure",
  "Aragua",
  "Barinas",
  "Bolívar",
  "Carabobo",
  "Cojedes",
  "Delta Amacuro",
  "Falcón",
  "Guárico",
  "Lara",
  "Mérida",
  "Miranda",
  "Monagas",
  "Nueva Esparta",
  "Portuguesa",
  "Sucre",
  "Táchira",
  "Trujillo",
  "Yaracuy",
  "Dependencias Federales",
  "Distrito Capital (Caracas)",
];

type Schema = z.infer<typeof AdmisionPersonalInformationSchema>;


const PersonalInformation: React.FC<AdmisionPersonalInfo & { id: string }> = (props) => {
  const { id, photo, first_names, last_names, dni, gender, state, address, birthdate } = props;

  const methods = useForm<Schema>({
    resolver: zodResolver(AdmisionPersonalInformationSchema),
    mode: 'onBlur',
    defaultValues: {
      first_names, last_names, dni, gender, state, address, birthdate
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const handleFormSubmit = async (data: Schema) => {
    console.log(data)
    // await updatePersonalInfo(id, data)
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-8 w-full">
        <ImageInput name='photo' />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <InputField
            isRequired
            autoFocus
            label="Nombre(s)"
            type="text"
            name="first_names"
          />
          <InputField
            isRequired
            label="Apellido(s)"
            type="text"
            name="last_names"
          />
          <InputField
            isRequired
            label="Cédula de identidad"
            type="number"
            name="dni"
          />
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
            className='col-span-1 md:col-span-2'
            type="text"
          />
          {/* <StepButton step="contacto" /> */}
        </div>
        <FormButtonGroup />
      </form>
    </FormProvider>
  );
};

export default PersonalInformation;
