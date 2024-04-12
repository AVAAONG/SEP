'use server';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { Chat, Volunteer, } from '@prisma/client';

const filterActivityByMonth = (
  activities: (WorkshopWithAllData | Chat | Volunteer)[],
  month: number
): (WorkshopWithAllData | Chat | Volunteer)[] => {
  const filteredActivities = activities.filter(
    (activity: WorkshopWithAllData | Chat | Volunteer) =>
      new Date(activity.start_dates[0]).getMonth() === month
  );
  return filteredActivities;
}

const filterActivityByQuarter = (
  activities: (WorkshopWithAllData | Chat | Volunteer)[],
  quarter: number
): (WorkshopWithAllData | Chat | Volunteer)[] => {
  const filteredActivities = activities.filter((activity: WorkshopWithAllData | Chat | Volunteer) => {
    const startMonth = new Date(activity.start_dates[0]).getMonth();
    const workshopQuarter = Math.floor(startMonth / 3) + 1;
    return workshopQuarter === quarter;
  });

  return filteredActivities;
}

const filterActivityByYear = (
  activities: (WorkshopWithAllData | Chat | Volunteer)[],
  year: number
): (WorkshopWithAllData | Chat | Volunteer)[] => {
  const filteredActivities = activities.filter(
    (activity: WorkshopWithAllData | Chat | Volunteer) =>
      new Date(activity.start_dates[0]).getFullYear() === year
  );

  return filteredActivities;
}

const filterActivitiesBySearchParams = async (
  activityDbList: (WorkshopWithAllData | Chat | Volunteer)[],
  searchParams: { year?: string; quarter?: string; month?: string } | undefined
): Promise<(WorkshopWithAllData | Chat | Volunteer)[]> => {
  let activities: (WorkshopWithAllData | Chat | Volunteer)[];
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
