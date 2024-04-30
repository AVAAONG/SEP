import { WorkshopWithSpeaker } from '@/lib/db/types';
import workshopCreationFormSchema from '@/lib/schemas/workshopCreationFormSchema';
import { WorkshopYear } from '@prisma/client';
import moment from 'moment';
import { z } from 'zod';

const formatWorkshop = (
  values: WorkshopWithSpeaker
): z.infer<typeof workshopCreationFormSchema> => {
  return {
    title: values?.title ?? '',
    dates: [
      {
        date: moment(values?.start_dates[0]).format('YYYY-MM-DD'),
        startHour: moment(values?.start_dates[0]).format('HH:mm'),
        endHour: moment(values?.end_dates[0]).format('HH:mm'),
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
    asociated_skill: values?.asociated_skill!,
    kindOfWorkshop: values?.kindOfWorkshop!,
    year: values?.year as unknown as WorkshopYear[],
    meetingLink: values?.meeting_link[0] ?? '',
    meetingId: values?.meeting_id[0] ?? '',
    meetingPass: values?.meeting_password[0] ?? '',
  };
};

export default formatWorkshop;
