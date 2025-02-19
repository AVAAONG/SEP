'use client';
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { z } from 'zod';

export const SpeakerCreationFormSchema = z.object({
  first_names: z
    .string()
    .min(1, { message: 'El facilitador debe de tener minimo un nombre' })
    .trim(),
  last_names: z
    .string()
    .min(1, { message: 'El facilitador debe de tener minimo un apellido' })
    .trim(),
  email: z
    .string()
    .email()
    .min(1, { message: 'Debes especificar el correo del facilitador' })
    .trim(),
  // birthdate: z.coerce
  //   .date()
  //   .refine((date) => new Date(date) <= new Date(), {
  //     message: 'La fecha no puede ser mayor a la actual',
  //   })
  //   .optional()
  //   .nullable(),
  // years_of_exp: z.coerce.number().optional(),
  job_title: z.string().trim().optional(),
  job_company: z.string().trim().optional().nullable(),
  phone_number: z.string().trim().optional().nullable(),
  // image: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  instagram_user: z.string().trim().optional().nullable(),
  // twitter_user: z.string().trim().optional().nullable(),
  linkedin_user: z.string().trim().optional().nullable(),
  // curriculum: z.string().trim().optional().nullable(),
  gender: z.enum(['M', 'F', 'O'], {
    required_error: 'Debes seleccionar el género del facilitador',
  }),
});

const d = [
  {
    label: 'Nombre(s)',
    name: 'first_names',
    kindOfInput: 'text',
    required: true,
  },
  {
    label: 'Apellido(s)',
    name: 'last_names',
    kindOfInput: 'text',
    required: true,
  },
  {
    label: 'Correo Electrónico',
    name: 'email',
    kindOfInput: 'email',
    required: true,
  },
  {
    label: 'Número de Teléfono',
    name: 'phone_number',
    kindOfInput: 'tel',
    required: false,
  },
  {
    label: 'Cargo u ocupación',
    name: 'job_title',
    kindOfInput: 'text',
    required: false,
  },
  {
    label: 'Empresa, institución u organización donde trabaja',
    name: 'job_company',
    kindOfInput: 'text',
    required: false,
  },
  {
    label: 'Usuario de Instagram',
    name: 'instagram_user',
    kindOfInput: 'text',
    required: false,
  },
  {
    label: 'Usuario de LinkedIn',
    name: 'linkedin_user',
    kindOfInput: 'text',
    required: false,
  },
];

interface InputComponentProps {
  control: Control<any, any>;
  label: string;
  name: string;
  kindOfInput: string;
  required?: boolean;
}

const InputComponent: React.FC<InputComponentProps> = ({
  control,
  label,
  name,
  kindOfInput,
  required,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, formState }) => {
      return (
        <Input
          isRequired={required}
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
      {d.map(({ label, name, kindOfInput, required }) => (
        <InputComponent
          key={name}
          control={control}
          label={label}
          name={name}
          kindOfInput={kindOfInput}
          required={required}
        />
      ))}
      <Controller
        name="gender"
        control={control}
        rules={{ required: true }}
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
              isRequired
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
