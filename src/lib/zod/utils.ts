import { z } from "zod";

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