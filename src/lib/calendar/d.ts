import { Chat, Workshop } from '@prisma/client';

export interface ISpeakerCalendar {
  speakersData: {
    id: string;
    speakerName: string;
    speakerEmail: string;
  }[];
}
export interface IWorkshopCalendar
  extends Omit<
      Workshop,
      | 'calendar_ids'
      | 'activity_status'
      | 'slides'
      | 'id'
      | 'start_dates'
      | 'end_dates'
      | 'meeting_id'
      | 'meeting_link'
      | 'meeting_password'
    >,
    ISpeakerCalendar {
  start_dates: string[];
  end_dates: string[];
}
export interface IChatCalendar
  extends Omit<
      Chat,
      | 'whatsapp_link'
      | 'calendar_ids'
      | 'activity_status'
      | 'slides'
      | 'id'
      | 'start_dates'
      | 'end_dates'
      | 'meeting_id'
      | 'meeting_link'
      | 'meeting_password'
    >,
    ISpeakerCalendar {
  start_dates: string[];
  end_dates: string[];
}
