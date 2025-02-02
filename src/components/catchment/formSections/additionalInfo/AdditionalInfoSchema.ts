import { z, ZodIssueCode } from 'zod';


const additionalInfoFormSchema = z.object({
  hasInternetConnection: z.enum(['YES', 'NO'], {
    required_error: 'La conexión a internet es obligatoria',
    invalid_type_error: 'Valor inválido para la conexión a internet',
  }),
  internetConnectionStability: z.enum(['VERY_STABLE', 'STABLE', 'UNSTABLE', 'VERY_UNSTABLE', '']).nullish(),
  programDiscoverySource: z.enum([
    'FRIEND_RELATIVE',
    'MEDIA',
    'AVAA_WEBSITE',
    'INSTAGRAM',
    'LINKEDIN',
    'TWITTER',
    'YOUTUBE',
    'INTERNET_SEARCH',
  ], {
    required_error: 'La fuente de descubrimiento del programa es obligatoria',
    invalid_type_error: 'Valor inválido para la fuente de descubrimiento del programa',
  }),
  isReferredByScholar: z.enum(['YES', 'NO'], {
    required_error: 'La referencia por un becario es obligatoria',
    invalid_type_error: 'Valor inválido para la referencia por un becario',
  }),
  referredScholarName: z.string().nullish(),
  scholarshipApplicationReason: z.string().min(100, 'La razón de la solicitud de beca debe tener al menos 100 caracteres'),
}).superRefine((data, ctx) => {
  if (data.hasInternetConnection === 'YES' && (!data.internetConnectionStability || data.internetConnectionStability.trim().length === 0)) {
    ctx.addIssue({
      path: ['internetConnectionStability'],
      message: 'Debes especificar la estabilidad de la conexión a internet si es inestable',
      code: ZodIssueCode.custom,
    });
  }
  if (data.isReferredByScholar === 'YES' && (!data.referredScholarName || data.referredScholarName.trim().length === 0)) {
    ctx.addIssue({
      path: ['referredScholarName'],
      message: 'Debes especificar el nombre del becario que te refirió',
      code: ZodIssueCode.custom,
    });
  }
});

export default additionalInfoFormSchema;