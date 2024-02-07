import { z } from 'zod';

const scholarCollageInformationSchema = z
    .object({
        career_schedule: z.string().optional(),
        kind_of_collage: z.string(),
        collage: z.string().optional(),
        career: z.string(),
        mention: z.string().optional(),
        study_area: z.string().optional(),
        evaluation_scale: z.string().optional(),
        study_regime: z.string(),
        collage_start_date: z.date().optional(),



        academic_load_completed: z.boolean().optional(),
        have_schooolarship: z.boolean(),
        scholarship_percentage: z.number().optional(),
        collage_end_date: z.date().optional(),
        grade_special_mention: z.string().optional(),
        collage_opinion_study_quality: z.string().optional(),
        inscription_comprobant: z.string().optional(),

        collage_acceptance_scan: z.string().optional(),
        collage_study_proof: z.string().optional(),
        collage_proffessor_card1: z.string().optional(),
        collage_proffessor_card2: z.string().optional(),
    });

export default scholarCollageInformationSchema;
