import { z } from 'zod';

const scholarDosExchangeProgramsApplications = z.object({
    name: z.string().min(1, { message: 'Debes seleccionar una fecha valida' }),
    aplication_date: z.string().min(1, { message: 'Debes seleccionar una fecha valida' }),
    reached_stage: z.string().min(1, { message: 'Debes seleccionar una etapa' }),
    selected: z.enum(['SI', 'NO']),
    usa_state: z.string().min(1, { message: 'Debes seleccionar un estado' }).optional(),
    usa_university: z.string().min(1, { message: 'Debes seleccionar una universidad' }).optional(),
    program_duration: z.string().min(1, { message: 'Debes seleccionar una duracion' }).optional(),
    usa_contact: z.string().min(1, { message: 'Debes colocar un punto de contacto' }).optional(),
    currently_working_org: z.string().min(1, { message: 'Debes colocar un punto de contacto' }).optional(),
    usa_connection: z.string().min(1, { message: 'Debes colocar una conexion' }).optional(),
})
    .refine((data) => {
        // Make fields required if "selected" is 'SI'
        if (data.selected === 'SI') {
            return data.usa_state !== undefined && data.usa_university !== undefined &&
                data.program_duration !== undefined && data.usa_contact !== undefined &&
                data.currently_working_org !== undefined && data.usa_connection !== undefined;
        }
        return true;
    }, { message: 'Los campos son requeridos cuando "selected" es SI' });

export default scholarDosExchangeProgramsApplications;