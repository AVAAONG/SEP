import { ChatWithSpeaker } from '@/lib/db/types';
import chatCreationFormSchema from '@/lib/schemas/chatCreationFormSchema';
import { formatDateToDisplayInInput, formatHourToDisplayInput } from '@/lib/utils/dates';
import { z } from 'zod';

const formatChat = (
    values: ChatWithSpeaker
): z.infer<typeof chatCreationFormSchema> => {
    return {
        title: values?.title ?? '',
        dates: [
            {
                date: formatDateToDisplayInInput(values?.start_dates[0]),
                startHour: formatHourToDisplayInput(values?.start_dates[0]),
                endHour: formatHourToDisplayInput(values?.end_dates[0]),
            },
        ],
        modality: values?.modality!,
        speakers: values.speaker.map((speaker) => ({
            value: speaker.id,
            label: `${speaker.first_names} ${speaker.last_names}`,
            email: speaker.email,
        })),
        platformInPerson: values?.platform ?? '',
        platformOnline: values?.platform ?? '',
        description: values?.description ?? undefined,
        avalible_spots: values?.avalible_spots ?? 0,
        meetingLink: values?.meeting_link[0] ?? '',
        meetingId: values?.meeting_id[0] ?? '',
        meetingPass: values?.meeting_password[0] ?? '',
        level: values?.level!,
    };
};

export default formatChat;
