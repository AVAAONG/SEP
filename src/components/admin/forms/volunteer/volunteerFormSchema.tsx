import { KindOfVolunteer, Modality, VolunteerProject } from '@prisma/client';
import { z } from 'zod';

// Helper function for enum validation
const createEnumValidator = <T extends Record<string, string | number>>(
  enumObject: T,
  fieldName: string
) => {
  return z.nativeEnum(enumObject, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_enum_value':
          return { message: `Debes seleccionar un ${fieldName} válido` };
        default:
          return { message: `Debes seleccionar el ${fieldName}` };
      }
    },
  });
};

// Date validation schema
const dateSchema = z
  .object({
    date: z
      .string()
      .min(1, { message: 'Debes especificar la fecha' })
      .refine(
        (date) => {
          const parsed = new Date(date);
          return !isNaN(parsed.getTime());
        },
        { message: 'La fecha debe ser válida y no puede ser anterior a hoy' }
      ),

    startHour: z
      .string()
      .min(1, { message: 'Debes especificar la hora de inicio' })
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'La hora debe estar en formato HH:MM (24 horas)',
      }),

    endHour: z
      .string()
      .min(1, { message: 'Debes especificar la hora de cierre' })
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'La hora debe estar en formato HH:MM (24 horas)',
      }),

    endDate: z
      .string()
      .min(1, { message: 'Debes especificar la fecha de cierre' })
      .refine(
        (date) => {
          const parsed = new Date(date);
          return !isNaN(parsed.getTime());
        },
        { message: 'La fecha de cierre debe ser válida' }
      ),
  })
  .refine(
    (data) => {
      // Validate time range within the same day
      const startTime = new Date(`1970-01-01T${data.startHour}:00`);
      const endTime = new Date(`1970-01-01T${data.endHour}:00`);
      return startTime < endTime;
    },
    {
      message: 'La hora de inicio debe ser anterior a la hora de cierre',
      path: ['endHour'],
    }
  )
  .refine(
    (data) => {
      // Validate date range
      const startDate = new Date(data.date);
      const endDate = new Date(data.endDate);
      return startDate <= endDate;
    },
    {
      message: 'La fecha de inicio debe ser anterior o igual a la fecha de cierre',
      path: ['endDate'],
    }
  );

// Base volunteer schema
const volunteerSchema = z
  .object({
    title: z.string().min(1, { message: 'El título no puede estar vacío' }).trim(),

    dates: z.array(dateSchema).min(1, { message: 'Debes especificar al menos una fecha' }),

    modality: createEnumValidator(Modality, 'modalidad'),

    kindOfVolunteer: createEnumValidator(KindOfVolunteer, 'tipo de voluntariado'),

    volunteerProject: createEnumValidator(VolunteerProject, 'proyecto de voluntariado'),

    availableSpots: z.coerce
      .number({
        errorMap: (issue, _ctx) => {
          switch (issue.code) {
            case 'invalid_type':
              return { message: 'El número de cupos debe ser un número válido' };
            default:
              return { message: 'Debes especificar el número de cupos disponibles' };
          }
        },
      })
      .int({ message: 'El número de cupos debe ser un número entero' })
      .min(1, { message: 'Debe tener al menos un cupo disponible' }),

    platformOnline: z
      .string()
      .trim()
      .url({ message: 'Debe ser una URL válida' })
      .optional()
      .or(z.literal('')),

    platformInPerson: z
      .string()
      .trim()
      .min(1, { message: 'Debes especificar la ubicación' })
      .max(200, { message: 'La ubicación no puede exceder 200 caracteres' })
      .optional()
      .or(z.literal('')),

    description: z
      .string()
      .trim()
      .max(10000, { message: 'La descripción no puede exceder 10000 caracteres' })
      .optional(),

    beneficiary: z
      .string()
      .min(1, { message: 'Debes especificar el beneficiario' })
      .max(100, { message: 'El beneficiario no puede exceder 100 caracteres' })
      .trim(),

    supervisor: z
      .string()
      .min(1, { message: 'Debes especificar el supervisor' })
      .max(100, { message: 'El supervisor no puede exceder 100 caracteres' })
      .trim(),
  })
  .refine(
    (data) => {
      // Validate platform based on modality
      if (data.modality === Modality.ONLINE) {
        return data.platformOnline && data.platformOnline.length > 0;
      }
      return true;
    },
    {
      message: 'Debes especificar la plataforma online para modalidad virtual',
      path: ['platformOnline'],
    }
  )
  .refine(
    (data) => {
      // Validate platform based on modality
      if (data.modality === Modality.IN_PERSON) {
        return data.platformInPerson && data.platformInPerson.length > 0;
      }
      return true;
    },
    {
      message: 'Debes especificar la ubicación para modalidad presencial',
      path: ['platformInPerson'],
    }
  )
  .refine(
    (data) => {
      // Validate hybrid modality
      if (data.modality === Modality.HYBRID) {
        return (
          data.platformOnline &&
          data.platformOnline.length > 0 &&
          data.platformInPerson &&
          data.platformInPerson.length > 0
        );
      }
      return true;
    },
    {
      message:
        'Para modalidad híbrida debes especificar tanto la plataforma online como la ubicación presencial',
      path: ['modality'],
    }
  );

// Export types for better type inference
export type VolunteerFormData = z.infer<typeof volunteerSchema>;
export type VolunteerDateData = z.infer<typeof dateSchema>;

export default volunteerSchema;
