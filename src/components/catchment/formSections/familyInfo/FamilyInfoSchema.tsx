import { z } from 'zod';

const familyInfoFormSchema = z.object({
  averageFamilyIncome: z.coerce
    .number()
    .nonnegative()
    .min(1, { message: 'El promedio de ingreso familiar es requerido' }),
  whitWhoDoYouLive: z.enum(['PARENTS', 'RELATIVES', 'OTHERS'], {
    required_error: 'Debe seleccionar con quién vive',
  }),
  kindOfHouse: z.enum(['OWNED', 'RENTED', 'MORTGAGED'], {
    required_error: 'Debe seleccionar el tipo de vivienda',
  }),
  contributeToFamilyIncome: z.enum(['YES', 'NO'], {
    errorMap: (_issue, _ctx) => ({
      message: 'Debes seleccionar una opción válida',
    }),
  }),
  familyMembers: z
    .string({ required_error: 'La composición del núcleo familiar es requerida' })
    .min(1, 'La composición del núcleo familiar no puede estar vacía')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.,;:!@#$%^&*()_+=-]+$/, 'Solo puede contener letras y símbolos'),
  fatherJob: z
    .string()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.,;:!@#$%^&*()_+=-]+$/, 'Solo puede contener letras y símbolos')
    .optional()
    .nullable(),
  fathersCompanyName: z
    .string()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.,;:!@#$%^&*()_+=-]+$/, 'Solo puede contener letras y símbolos')
    .optional()
    .nullable(),
  motherJob: z
    .string()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.,;:!@#$%^&*()_+=-]+$/, 'Solo puede contener letras y símbolos')
    .optional()
    .nullable(),
  mothersCompanyName: z
    .string()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.,;:!@#$%^&*()_+=-]+$/, 'Solo puede contener letras y símbolos')
    .optional()
    .nullable(),
});

export default familyInfoFormSchema;
