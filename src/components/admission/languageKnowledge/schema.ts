import { z, ZodIssueCode } from 'zod';

const speaksOtherLanguageEnum = z.enum(['YES', 'NO'],
    {
        errorMap: (issue, _ctx) => {
            switch (issue.code) {
                case 'invalid_enum_value':
                    return { message: 'Debes seleccionar una opción valida' };
                default:
                    return { message: 'Debes seleccionar' };
            }
        },
    }
);

// Transforming 'YES'/'NO' to true/false
const speaksOtherLanguage = speaksOtherLanguageEnum.transform(
    (value) => {
        if (value === 'YES') return true;
        if (value === 'NO') return false
    }
);
const languagesFormSchema = z.object({
    speaksOtherLanguage,
    specifiedLanguage: z.string().optional(),
    englishLevel: z.enum(['BASIC', 'INTERMEDIATE', 'ADVANCED']).optional(),
}).superRefine((data, ctx) => {
    if (data.speaksOtherLanguage) {
        if (!data.specifiedLanguage || data.specifiedLanguage.trim().length === 0) {
            ctx.addIssue({
                path: ['specifiedLanguage'],
                message: 'Especificar idioma es requerido',
                code: ZodIssueCode.custom, // Added the required 'code' property
            });
        }
        if (!data.englishLevel) {
            ctx.addIssue({
                path: ['englishLevel'],
                message: 'Se requiere nivel de inglés cuando se habla otro idioma es "Sí"',
                code: ZodIssueCode.custom, // Added the required 'code' property
            });
        }
    }
});

export default languagesFormSchema;