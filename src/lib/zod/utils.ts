import { z } from "zod";
import { formatDateToStoreInDB } from "../utils/dates";

export const createEnumErrorMap = (validItemName: string) => {
    return {
        errorMap: (_issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => ({
            message: `Debes seleccionar un(a) ${validItemName} valida`,
        }),
    };
}

const YesNoEnum = z.enum(['YES', 'NO'], createEnumErrorMap('opción'));


export const yesNoEnumBooleanTransform = YesNoEnum.transform(
    (value) => {
        if (value === 'YES') return true;
        else if (value === 'NO') return false
    }
);

type FileValidationOptions = {
    maxSize?: number;
    acceptedTypes?: string[];
};

export const imageValudationSchema = (options: FileValidationOptions = {}) => {
    const {
        maxSize = 5000000, // 5MB default
        acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    } = options;

    return z.custom<File>()
        .refine((file) => file instanceof File, "Please upload a file.")
        .refine((file) => file.size <= maxSize, `Max file size is ${maxSize / 1000000}MB.`)
        .refine(
            (file) => acceptedTypes.includes(file.type),
            `Only ${acceptedTypes.join(', ')} files are accepted.`
        )
        .optional();
};

export const dateValidation = () => {
    return z.string()
        .min(1, { message: 'Debes especificar la fecha de nacimiento' })
        .refine((date) => new Date(date) <= new Date(), {
            message: 'La fecha no puede ser mayor a la actual',
        })
        .transform((date) => formatDateToStoreInDB(date));
}