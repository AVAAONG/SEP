import { z } from 'zod';

const scholarDosExchangeProgramsApplications = z.object({
    name: z.coerce.number().int().positive().min(1, { message: 'Debes colocar el periodo' }),
    aplication_date: z.string().min(1, { message: 'Debes seleccionar una fecha valida' }),
    reached_stage: z.string().min(1, { message: 'Debes seleccionar una etapa' }),
    selected: z.string().min(1, { message: 'Debes seleccionar una etapa' }),
    usa_state: z.string().min(1, { message: 'Debes seleccionar un estado' }),
    usa_university: z.string().min(1, { message: 'Debes seleccionar una universidad' }),
    program_duration: z.string().min(1, { message: 'Debes seleccionar una duracion' }),
    usa_contact: z.string().min(1, { message: 'Debes colocar un punto de contacto' }),
    currently_working_org: z.string().min(1, { message: 'Debes colocar un punto de contacto' }),
    usa_connection: z.string().min(1, { message: 'Debes colocar una conexion' }),
});

export default scholarDosExchangeProgramsApplications;
