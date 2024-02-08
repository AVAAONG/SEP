import { Modality } from '@prisma/client';
import { z } from 'zod';
export const MAX_FILE_SIZE = 5000000; // 5MB

const externalVolunteerSubmisionSchema = z
    .object({
        title: z.string().min(1, { message: 'Necesitas colocar un titulo' }),
        start_dates: z.string()
            .min(1, { message: 'Debes especificar la fecha' })
            .refine((date) => new Date(date) >= new Date(), {
                message: 'La fecha no puede ser menor a la actual',
            }),
        end_dates: z.string()
            .min(1, { message: 'Debes especificar la fecha' })
            .refine((date) => new Date(date) >= new Date(), {
                message: 'La fecha no puede ser menor a la actual',
            }),
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
        description: z.string().min(1, { message: 'Debes especificar la descripción' }),
        place: z.string().min(1, { message: 'Debes especificar el lugar' }),
        beneficiary: z.string().min(1, { message: 'Debes especificar el beneficiario' }),
        supervisor: z.string().min(1, { message: 'Debes especificar el beneficiario' }),
        supervisor_email: z.string().min(1, { message: 'Debes especificar el beneficiario' }),
        proof: z.instanceof(File)
            .refine((file) => file?.size <= MAX_FILE_SIZE, 'File size should be less than 5MB.')
            .refine((file) => {
                const acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
                return acceptedTypes.includes(file?.type);
            }, 'Only these types are allowed: .jpg, .jpeg, .png, and .pdf'),
        asigned_hours: z.number().min(1, { message: 'Debes especificar las horas asignadas' }),
    });



export default externalVolunteerSubmisionSchema;
