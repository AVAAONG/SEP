import DateSelector from '@/components/commons/datePicker';
import Table from '@/components/table/Table';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import WorkshopColumns, { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getWorkshops } from '@/lib/db/utils/Workshops';
import { categorizeActivityByStatus } from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import {
  parseModalityFromDatabase,
  parseSkillFromDatabase,
  parseWorkshopStatusFromDatabase,
  parseWorkshopYearFromDatabase,
} from '@/lib/utils2';
import { Tooltip } from '@nextui-org/react';
import dynamic from 'next/dynamic';

const PieChartComponent = dynamic(() => import('@/components/charts/Pie'), { ssr: false });
const MixedAreaChartComponent = dynamic(() => import('@/components/charts/MixedAreaChart'), {
  ssr: false,
});

export function filterActivitiesBySchedule(workshops: WorkshopWithAllData[] | ChatsWithAllData[]): {
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

const page = async ({
  searchParams,
}: {
  params: { scholarId: string };
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const resultWorkshops = await getWorkshops();
  let workshops: WorkshopWithAllData[] = filterActivitiesBySearchParams(
    resultWorkshops,
    searchParams
  );

  const activitiesByStatus = categorizeActivityByStatus(workshops);

  const suspendedWorkshops = workshops.filter(
    (workshop) => workshop.activity_status === 'SUSPENDED'
  );
  const doneWorkshops = workshops.filter(
    (workshop) => workshop.activity_status === 'ATTENDANCE_CHECKED'
  );
  const scheduledWorkshops = workshops.filter(
    (workshop) => workshop.activity_status === 'SCHEDULED' || workshop.activity_status === 'SENT'
  );

  const workshopsDataForTable = workshops.map((workshop) => {
    const speakerName =
      workshop.speaker[0].first_names.split(' ')[0] +
      ' ' +
      workshop.speaker[0].last_names.split(' ')[0];
    return {
      id: workshop.id,
      title: workshop.title,
      speakerId: workshop.speaker[0].id,
      speakerName,
      speakerCompany: workshop.speaker[0].job_company,
      speakerImage: workshop.speaker[0].image,
      date: new Date(workshop.start_dates[0]).toLocaleString('es-ES', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }),
      startHour: new Date(workshop.start_dates[0]).toISOString(),
      status: parseWorkshopStatusFromDatabase(workshop.activity_status),
      skill: parseSkillFromDatabase(workshop.asociated_skill),
      modality: parseModalityFromDatabase(workshop.modality),
      platform: workshop.platform,
      year: parseWorkshopYearFromDatabase(workshop.year),
      scholarsEnrroled: workshop.scholar_attendance.filter(
        (a) => a.attendance === 'ENROLLED' || 'ATTENDED'
      ).length,
      attendedScholars: workshop.scholar_attendance.filter((a) => a.attendance === 'ATTENDED')
        .length,
    };
  });

  const doneWorkshopsPercentage = Number(
    ((doneWorkshops.length / workshops.length) * 100).toFixed(0)
  );
  const suspendedWorkshopsPercentage = Number(
    ((suspendedWorkshops.length / workshops.length) * 100).toFixed(0)
  );

  const stats = [
    {
      name: 'Actividades formativas ofertadas',
      stat: workshops.length || 0,
      previousStat: 250,
      changeType: 'decrease',
      comparationText: null,
      tooltipText: null,
    },
    {
      name: 'Actividades formativas realizadas',
      stat: doneWorkshops.length || 0,
      changeType: 'increase',
      comparationText: `De ${workshops.length || 0} actividades ofertadas`,
      comparation: doneWorkshopsPercentage,
      tooltipText: `${doneWorkshopsPercentage}% de las actividades fueron realizadas`,
    },
    {
      name: 'Actividades formativas agendadas',
      stat: scheduledWorkshops.length || 0,
      changeType: 'increase',
      comparationText: null,
    },
    {
      name: 'Actividades formativas canceladas',
      stat: suspendedWorkshops.length || 0,
      changeType: 'increase',
      comparationText: `De ${workshops.length || 0} actividades ofertadas`,
      comparation: suspendedWorkshopsPercentage,
      tooltipText: `${suspendedWorkshopsPercentage}% de las actividades fueron canceladas`,
    },
  ];

  const workshopsWithHighAttendancePerMonth: Record<string, number> =
    doneWorkshops?.reduce(
      (acc, workshop) => {
        const month = new Date(workshop.start_dates[0]).getMonth();
        const totalScholars = workshop.scholar_attendance?.length || 0;
        const attendedScholars =
          workshop.scholar_attendance?.filter(
            (a: { attendance: string }) => a.attendance === 'ATTENDED'
          )?.length || 0;
        const attendancePercentage = (attendedScholars / totalScholars) * 100;
        if (attendancePercentage >= 60) acc[month.toString()] = (acc[month.toString()] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  // Add null values for months without workshops
  for (let month = 0; month < 12; month++) {
    if (!(month in workshopsByMonth)) {
      workshopsByMonth[month] = 0;
      workshopsWithHighAttendancePerMonth[month.toString()] = 0;
    }
  }
  const chartData = Object.entries(workshopsByMonth).map(([month, count]) => ({
    x: new Date(0, Number(month)),
    y: count,
  }));
  const chartData2 = Object.entries(workshopsWithHighAttendancePerMonth).map(([month, count]) => ({
    x: new Date(0, Number(month)),
    y: count,
  }));
  const areaSeries = {
    data: chartData2,
    name: 'Actividades formativas con alta asistencia',
    color: '#eab308',
    type: 'line',
  };
  const barSeries = {
    data: chartData,
    name: 'Actividades formativas realizadas',
    color: '#23a217',
    type: 'bar',
  };

  return (
    <div className="w-full flex flex-col gap-6  items-center ">
      <DateSelector />
      <div className="w-full">
        <div>
          <dl
            className={`grid grid-cols-1 rounded-lg bg-white dark:bg-black shadow-md overflow-hidden  divide-y divide-gray-200 dark:divide-gray-700 md:grid-cols-4  justify-center md:divide-y-0 md:divide-x`}
          >
            {stats.map((item) => (
              <div key={item.name} className="p-5 overflow-hidden">
                <dt className="text-base font-medium ">{item.name}</dt>
                <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div className="flex items-baseline text-4xl font-semibold text-primary-light">
                    {item.stat}
                    <span className="ml-2 text-sm truncate font-medium text-gray-500">
                      {item.comparationText}
                    </span>
                  </div>
                  {item.comparation && (
                    <Tooltip content={item.tooltipText}>
                      <div
                        className={
                          ' cursor-pointer bg-light dark:bg-dark text-dark inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                        }
                      >
                        <span className="sr-only">
                          {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                        </span>
                        {item.comparation}%
                      </div>
                    </Tooltip>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="w-full  rounded-lg bg-white">
        <MixedAreaChartComponent areaSeries={areaSeries} barSeries={barSeries} />
      </div>
      <div className="w-full grid md:grid-cols-3 p-4 gap-6 justify-center items-center rounded-lg bg-white">
        <div>
          <h3 className="truncate font-semibold text-center text-sm">
            Distribucion de actividades segun su nivel
          </h3>
          <PieChartComponent data={workshopsBySkill} />
        </div>
        <div>
          <h3 className="truncate font-semibold text-center text-sm">
            Distribucion de actividades segun su modalidad
          </h3>
          <PieChartComponent data={workshopsByModality} />
        </div>
        <div>
          <h3 className="truncate font-semibold text-center text-sm">
            Distribucion de actividades segun su horario
          </h3>
          <PieChartComponent
            data={[
              {
                label: 'Manañas',
                value: morning.length,
              },
              { label: 'Tardes', value: afternoon.length },
            ]}
          />
        </div>
      </div>
      <div className="w-full ">
        <Table
          tableData={workshopsDataForTable}
          tableColumns={WorkshopColumns}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
