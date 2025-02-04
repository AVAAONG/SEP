'use server'
import { getServerSession } from '@/lib/auth/authOptions';
import { formatDates } from '@/lib/calendar/clientUtils';
import workshopCreationFormSchema from '@/lib/schemas/workshopCreationFormSchema';
import { ActivityStatus, Prisma, WorkshopYear } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';

interface MeetingDetail {
  meetingId: string | null | undefined;
  meetingLink: string | null | undefined;
  meetingPassword?: string | null | undefined;
}

type MeetingDetails = Array<MeetingDetail>;
const createWorkshopObject = async (
  data: z.infer<typeof workshopCreationFormSchema>,
  status: ActivityStatus,
  calendarIds: string[],
  meetingDetails: MeetingDetails
) => {
  const session = await getServerSession();
  if (!session) redirect('/signin')

  const chapterId = session.chapterId;
  let meeting_id: string[] = [];
  let meeting_link: string[] = [];
  let meeting_password: string[] = [];

  meetingDetails.forEach((meetingDetail) => {
    meeting_id.push(meetingDetail.meetingId || '');
    meeting_link.push(meetingDetail.meetingLink || '');
    meeting_password.push(meetingDetail.meetingPassword || '');
  });

  const dates = await formatDates(data.dates); //client formating
  let workshop: Prisma.WorkshopCreateArgs = {
    data: {
      title: data.title,
      avalible_spots: z.coerce.number().parse(data.avalible_spots),
      platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
      description: data.description ? data.description : null,
      ...dates,
      modality: data.modality,
      asociated_skill: data.asociated_skill,
      activity_status: status,
      calendar_ids: calendarIds,
      kindOfWorkshop: data.kindOfWorkshop,
      year: data.year as unknown as WorkshopYear[],
      speaker: {
        connect: data.speakers.map((speaker) => ({ id: speaker.value })),
      },
      meeting_id,
      meeting_link,
      meeting_password,
      chapterId: chapterId,
    },
  };
  return workshop;
};
export default createWorkshopObject;
