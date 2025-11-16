import { Modality } from '@prisma/client';
import { z } from 'zod';
export const MAX_FILE_SIZE = 5000000; // 5MB

const externalVolunteerSubmisionSchema = z
    .object({
        title: z.string().min(1, { message: 'Necesitas colocar un titulo' }),
        start_dates: z.string()
            .min(1, { message: 'Debes especificar la fecha' }),
        end_dates: z.string()
            .min(1, { message: 'Debes especificar la fecha' }),
        modality: z.nativeEnum(Modality, {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    case 'invalid_enum_value':
                        return { message: 'Debes seleccionar una modalidad valida' };
                    default:
                        return { message: 'Debes seleccionar la modalidad' };
                }
            },
        }),
        description: z.string().optional(),
        platform: z.string().min(1, { message: 'Debes especificar el lugar' }),
        beneficiary: z.string().min(1, { message: 'Debes especificar el beneficiario' }),
        supervisor: z.string().min(1, { message: 'Debes especificar el beneficiario' }),
        supervisor_email: z.string().min(1, { message: 'Debes especificar el beneficiario' }),
        proof: z.string().min(1, { message: 'Debes subir una constancia' }),
        asigned_hours: z.coerce.number().min(1, { message: 'Debes especificar las horas asignadas' }),
    });



export default externalVolunteerSubmisionSchema;
