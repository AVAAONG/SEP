import { formatDateToStoreInDB } from '@/lib/utils/dates';
import { Level } from '@prisma/client';
import { z } from 'zod';

const MentorSchema = z.object({
    photo: z.any(),
    first_name: z.string(),
    last_name: z.string(),
    id_number: z.string(),
    birth_date: z.string()
        .min(1, { message: 'Debes especificar tu fecha de nacimiento' }).transform((birth_date) => formatDateToStoreInDB(birth_date)),
    residence: z.string(),
    phone: z.string(),
    email: z.string().email(),
    profession: z.string(),
    chapter: z.string().min(1, { message: 'Debes especificar el capítulo al que deseas postularte' }),
    employed: z.string().min(1, { message: 'Debes especificar tu situación laboral' }).transform((employed) => employed === 'true' ? true : false),
    company: z.string().nullable().optional(),
    position: z.string().nullable().optional(),
    cv: z.string(),
    speaks_other_lang: z.string().min(1, { message: 'Debes especificar tu situación laboral' }).transform((employed) => employed === 'true' ? true : false),
    other_lang: z.string().nullable().optional(),
    lang_level: z.nativeEnum(Level).nullable().optional(),
    interests: z.string(),
    hobbies: z.string(),
    mentor_reason: z.string(),
    prev_mentor_exp: z.string().min(1, { message: 'Debes especificar' }).transform((employed) => employed === 'true' ? true : false),
    prev_mentor_desc: z.string().nullable().optional(),
    skills_strengths: z.string(),
    time_commitment: z.string(),
    ideal_mentee: z.string(),
    instagram: z.string().nullable().optional(),
    linkedin: z.string().nullable().optional(),
    referral_source: z.string(),
}).refine((data) => {
    console.log('its being called');
    if (data.employed === 'true') {
        if (!data.company || data.company.trim().length === 0) {
            return false;
        }
        if (!data.position || data.position.trim().length === 0) {
            return false;
        }
    }
    return true;
}, {
    message: 'Debes especificar la compañía y la posición de trabajo si estás empleado',
    path: ['company', 'position'], // This path will be used to show the error message
});


export type MentorSchemaType = z.infer<typeof MentorSchema>;


export default MentorSchema;

