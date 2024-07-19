import { yesNoEnumBooleanTransform } from "@/lib/zod/utils";
import { z, ZodIssueCode } from "zod";

const jobInfoSchema = z.object({
    currently_working: yesNoEnumBooleanTransform,
    job_company: z.string().optional(),
    job_modality: z.enum(['IN_PERSON', 'ONLINE', 'HYBRID']).optional(),
    job_title: z.string().optional(),
    job_schedule: z.enum(['PART_TIME', 'FULL_TIME', 'WEEKENDS']).optional(),
}).superRefine((data, ctx) => {
    if (data.currently_working) {
        if (!data.job_company || data.job_company.trim().length === 0) {
            ctx.addIssue({
                path: ['job_company'],
                message: 'Debes especificar el lugar de trabajo',
                code: ZodIssueCode.custom, // Added the required 'code' property
            });
        }
        if (!data.job_title || data.job_title.trim().length === 0) {
            ctx.addIssue({
                path: ['job_title'],
                message: 'Debes especificar el lugar de trabajo',
                code: ZodIssueCode.custom, // Added the required 'code' property
            });
        }

        if (!data.job_modality) {
            ctx.addIssue({
                path: ['job_modality'],
                message: 'Debes seleccionar la modalidad de trabajo',
                code: ZodIssueCode.custom, // Added the required 'code' property
            });
        }
        if (!data.job_schedule) {
            ctx.addIssue({
                path: ['job_schedule'],
                message: 'Debes seleccionar el horario de trabajo',
                code: ZodIssueCode.custom, // Added the required 'code' property
            });
        }
    }
});

export default jobInfoSchema;