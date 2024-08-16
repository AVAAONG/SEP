import { formatDateToStoreInDB } from '@/lib/utils/dates';
import { Level } from '@prisma/client';
import { z } from 'zod';

const MentorSchema = z.object({
    photo: z.object(
        {
            name: z.string(),
            type: z.string(),
            size: z.number(),
        }
    ),
    first_name: z.string(),
    last_name: z.string(),
    id_number: z.string(),
    birth_date: z.string()
        .min(1, { message: 'Debes especificar tu fecha de nacimiento' }).transform((collage_start_date) => formatDateToStoreInDB(collage_start_date)),
    residence: z.string(),
    phone: z.string(),
    email: z.string().email(),
    profession: z.string(),
    employed: z.boolean(),
    company: z.string().nullable(),
    position: z.string().nullable(),
    work_experience: z.string(),
    related_experience: z.string().nullable(),
    other_activities: z.string().nullable(),
    cv: z.string(),
    speaks_other_lang: z.boolean(),
    other_lang: z.string().nullable(),
    lang_level: z.nativeEnum(Level).nullable(),
    interests: z.string(),
    hobbies: z.string(),
    mentor_reason: z.string(),
    prev_mentor_exp: z.boolean(),
    prev_mentor_desc: z.string().nullable(),
    skills_strengths: z.string(),
    trust_techniques: z.string(),
    mentee_support: z.string(),
    time_commitment: z.string(),
    ideal_mentee: z.string(),
    group_activities: z.boolean(),
    instagram: z.string().nullable(),
    linkedin: z.string().nullable(),
    referral_source: z.string(),
});

export type MentorSchemaType = z.infer<typeof MentorSchema>;


export default MentorSchema;

