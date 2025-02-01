'use client';
import { z } from 'zod';
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

const personalInfoSchema = z.object({
  photo: z.string().min(6, 'Debes subir una foto'),

  chapterId: z.string({
    required_error: 'Debes seleccionar una sede',
  }),
  firstNames: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),

  lastNames: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras'),

  dni: z
    .string()
    .min(6, 'La cédula debe tener al menos 6 dígitos')
    .max(15, 'La cédula no puede tener más de 15 dígitos')
    .regex(/^\d+$/, 'La cédula solo puede contener números'),

  gender: z.enum(['M', 'F', 'O'], {
    required_error: 'Debes seleccionar un género',
    invalid_type_error: 'Género inválido',
  }),

  birthdate: z.coerce
    .date({
      required_error: 'La fecha es requerida',
      invalid_type_error: 'Formato de fecha inválido',
    })
    .min(new Date(1950, 0, 1), {
      message: 'La fecha debe ser posterior a 01/01/1950',
    })
    .max(new Date(), {
      message: 'La fecha no puede ser mayor a la fecha actual',
    })
    .refine(
      (date) => {
        const age = new Date().getFullYear() - date.getFullYear();
        return age >= 16 && age <= 23;
      },
      { message: 'Debes tener entre 16 y 23 años' }
    )
    .transform((value) => new Date(value).toISOString()),

  state: z.enum([...VENEZUELA_STATES] as [string, ...string[]], {
    required_error: 'Debes seleccionar un estado',
    invalid_type_error: 'Estado inválido',
  }),

  address: z
    .string()
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(300, 'La dirección no puede tener más de 300 caracteres'),
});

export default personalInfoSchema;
