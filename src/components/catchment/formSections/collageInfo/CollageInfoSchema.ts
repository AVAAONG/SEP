import { createEnumErrorMap } from "@/lib/zod/utils";
import { KindOfCollage, Modality, StudyArea, StudyRegime } from "@prisma/client";
import { z } from "zod";

const collageSchema =
  z.object({
    kindOfCollage: z.nativeEnum(KindOfCollage, createEnumErrorMap('tipo de universidad')),
    collage: z.string().min(2, { message: 'Debes seleccionar una universidad' }),
    studyArea: z.nativeEnum(StudyArea, createEnumErrorMap('area de estudio')),
    studyRegime: z.nativeEnum(StudyRegime, createEnumErrorMap('regimen de estudio')),
    career: z
      .string()
      .min(5, { message: 'Debes especificar la carrera' })
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.,;:!@#$%^&*()_+=-]+$/, 'Solo puede contener letras y símbolos'),

    collageStartDate: z.coerce
      .date({
        required_error: 'La fecha es requerida',
        invalid_type_error: 'Formato de fecha inválido',
      })
      .min(new Date(1950, 0, 1), {
        message: 'La fecha debe ser posterior a 01/01/1950',
      })
      .max(new Date(), {
        message: 'La fecha no puede ser mayor a la fecha actual',
      })
      .transform((value) => new Date(value).toISOString()),

    currentAcademicPeriod: z.string().min(1, { message: 'El período académico es requerido' }),
    grade: z
      .coerce
      .number()
      .nonnegative()
      .min(1, { message: 'El promedio académico es requerido' }).max(20, 'El promedio no puede ser mayor a 20'),

    classModality: z.nativeEnum(Modality, createEnumErrorMap('modalidad de clases')),

    haveScholarship: z.enum(['YES', 'NO'], {
      required_error: 'Debes seleccionar una opción',
      invalid_type_error: 'Opción inválida',
    })
      .transform((val) => (val === null ? undefined : val)),

    scholarshipPercentage: z.coerce
      .number().nullish()
  })
// .superRefine((data, ctx) => {
//   if (data.haveScholarship === 'YES') {
//     if (!data.scholarshipPercentage || data.scholarshipPercentage >= 0) {
//       ctx.addIssue({
//         path: ['scholarshipPercentage'],
//         message: 'Es requerido especificar el porcentaje de la beca',
//         code: ZodIssueCode.custom, // Added the required 'code' property
//       });
//     }
//   }
// });

export default collageSchema;