import { yesNoEnumBooleanTransform } from '@/lib/zod/utils';
import { z, ZodIssueCode } from 'zod';

// Transforming 'YES'/'NO' to true/false

const languagesFormSchema = z
  .object({
    speaksOtherLanguage: yesNoEnumBooleanTransform,
    specifiedLanguage: z.string().optional(),
    englishLevel: z.enum(['BASIC', 'INTERMEDIATE', 'ADVANCED']).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.speaksOtherLanguage) {
      if (!data.specifiedLanguage || data.specifiedLanguage.trim().length === 0) {
        ctx.addIssue({
          path: ['specifiedLanguage'],
          message: 'Especificar idioma es requerido',
          code: ZodIssueCode.custom, // Added the required 'code' property
        });
      }
      if (!data.englishLevel) {
        ctx.addIssue({
          path: ['englishLevel'],
          message: 'Se requiere nivel de inglés cuando se habla otro idioma es "Sí"',
          code: ZodIssueCode.custom, // Added the required 'code' property
        });
      }
    }
  });

export default languagesFormSchema;
