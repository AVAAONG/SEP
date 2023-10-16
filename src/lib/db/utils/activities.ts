import { prisma } from "./prisma";

export const getDoneActivities = async () => {
    const [workshopsDone, workshopsAttChecked, chatsDone, chatsAttChecked] = await prisma.$transaction([
        prisma.workshop.count({
            where: { activity_status: 'DONE' },
        }),
        prisma.workshop.count({
            where: { activity_status: 'ATTENDANCE_CHECKED' },
        }),

        prisma.chat.count({
            where: { activity_status: 'DONE' },
        }),
        prisma.chat.count({
            where: { activity_status: 'ATTENDANCE_CHECKED' },
        }),
    ]);
    const workshopsCount = workshopsDone + workshopsAttChecked;
    const chatsCount = chatsDone + chatsAttChecked;
    return [workshopsCount, chatsCount];
};