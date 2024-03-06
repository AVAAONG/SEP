import { Modality } from '@prisma/client';
import { z } from 'zod';

const activitySatisfactionFormSchema = z
    .object({
        activity_organization: z.nativeEnum(Modality, {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    case 'invalid_enum_value':
                        return { message: 'Debes seleccionar una valoracion valida' };
                    default:
                        return { message: 'Debes seleccionar una valoracion valida' };
                }
            },
        }),
    })

export default activitySatisfactionFormSchema;
