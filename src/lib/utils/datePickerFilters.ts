'use server';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { Chat, Volunteer, } from '@prisma/client';

const filterActivityByMonth = (
  activities: (WorkshopWithAllData | Chat | Volunteer)[],
  month: number
): (WorkshopWithAllData | Chat | Volunteer)[] => {
  return activities.filter(
    (activity: WorkshopWithAllData | Chat | Volunteer) =>
      new Date(activity.start_dates[0]).getMonth() === month
  );
};

const filterActivityByQuarter = (
  activities: (WorkshopWithAllData | Chat | Volunteer)[],
  quarter: number
): (WorkshopWithAllData | Chat | Volunteer)[] => {
  return activities.filter((activity: WorkshopWithAllData | Chat | Volunteer) => {
    const startMonth = new Date(activity.start_dates[0]).getMonth();
    const workshopQuarter = Math.floor(startMonth / 3) + 1;
    return workshopQuarter === quarter;
  });
};

const filterActivityByPeriod = (
  activities: (WorkshopWithAllData | Chat | Volunteer)[],
  period: 1 | 2 | 3
): (WorkshopWithAllData | Chat | Volunteer)[] => {
  return activities.filter((activity) => {
    const startMonth = new Date(activity.start_dates[0]).getMonth() + 1; // Months are 0-indexed
    if (period === 1) return startMonth >= 1 && startMonth <= 4;
    if (period === 2) return startMonth >= 5 && startMonth <= 8;
    if (period === 3) return startMonth >= 9 && startMonth <= 12;
    return false;
  });
};

const filterActivityByYear = (
  activities: (WorkshopWithAllData | Chat | Volunteer)[],
  year: number
): (WorkshopWithAllData | Chat | Volunteer)[] => {
  return activities.filter(
    (activity: WorkshopWithAllData | Chat | Volunteer) =>
      new Date(activity.start_dates[0]).getFullYear() === year
  );
};

const filterActivityByDateRange = (
  activities: (WorkshopWithAllData | Chat | Volunteer)[],
  startDate: string,
  endDate: string
): (WorkshopWithAllData | Chat | Volunteer)[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  // Set end to end of day for inclusivity
  end.setHours(23, 59, 59, 999);
  return activities.filter((activity) => {
    const activityDate = new Date(activity.start_dates[0]);
    return activityDate >= start && activityDate <= end;
  });
};


// Main filter for new datepicker (date range support)
const filterActivitiesBySearchParams = async (
  activityDbList: (WorkshopWithAllData | Chat | Volunteer)[],
  searchParams: {
    year?: string;
    quarter?: string;
    month?: string;
    startDate?: string;
    endDate?: string;
    preset?: string;
  } | undefined
): Promise<(WorkshopWithAllData | Chat | Volunteer)[]> => {
  let activities = activityDbList;
  const currentYear = new Date().getFullYear();
  if (searchParams?.startDate && searchParams?.endDate) {
    activities = filterActivityByDateRange(activities, searchParams.startDate, searchParams.endDate);
  } else if (searchParams?.preset === 'all') {
    // explicit request to show all activities
    activities = activityDbList;
  } else if (searchParams?.year) {
    activities = filterActivityByYear(activities, Number(searchParams.year));
    if (searchParams?.quarter) {
      activities = filterActivityByQuarter(activities, Number(searchParams.quarter));
    }
    if (searchParams?.month) {
      activities = filterActivityByMonth(activities, Number(searchParams.month));
    }
  } else {
    // No date params provided - default to current year
    activities = filterActivityByYear(activities, currentYear);
  }
  return activities;
};

export const filterActivitiesBySearchParamsPeriod = async (
  activityDbList: (WorkshopWithAllData | Chat | Volunteer)[],
  searchParams: { year?: string; quarter?: string; month?: string; preset?: string } | undefined
): Promise<(WorkshopWithAllData | Chat | Volunteer)[]> => {
  let activities: (WorkshopWithAllData | Chat | Volunteer)[];
  const currentYear = new Date().getFullYear();
  if (searchParams?.year) {
    activities = filterActivityByYear(activityDbList, Number(searchParams?.year));
    if (searchParams?.quarter) {
      activities = filterActivityByPeriod(activities, Number(searchParams?.quarter) as 1 | 2 | 3);
    }
    if (searchParams?.month) {
      activities = filterActivityByMonth(activities, Number(searchParams?.month));
    }
  } else if (searchParams?.preset === 'all') {
    activities = activityDbList;
  } else {
    // Default to current year when no search params provided
    activities = filterActivityByYear(activityDbList, currentYear);
  }
  return activities;
};

export default filterActivitiesBySearchParams;
