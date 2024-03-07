import { Modality } from '@prisma/client';
import { z } from 'zod';

const scholarAcademicPeriodCreationSchema = z.object({
    current_academic_period: z.coerce.number().int().positive().min(1, { message: 'Debes colocar el periodo' }),
    class_modality: z.nativeEnum(Modality, {
        errorMap: (issue, _ctx) => {
            switch (issue.code) {
                case 'invalid_enum_value':
                    return { message: 'Debes seleccionar una modalidad valida' };
                default:
                    return { message: 'Debes seleccionar una modalidad valida' };
            }
        },
    }),
    grade: z.coerce
        .number()
        .positive()
        .min(1, { message: 'Debes seleccionar una calificación' }),
    record: z.string().min(1, { message: 'Debes seleccionar el comprobante' }),
    start_date: z.coerce.date().min(new Date(), { message: 'Debes seleccionar una fecha valida' }),
    end_date: z.coerce.date().min(new Date(), { message: 'Debes seleccionar una fecha valida' }),

});

export default scholarAcademicPeriodCreationSchema;
