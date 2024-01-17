'use client';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { z } from 'zod';

export const SpeakerCreationFormSchema = z.object({
  first_names: z.string().min(1, { message: 'El facilitador debe de tener minimo un nombre' }),
  last_names: z.string().min(1, { message: 'El facilitador debe de tener minimo un apellido' }),
  email: z.string().email().min(1, { message: 'Debes especificar el correo del facilitador' }),
  birthdate: z.coerce.date().refine((date) => new Date(date) <= new Date(), {
    message: 'La fecha no puede ser mayor a la actual',
  }),
  years_of_exp: z.coerce.number().optional(),
  job_title: z.string().optional(),
  job_company: z.string().optional(),
  actual_city: z.string().optional(),
  actual_country: z.string().optional(),
  phone_number: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  instagram_user: z.string().optional(),
  twitter_user: z.string().optional(),
  linkedin_user: z.string().optional(),
  facebook_user: z.string().optional(),
  curriculum: z.string().optional(),
  gender: z.enum(['M', 'F', 'O'], {
    required_error: 'Debes seleccionar el género del facilitador',
  }),
});

const d = [
  {
    label: 'Nombre(s)',
    name: 'first_names',
    kindOfInput: 'text',
  },
  {
    label: 'Apellido(s)',
    name: 'last_names',
    kindOfInput: 'text',
  },
  {
    label: 'Correo Electrónico',
    name: 'email',
    kindOfInput: 'email',
  },
  {
    label: 'Número de Teléfono',
    name: 'phone_number',
    kindOfInput: 'tel',
  },
  {
    label: 'Fecha de Nacimiento',
    name: 'birthdate',
    kindOfInput: 'date',
  },
  {
    label: 'Años de Experiencia',
    name: 'years_of_exp',
    kindOfInput: 'number',
  },
  {
    label: 'Título de Trabajo',
    name: 'job_title',
    kindOfInput: 'text',
  },
  {
    label: 'Compañía de Trabajo',
    name: 'job_company',
    kindOfInput: 'text',
  },
  {
    label: 'Ciudad Actual',
    name: 'actual_city',
    kindOfInput: 'text',
  },
  {
    label: 'País Actual',
    name: 'actual_country',
    kindOfInput: 'text',
  },
  {
    label: 'Usuario de Instagram',
    name: 'instagram_user',
    kindOfInput: 'text',
  },
  {
    label: 'Usuario de Twitter',
    name: 'twitter_user',
    kindOfInput: 'text',
  },
  {
    label: 'Usuario de LinkedIn',
    name: 'linkedin_user',
    kindOfInput: 'text',
  },
  {
    label: 'Usuario de Facebook',
    name: 'facebook_user',
    kindOfInput: 'text',
  },
];

interface InputComponentProps {
  control: Control<any, any>;
  label: string;
  name: string;
  kindOfInput: string;
}

const InputComponent: React.FC<InputComponentProps> = ({ control, label, name, kindOfInput }) => (
  <Controller
    name={name}
    control={control}
    shouldUnregister={true}
    render={({ field, formState }) => {
      return (
        <Input
          value={field.value}
          onChange={field.onChange}
          isInvalid={!!formState.errors?.[name]?.message}
          errorMessage={formState.errors?.[name]?.message?.toString()}
          type={kindOfInput}
          label={label}
          radius="sm"
          classNames={{ base: 'col-span-4 md:col-span-1' }}
          labelPlacement="outside"
        />
      );
    }}
  />
);

interface BaseSpeakerFormCreationProps {
  control: Control<any, any>;
}

const BaseSpeakerFormCreation: React.FC<BaseSpeakerFormCreationProps> = ({ control }) => {
  return (
    <>
      {d.map(({ label, name, kindOfInput }) => (
        <InputComponent
          key={name}
          control={control}
          label={label}
          name={name}
          kindOfInput={kindOfInput}
        />
      ))}
      <Controller
        name="gender"
        control={control}
        rules={{ required: true }}
        shouldUnregister={true}
        render={({ field, formState }) => {
          return (
            <Select
              value={field.value}
              onChange={field.onChange}
              isInvalid={!!formState.errors?.['gender']?.message}
              errorMessage={formState.errors?.['gender']?.message?.toString()}
              classNames={{ base: 'col-span-4 md:col-span-1' }}
              radius="sm"
              label="Género"
              labelPlacement="outside"
            >
              {[
                { value: 'M', label: 'Masculino' },
                { value: 'F', label: 'Femenino' },
                {
                  value: 'O',
                  label: 'Empresa u Organización',
                },
              ].map((modality) => (
                <SelectItem key={modality.value} value={modality.value}>
                  {modality.label}
                </SelectItem>
              ))}
            </Select>
          );
        }}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: true }}
        shouldUnregister={true}
        render={({ field, formState }) => {
          return (
            <Textarea
              radius="sm"
              value={field.value}
              onChange={field.onChange}
              isInvalid={!!formState.errors?.['description']?.message}
              errorMessage={formState.errors?.['description']?.message?.toString()}
              label="Descripción"
              labelPlacement="outside"
              classNames={{
                base: 'col-span-4 h-fit w-full',
              }}
            />
          );
        }}
      />
    </>
  );
};

export default BaseSpeakerFormCreation;
