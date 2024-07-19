import { formatDateToStoreInDB } from "@/lib/utils/dates";
import { createEnumErrorMap } from "@/lib/zod/utils";
import { Collages, KindOfCollage, StudyArea, StudyRegime } from "@prisma/client";
import { z } from "zod";


const collageSchema = z.object({
    kind_of_collage: z.nativeEnum(KindOfCollage, createEnumErrorMap('tipo de universidad')),
    collage: z.nativeEnum(Collages, createEnumErrorMap('universidad')),
    study_area: z.nativeEnum(StudyArea, createEnumErrorMap('area de estudio')),
    study_regime: z.nativeEnum(StudyRegime, createEnumErrorMap('regimen de estudio')),
    career: z.string().min(1, { message: 'Debes especificar la carrera' }).trim(),
    collage_start_date: z.string()
        .min(1, { message: 'Debes especificar la fecha' })
        .refine((collage_start_date) => new Date(collage_start_date) <= new Date(), {
            message: 'La fecha no puede ser mayor a la actual',
        })
        .transform((collage_start_date) => formatDateToStoreInDB(collage_start_date)),
    have_schooolarship: z.literal("YES").or(z.literal("NO")).optional(),
    scholarship_percentage: z.number().positive().optional(),
    current_academic_period: z.coerce.number({ required_error: 'El período académico es requerido' }),
    grade: z.coerce
        .number({ required_error: 'El promedio de notas es requerido' })
        .min(1, 'El promedio mínimo es 1')
        .max(20, 'El promedio máximo es 20'),
    class_modality: z.literal("IN_PERSON").or(z.literal("ONLINE")).or(z.literal("Hibrida")),
});

export default collageSchema;