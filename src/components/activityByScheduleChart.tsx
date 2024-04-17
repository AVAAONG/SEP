'use client';
import { DonutChartComponent } from './charts';
import { ChatsWithAllData } from './table/columns/chatsColumns';
import { WorkshopWithAllData } from './table/columns/workshopColumns';

const countActivitiesBySchedule = (
  activities: WorkshopWithAllData[] | ChatsWithAllData[]
): {
  morning: number;
  afternoon: number;
} => {
  return activities.reduce(
    (acc, activity) => {
      const startHour = new Date(activity.start_dates[0]).getHours();
      const key = startHour < 12 ? 'morning' : 'afternoon';
      acc[key]++;
      return acc;
    },
    {
      morning: 0,
      afternoon: 0,
    }
  );
};

interface ActivityByScheduleChartProps {
  activities: WorkshopWithAllData[] | ChatsWithAllData[];
}

const ActivityByScheduleChart: React.FC<ActivityByScheduleChartProps> = ({ activities }) => {
  const { morning, afternoon } = countActivitiesBySchedule(activities);
  return (
    <DonutChartComponent
      data={[
        {
          label: 'Manañas',
          value: morning,
        },
        { label: 'Tardes', value: afternoon },
      ]}
      chartTitle="Distribución por horario"
    />
  );
};

export default ActivityByScheduleChart;
