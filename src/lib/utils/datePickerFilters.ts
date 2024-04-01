'use server';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { Chat, Volunteer, Workshop } from '@prisma/client';

const filterActivityByMonth = (
  activities: (Workshop | Chat | Volunteer)[],
  month: number
): (Workshop | Chat | Volunteer)[] => {
  const filteredActivities = activities.filter(
    (activity: Workshop | Chat | Volunteer) =>
      new Date(activity.start_dates[0]).getMonth() === month
  );
  return filteredActivities;
}

const filterActivityByQuarter = (
  activities: (Workshop | Chat | Volunteer)[],
  quarter: number
): (Workshop | Chat | Volunteer)[] => {
  const filteredActivities = activities.filter((activity: Workshop | Chat | Volunteer) => {
    const startMonth = new Date(activity.start_dates[0]).getMonth();
    const workshopQuarter = Math.floor(startMonth / 3) + 1;
    return workshopQuarter === quarter;
  });

  return filteredActivities;
}

const filterActivityByYear = (
  activities: (Workshop | Chat | Volunteer)[],
  year: number
): (Workshop | Chat | Volunteer)[] => {
  const filteredActivities = activities.filter(
    (activity: Workshop | Chat | Volunteer) =>
      new Date(activity.start_dates[0]).getFullYear() === year
  );

  return filteredActivities;
}

const filterActivitiesBySearchParams = async (
  activityDbList: (WorkshopWithAllData | Chat | Volunteer)[],
  searchParams: { year?: string; quarter?: string; month?: string } | undefined
): (Workshop | Chat | Volunteer)[] => {
  let activities: (Workshop | Chat | Volunteer)[];
  if (searchParams?.year) {
    activities = filterActivityByYear(activityDbList, Number(searchParams?.year));
    if (searchParams?.quarter) {
      activities = filterActivityByQuarter(activities, Number(searchParams?.quarter));
    }
    if (searchParams?.month) {
      activities = filterActivityByMonth(activities, Number(searchParams?.month));
    }
  } else activities = activityDbList;
  return activities;
};

export default filterActivitiesBySearchParams;
