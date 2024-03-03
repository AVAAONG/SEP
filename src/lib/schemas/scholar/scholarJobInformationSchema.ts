import { JobSchedule, JobSector, KindOfJob, Modality } from '@prisma/client';
import { z } from 'zod';

const JobInformationSchema = z.object({
    job_title: z.string(),
    job_company: z.string(),
    job_modality: z.nativeEnum(Modality, {
        errorMap: (issue, _ctx) => {
            switch (issue.code) {
                case 'invalid_enum_value':
                    return { message: 'Debes seleccionar una modalidad valida' };
                default:
                    return { message: 'Debes seleccionar una modalidad valida' };
            }
        },
    }),
    job_schedule: z.nativeEnum(JobSchedule, {
        errorMap: (issue, _ctx) => {
            switch (issue.code) {
                case 'invalid_enum_value':
                    return { message: 'Debes seleccionar uno valido' };
                default:
                    return { message: 'Debes seleccionar uno valido' };
            }
        },
    }),
    kind_of_job: z.nativeEnum(KindOfJob, {
        errorMap: (issue, _ctx) => {
            switch (issue.code) {
                case 'invalid_enum_value':
                    return { message: 'Debes seleccionar uno valido' };
                default:
                    return { message: 'Debes seleccionar uno valido' };
            }
        },
    }),
    job_sector: z.nativeEnum(JobSector, {
        errorMap: (issue, _ctx) => {
            switch (issue.code) {
                case 'invalid_enum_value':
                    return { message: 'Debes seleccionar uno valido' };
                default:
                    return { message: 'Debes seleccionar uno valido' };
            }
        },
    }),
    aspects_that_influenced_getting_job: z.string().optional(),
    job_start_date: z.string()
        .min(1, { message: 'Debes especificar la fecha' })
        .refine((collage_start_date) => new Date(collage_start_date) <= new Date(), {
            message: 'La fecha no puede ser mayor a la actual',
        }),
    laboral_conditions: z.string().optional(),
    actions_to_get_job: z.string().optional(),
});

export default JobInformationSchema;