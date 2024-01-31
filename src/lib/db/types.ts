import { Prisma } from "@prisma/client";

const chatWithSpeakers = Prisma.validator<Prisma.ChatDefaultArgs>()({
    include: {
        speaker: true,
    },
});
export type ChatWithSpeaker = Prisma.ChatGetPayload<typeof chatWithSpeakers>;
