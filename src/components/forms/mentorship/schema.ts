import { formatDateToStoreInDB } from '@/lib/utils/dates';
import { Level } from '@prisma/client';
import { z, ZodIssueCode } from 'zod';

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
        .min(1, { message: 'Debes especificar tu fecha de nacimiento' }).transform((birth_date) => formatDateToStoreInDB(birth_date)),
    residence: z.string(),
    phone: z.string(),
    email: z.string().email(),
    profession: z.string(),
    employed: z.string().min(1, { message: 'Debes especificar tu situación laboral' }).transform((employed) => employed === 'true' ? true : false),
    company: z.string().nullable().optional(),
    position: z.string().nullable(),
    work_experience: z.string(),
    related_experience: z.string().nullable(),
    other_activities: z.string().nullable(),
    cv: z.string(),
    speaks_other_lang: z.string().min(1, { message: 'Debes especificar tu situación laboral' }).transform((employed) => employed === 'true' ? true : false),
    other_lang: z.string().nullable(),
    lang_level: z.nativeEnum(Level).nullable(),
    interests: z.string(),
    hobbies: z.string(),
    mentor_reason: z.string(),
    prev_mentor_exp: z.string().min(1, { message: 'Debes especificar' }).transform((employed) => employed === 'true' ? true : false),
    prev_mentor_desc: z.string().nullable(),
    skills_strengths: z.string(),
    trust_techniques: z.string(),
    mentee_support: z.string(),
    time_commitment: z.string(),
    ideal_mentee: z.string(),
    group_activities: z.string().min(1, { message: 'Debes especificar' }).transform((employed) => employed === 'true' ? true : false),
    instagram: z.string().nullable(),
    linkedin: z.string().nullable(),
    referral_source: z.string(),
}).superRefine((data, ctx) => {
    if (data.employed === true) {
        if (!data.company || data.company.trim().length === 0) {
            ctx.addIssue({
                path: ['company'],
                message: 'Debes especificar la compañía donde trabaja',
                code: ZodIssueCode.custom,
            })
        }
    }
})

export type MentorSchemaType = z.infer<typeof MentorSchema>;


export default MentorSchema;

