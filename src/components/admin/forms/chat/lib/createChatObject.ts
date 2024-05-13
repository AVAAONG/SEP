import { formatDates } from '@/lib/calendar/clientUtils';
import chatCreationFormSchema from '@/lib/schemas/chatCreationFormSchema';
import { ActivityStatus, Prisma } from '@prisma/client';
import { z } from 'zod';

interface MeetingDetail {
    meetingId: string | null | undefined;
    meetingLink: string | null | undefined;
    meetingPassword?: string | null | undefined;
}

type MeetingDetails = Array<MeetingDetail>;
const createChatObject = async (
    data: z.infer<typeof chatCreationFormSchema>,
    status: ActivityStatus,
    calendarIds: string[],
    meetingDetails: MeetingDetails
) => {
    let meeting_id: string[] = [];
    let meeting_link: string[] = [];
    let meeting_password: string[] = [];

    meetingDetails.forEach((meetingDetail) => {
        meeting_id.push(meetingDetail.meetingId || '');
        meeting_link.push(meetingDetail.meetingLink || '');
        meeting_password.push(meetingDetail.meetingPassword || '');
    });

    const dates = await formatDates(data.dates); //client formating
    let workshop: Prisma.ChatCreateArgs = {
        data: {
            title: data.title,
            avalible_spots: z.coerce.number().parse(data.avalible_spots),
            platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
            description: data.description ? data.description : null,
            ...dates,
            modality: data.modality,
            level: data.level,
            activity_status: status,
            calendar_ids: calendarIds,
            speaker: {
                connect: data.speakers.map((speaker) => ({ id: speaker.value })),
            },
            meeting_id,
            meeting_link,
            meeting_password,
        },
    };
    return workshop;
};
export default createChatObject;
