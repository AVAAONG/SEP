import { yesNoEnumBooleanTransform } from '@/lib/zod/utils';
import { z } from 'zod';

const aditionalInfoFormSchema = z.object({
  has_internet_connection: yesNoEnumBooleanTransform,
  internet_connection_stability: z
    .enum(['Very Stable', 'Stable', 'Unstable', 'Very Unstable'])
    .describe('¿Qué tan estable es tu conectividad?'),
  program_discovery_source: z.string().describe('¿Cómo se enteró del Programa Excelencia?'),
  scholarship_application_reason: z.string().min(1).describe('¿Por qué solicita esta beca?'),
  is_referred_by_scholar: yesNoEnumBooleanTransform,
  referring_scholar_Name: z
    .string()
    .optional()
    .describe('Nombre del Becario por quien vienes referido'),
});

export default aditionalInfoFormSchema;
