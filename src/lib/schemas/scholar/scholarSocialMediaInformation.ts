import { z } from 'zod';

const scholarScialMediaInformation = z
    .object({
        instagram_user: z.string().optional().nullable(),
        twitter_user: z.string().optional().nullable(),
        facebook_user: z.string().optional().nullable(),
        linkedin_user: z.string().optional().nullable(),
        tiktok_user: z.string().optional().nullable(),
        youtube_user: z.string().optional().nullable(),
    });

export default scholarScialMediaInformation;
