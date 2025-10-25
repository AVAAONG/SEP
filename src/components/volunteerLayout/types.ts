import { Prisma } from '@prisma/client';

export const volunteerInclude = {
    volunteer_attendance: {
        include: {
            scholar: {
                include: {
                    scholar: true,
                },
            },
        },
    },
} satisfies Prisma.VolunteerInclude;

export type VolunteerWithDetails = Prisma.VolunteerGetPayload<{
    include: typeof volunteerInclude;
}>;
