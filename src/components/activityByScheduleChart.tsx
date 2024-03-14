'use client';
import { PieChartComponent } from './charts';
import { ChatsWithAllData } from './table/columns/chatsColumns';
import { WorkshopWithAllData } from './table/columns/workshopColumns';

function countActivitiesBySchedule(workshops: WorkshopWithAllData[] | ChatsWithAllData[]): {
  morning: WorkshopWithAllData[] | ChatsWithAllData[];
  afternoon: WorkshopWithAllData[] | ChatsWithAllData[];
} {
  return workshops.reduce(
    (acc, workshop) => {
      const startHour = new Date(workshop.start_dates[0]).getHours();
      const key = startHour < 12 ? 'morning' : 'afternoon';
      acc[key].push(workshop);
      return acc;
    },
    {
      morning: [] as WorkshopWithAllData[] | ChatsWithAllData[],
      afternoon: [] as WorkshopWithAllData[] | ChatsWithAllData[],
    }
  );
}

const ActivityByScheduleChart = ({ activities }) => {
  const { morning, afternoon } = countActivitiesBySchedule(activities);
  return (
    <PieChartComponent
      data={[
        {
          label: 'Manañas',
          value: morning.length,
        },
        { label: 'Tardes', value: afternoon.length },
      ]}
    />
  );
};

export default ActivityByScheduleChart;
