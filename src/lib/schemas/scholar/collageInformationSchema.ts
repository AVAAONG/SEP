import { Collages, EvaluationScale, StudyArea, StudyRegime } from '@prisma/client';
import { z } from 'zod';
const acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

const scholarCollageInformationSchema = z
    .object({
        career_schedule: z.string().min(1, { message: 'Debes colocar el horario' }).trim(),
        collage: z.nativeEnum(Collages, {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    case 'invalid_enum_value':
                        return { message: 'Debes seleccionar una universidad valida' };
                    default:
                        return { message: 'Debes seleccionar una universidad valida' };
                }
            },
        }),
        career: z.string().min(1, { message: 'Debes especificar la carrera' }).trim(),
        mention: z.string().optional(),
        study_area: z.nativeEnum(StudyArea, {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    case 'invalid_enum_value':
                        return { message: 'Debes seleccionar un area de estudio valida' };
                    default:
                        return { message: 'Debes seleccionar un area de estudio valida' };
                }
            },
        }),
        evaluation_scale: z.nativeEnum(EvaluationScale, {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    case 'invalid_enum_value':
                        return { message: 'Debes seleccionar una escala de evaluacion valida' };
                    default:
                        return { message: 'Debes seleccionar una escala de evaluacion valida' };
                }
            },
        }),
        study_regime: z.nativeEnum(StudyRegime, {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    case 'invalid_enum_value':
                        return { message: 'Debes seleccionar un regimen de estudio valido' };
                    default:
                        return { message: 'Debes seleccionar un regimen de estudio valido' };
                }
            },
        }),
        collage_start_date: z.string()
            .min(1, { message: 'Debes especificar la fecha' })
            .refine((collage_start_date) => new Date(collage_start_date) <= new Date(), {
                message: 'La fecha no puede ser mayor a la actual',
            }),
        collage_study_proof: z.string().min(1, { message: 'Debes colocar la constancia' }).trim(),
        have_schooolarship: z.string().toLowerCase().transform((x) => x === 'true').pipe(z.boolean()),
        scholarship_percentage: z.coerce
            .number({
                errorMap: (issue, _ctx) => {
                    switch (issue.code) {
                        default:
                            return { message: 'Debes tener al menos un cupo disponible' };
                    }
                },
            })
            .min(1, { message: 'Debe tener al menos un cupo disponible' }),
        academic_load_completed: z.string().toLowerCase().transform((x) => x === 'true').pipe(z.boolean()),
        collage_end_date: z.string().min(1, { message: 'Debes especificar la fecha' }),




        // grade_special_mention: z.string().optional(),
        // collage_opinion_study_quality: z.string().optional(),
        // inscription_comprobant: z.string().optional(),
        // collage_acceptance_scan: z.string().optional(),
        // collage_proffessor_card1: z.string().optional(),
        // collage_proffessor_card2: z.string().optional(),
    });

export default scholarCollageInformationSchema;
