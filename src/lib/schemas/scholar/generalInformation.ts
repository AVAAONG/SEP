import { Level, Modality } from '@prisma/client';
import { z } from 'zod';

const chatCreationFormSchema = z
    .object({
        title: z.string().min(1, { message: 'El titulo no puede estar vacio' }).trim(),
        dates: z
            .object({
                date: z
                    .string()
                    .min(1, { message: 'Debes especificar la fecha' })
                    .refine((date) => new Date(date) >= new Date(), {
                        message: 'La fecha no puede ser menor a la actual',
                    }),
                startHour: z.string().min(1, { message: 'Debes especificar la hora de inicio' }),
                endHour: z.string().min(1, { message: 'Debes especificar la hora de cierre' }),
            })
            .array()
            .min(1, { message: 'Debes especificar al menos una' }),
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
        level: z.nativeEnum(Level, {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    case 'invalid_enum_value':
                        return { message: 'Debes seleccionar un nivel valido' };
                    default:
                        return { message: 'Debes seleccionar la competencia' };
                }
            },
        }),
        avalible_spots: z.coerce
            .number({
                errorMap: (issue, _ctx) => {
                    switch (issue.code) {
                        default:
                            return { message: 'Debes tener al menos un cupo disponible' };
                    }
                },
            })
            .min(1, { message: 'Debe tener al menos un cupo disponible' }),
        platformOnline: z.string().trim().optional(),
        platformInPerson: z.string().trim().optional(),
        speakersId: z.string().min(1, { message: 'Debes elegir al menos un facilitador' }).trim(),
        description: z.string().trim().optional(),
    })
    .refine((data) => {
        let isValid = true;
        data.dates.forEach(
            (date) => {
                // Convert the hours to Date objects
                const startHour = new Date(`1970-01-01T${date.startHour}Z`);
                const endHour = new Date(`1970-01-01T${date.endHour}Z`);
                // If the start hour is greater than the end hour, set isValid to false
                if (startHour >= endHour) {
                    isValid = false;
                }
            },
            {
                message: 'La hora de inicio no puede ser mayor a la hora de cierre',
                // TODO: fix- the path is wrong
                path: ['dates.endHour[0]'],
            }
        );
        // Return the result of the validation
        return isValid;
    });

export default chatCreationFormSchema;
