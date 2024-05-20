import { ActivityKind } from "@/lib/activities/utils";

export type BigCalendarEventType = {
  id: string;
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
  kindOfActivity: ActivityKind;
};
