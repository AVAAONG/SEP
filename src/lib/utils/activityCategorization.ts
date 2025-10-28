import { Chat, Volunteer, Workshop } from '@prisma/client';

export type GenericActivity = Workshop | Chat | Volunteer;

export type ActivityTimelineBuckets = {
  overdue: GenericActivity[];
  upcomingSoon: GenericActivity[];
  upcomingLater: GenericActivity[];
};

interface TimelineOptions {
  now?: Date;
  daysForSoon?: number;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const getActivityStartDate = (activity: GenericActivity): Date | null => {
  const startValue = activity?.start_dates?.[0];
  if (!startValue) return null;

  const date = startValue instanceof Date ? startValue : new Date(startValue);
  if (Number.isNaN(date.getTime())) return null;

  return date;
};

export const getActivityKind = (activity: GenericActivity): 'workshop' | 'chat' | 'volunteer' => {
  if ('year' in activity) {
    return 'workshop';
  }

  if ('level' in activity) {
    return 'chat';
  }

  return 'volunteer';
};

export const getActivityLink = (activity: GenericActivity): string => {
  if ('year' in activity) {
    return `actividadesFormativas/${activity.id}`;
  }

  if ('level' in activity) {
    return `chats/${activity.id}`;
  }

  if ('kind_of_volunteer' in activity) {
    return `voluntariado/${activity.id}`;
  }

  return '#';
};

export const groupActivitiesByTimeline = (
  activities: GenericActivity[],
  options?: TimelineOptions
): ActivityTimelineBuckets => {
  const { now = new Date(), daysForSoon = 7 } = options ?? {};
  const soonThreshold = new Date(now.getTime() + daysForSoon * DAY_IN_MS);

  const sortedActivities = activities
    .map((activity) => ({ activity, startDate: getActivityStartDate(activity) }))
    .filter((item): item is { activity: GenericActivity; startDate: Date } => Boolean(item.startDate))
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  return sortedActivities.reduce<ActivityTimelineBuckets>(
    (acc, { activity, startDate }) => {
      if (startDate.getTime() < now.getTime()) {
        acc.overdue.push(activity);
      } else if (startDate.getTime() <= soonThreshold.getTime()) {
        acc.upcomingSoon.push(activity);
      } else {
        acc.upcomingLater.push(activity);
      }

      return acc;
    },
    { overdue: [], upcomingSoon: [], upcomingLater: [] }
  );
};
