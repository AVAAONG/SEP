import { z } from 'zod';

const activitySatisfactionFormSchema = z
    .object({
        activity_organization: z.coerce.number().min(1).max(5),
        activity_number_of_participants: z.coerce.number().min(1).max(5),
        activity_lenght: z.coerce.number().min(1).max(5),
        activity_relevance_for_scholar: z.coerce.number().min(1).max(5),

        speaker_theory_practice_mix: z.coerce.number().min(1).max(5),
        speaker_knowledge_of_activity: z.coerce.number().min(1).max(5),
        speaker_foment_scholar_to_participate: z.coerce.number().min(1).max(5),
        speaker_knowledge_transmition: z.coerce.number().min(1).max(5),

        content_match_necesities: z.coerce.number().min(1).max(5),
        content_knowledge_adquisition: z.coerce.number().min(1).max(5),
        content_knowledge_expansion: z.coerce.number().min(1).max(5),
        content_personal_development: z.coerce.number().min(1).max(5),

        general_satisfaction: z.coerce.number().min(1).max(5),

    })

export default activitySatisfactionFormSchema;
