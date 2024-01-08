export type BigCalendarEventType = {
  title?: string;
  start?: Date;
  end?: Date;
  description?: string;
  bgColor?: string;
  location?: string;
  allDay: boolean;
  textColor?: string;
  isSuspended: boolean;
  url: string;
};
