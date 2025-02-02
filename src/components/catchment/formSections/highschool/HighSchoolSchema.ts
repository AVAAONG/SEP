import { z, ZodIssueCode } from 'zod';

const highSchoolFormSchema = z.object({
  institutionName: z.string().min(5, 'El nombre de la institución es requerido'),
  institutionDependency: z.enum(['PUBLIC', 'PRIVATE', 'SUBSIDY'], {
    required_error: 'Debes seleccionar una dependencia de la institución',
    invalid_type_error: 'Opción inválida',
  }),
  gpa: z
    .coerce
    .number()
    .nonnegative()
    .min(1, { message: 'El promedio de ingreso familiar es requerido' }).max(20, 'El promedio no puede ser mayor a 20'),
  graduationTitle: z.enum(['BACHELOR_IN_SCIENCE', 'MEDIAN_TECHNICIAN'], {
    required_error: 'Debes seleccionar un título de graduación',
    invalid_type_error: 'Opción inválida',
  }),
  mention: z.preprocess((val) => val === null ? undefined : val, z.string().nullish()),
  extracurricularActivities: z.preprocess((val) => val === null ? undefined : val, z.string().nullish()),
}).superRefine((data, ctx) => {
  if (data.graduationTitle === 'MEDIAN_TECHNICIAN' && (!data.mention || data.mention.trim().length === 0)) {
    ctx.addIssue({
      path: ['mention'],
      message: 'Debes especificar la mención si el título es Técnico medio',
      code: ZodIssueCode.custom,
    });
  }
});

export default highSchoolFormSchema;