import { Chat, Volunteer, Workshop } from "@prisma/client";

function filterActivityByMonth(
    activities: Workshop[] | Chat[] | Volunteer[],
    month: number
): Workshop[] | Chat[] | Volunteer[] {
    const filteredActivities = activities.filter((activity: Workshop | Chat | Volunteer) =>
        new Date(activity.start_dates[0]).getMonth() === month
    );
    return filteredActivities;
}

function filterActivityByQuarter(
    activities: Workshop[] | Chat[] | Volunteer[],
    quarter: number
): Workshop[] | Chat[] | Volunteer[] {
    const filteredActivities = activities.filter((activity: Workshop | Chat | Volunteer) => {
        const startMonth = new Date(activity.start_dates[0]).getMonth();
        const workshopQuarter = Math.floor(startMonth / 3) + 1;
        return workshopQuarter === quarter;
    });

    return filteredActivities;
}

function filterActivityByYear(
    activities: Workshop[] | Chat[] | Volunteer[],
    year: number
): Workshop[] | Chat[] | Volunteer[] {
    const filteredActivities = activities.filter((activity: Workshop | Chat | Volunteer) => (
        new Date(activity.start_dates[0]).getFullYear() === year
    ));

    return filteredActivities;
}

export { filterActivityByMonth, filterActivityByQuarter, filterActivityByYear };

