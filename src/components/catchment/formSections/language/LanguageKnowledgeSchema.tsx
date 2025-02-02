import { z, ZodIssueCode } from 'zod';

// Transforming 'YES'/'NO' to true/false

const languagesFormSchema = z
  .object({
    speaksOtherLanguage: z
      .enum(['YES', 'NO'], {
        required_error: 'Debes seleccionar una opción',
        invalid_type_error: 'Opción inválida',
      })
      .transform((val) => (val === null ? undefined : val)),
    specifiedLanguage: z
      .string()
      .nullable()
      .optional()

      .transform((val) => (val === null ? undefined : val)),
    languageLevel: z
      .string()
      .nullable()
      .optional()

      .transform((val) => (val === null ? undefined : val)),
  })
  .superRefine((data, ctx) => {
    if (data.speaksOtherLanguage === 'YES') {
      if (!data.specifiedLanguage || data.specifiedLanguage.trim().length === 0) {
        ctx.addIssue({
          path: ['specifiedLanguage'],
          message: 'Especificar idioma es requerido',
          code: ZodIssueCode.custom, // Added the required 'code' property
        });
      }
      if (!data.languageLevel) {
        ctx.addIssue({
          path: ['englishLevel'],
          message: 'Se requiere nivel de inglés cuando se habla otro idioma es "Sí"',
          code: ZodIssueCode.custom, // Added the required 'code' property
        });
      }
    }
  });

export default languagesFormSchema;
