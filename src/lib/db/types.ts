import { Prisma } from "@prisma/client";

const chatWithSpeakers = Prisma.validator<Prisma.ChatDefaultArgs>()({
    include: {
        speaker: true,
    },
});
export type ChatWithSpeaker = Prisma.ChatGetPayload<typeof chatWithSpeakers>;

const workshopWithSpeaker = Prisma.validator<Prisma.WorkshopDefaultArgs>()({
    include: {
        speaker: true,
    },
});
export type WorkshopWithSpeaker = Prisma.WorkshopGetPayload<typeof workshopWithSpeaker>;
