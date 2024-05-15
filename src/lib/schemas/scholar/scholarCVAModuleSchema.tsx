import { CVASchedule, Modality } from '@prisma/client';
import { z } from 'zod';

const scholarCVAModuleSchema = z.object({
  module: z.coerce.number().int().positive().min(1, { message: 'Debes seleccionar un modulo' }),
  modality: z.nativeEnum(Modality, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_enum_value':
          return { message: 'Debes seleccionar una modalidad valida' };
        default:
          return { message: 'Debes seleccionar una modalidad valida' };
      }
    },
  }),
  qualification: z.coerce
    .number()
    .positive()
    .min(1, { message: 'Debes seleccionar una calificación' }),
  record: z.string().optional(),
  schedule: z.nativeEnum(CVASchedule, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_enum_value':
          return { message: 'Debes seleccionar una modalidad valida' };
        default:
          return { message: 'Debes seleccionar una modalidad valida' };
      }
    },
  }),
});

export default scholarCVAModuleSchema;
