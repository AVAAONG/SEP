
import { z, ZodIssueCode } from "zod";

const jobInfoSchema = z.object({
  currentlyWorking: z.enum(['YES', 'NO'], {
    required_error: 'Debes seleccionar una opción',
    invalid_type_error: 'Opción inválida',
  })
    .transform((val) => (val === null ? undefined : val)),
  jobCompany: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === null ? undefined : val)),
  jobTitle: z.string()
    .nullable()
    .optional()
    .transform((val) => (val === null ? undefined : val)),
  jobModality: z.enum(['IN_PERSON', 'ONLINE', 'HYBRID', ''])
    .nullable()
    .optional()
    .transform((val) => (val === null ? undefined : val)),
  jobSchedule: z.enum(['FULL_TIME', 'PART_TIME', 'WEEKENDS', ''])
    .nullable()
    .optional()
    .transform((val) => (val === null ? undefined : val)),
})
  .superRefine((data, ctx) => {
    if (data.currentlyWorking === 'YES') {
      if (!data.jobCompany || data.jobCompany.trim().length === 0) {
        ctx.addIssue({
          path: ['jobCompany'],
          message: 'Debes especificar el lugar de trabajo',
          code: ZodIssueCode.custom,
        });
      }
      if (!data.jobTitle || data.jobTitle.trim().length === 0) {
        ctx.addIssue({
          path: ['jobTitle'],
          message: 'Debes especificar el cargo que desempeña',
          code: ZodIssueCode.custom,
        });
      }
      if (!data.jobModality) {
        ctx.addIssue({
          path: ['jobModality'],
          message: 'Debes seleccionar la modalidad de trabajo',
          code: ZodIssueCode.custom,
        });
      }
      if (!data.jobSchedule) {
        ctx.addIssue({
          path: ['jobSchedule'],
          message: 'Debes seleccionar el horario de trabajo',
          code: ZodIssueCode.custom,
        });
      }
    }
  });;

export default jobInfoSchema;
