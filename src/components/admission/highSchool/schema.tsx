import * as z from 'zod';

const highSchoolFormSchema = z.object({
  institutionName: z.string().min(1, 'El nombre de la institución es requerido'),
  directorName: z.string().min(1, 'El nombre del director(a) es requerido'),
  institutionAddress: z.string().min(1, 'La dirección de la institución es requerida'),
  gpa: z
    .number({ required_error: 'El promedio de notas es requerido' })
    .min(1, 'El promedio mínimo es 1')
    .max(20, 'El promedio máximo es 20'),
  degree: z.string().min(1, 'El título obtenido es requerido'),
  socialServiceLocation: z.string().min(1, 'El lugar de labor social es requerido'),
  socialServiceLearnings: z.string().min(1, 'Los aprendizajes de labor social son requeridos'),
  extracurricularActivities: z.string().optional(),
});

export default highSchoolFormSchema;
