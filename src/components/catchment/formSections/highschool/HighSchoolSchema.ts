import { z } from 'zod';

const highSchoolFormSchema = z.object({
  institutionName: z.string().min(2, "Nombre de la institución es requerido"),
  institutionDependency: z.enum(['PUBLIC', 'PRIVATE', 'SUBSIDY'], {
    description: "Dependencia de la institución es requerida",
  }),
  gpa: z.preprocess((val) => Number(val), z.number().min(1, "El promedio debe ser al menos 1").max(20, "El promedio no puede ser mayor a 20")),
  graduation_title: z.enum(['BACHELOR_IN_SCIENCE', 'MEDIAN_TECHNICIAN'], { description: "Título obtenido es requerido" }),
  mention: z.string().optional().nullable(),
  extracurricularActivities: z.string().optional(),
});

export default highSchoolFormSchema;