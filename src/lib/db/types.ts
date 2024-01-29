import { Prisma } from "@prisma/client";

const chatWithSpeakers = Prisma.validator<Prisma.ChatDefaultArgs>()({
    include: {
        speaker: true,
    },
});
export type ChatWithSpeaker = Prisma.ChatGetPayload<typeof chatWithSpeakers>;

const chatWithSpeakerAndTempdata = Prisma.validator<Prisma.ChatDefaultArgs>()({
    include: {
        speaker: true,
        temp_data: true,
    },
});
export type ChatWithSpeakerAndTempdata = Prisma.ChatGetPayload<typeof chatWithSpeakerAndTempdata>;
