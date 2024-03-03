import { CvaLocation } from '@prisma/client';
import { z } from 'zod';

const scholarCVAInformationSchema = z
    .object({
        cva_started_date: z.string().trim().optional().nullable(),
        is_in_cva: z.string().min(1, { message: 'Debes seleccionar una opción' }).trim(),
        already_finished_cva: z.string().min(1, { message: 'Debes seleccionar una opción' }).trim(),
        cva_ended_date: z.string().trim().optional().nullable(),
        certificate: z.string().trim().optional().nullable(),
        not_started_cva_reason: z.string().trim().optional().nullable(),
        cva_location: z.nativeEnum(CvaLocation, {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    case 'invalid_enum_value':
                        return { message: 'Debes seleccionar una cede valida' };
                    default:
                        return { message: 'Debes seleccionar una cede valida' };
                }
            },
        }).nullable().optional(),

    });

export default scholarCVAInformationSchema;
