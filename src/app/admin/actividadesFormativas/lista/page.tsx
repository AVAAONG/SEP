import DateSelector from '@/components/DateSelector';
import Table from '@/components/table/Table';
import WorkshopColumns, { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getWorkshops } from '@/lib/db/utils/Workshops';
import { createArrayFromObject } from '@/lib/utils';
import {
  parseModalityFromDatabase,
  parseSkillFromDatabase,
  parseWorkshopStatusFromDatabase,
} from '@/lib/utils2';
import { Workshop, WorkshopYear } from '@prisma/client';
import dynamic from 'next/dynamic';

const PieChartComponent = dynamic(() => import('@/components/charts/Pie'), { ssr: false });
const MixedAreaChartComponent = dynamic(() => import('@/components/charts/MixedAreaChart'), {
  ssr: false,
});

function filterWorkshopsByMonth(
  workshops: WorkshopWithAllData[],
  month: number
): WorkshopWithAllData[] {
  const filteredWorkshops = workshops.filter((workshop) => {
    const startMonth = new Date(workshop.start_dates[0]).getMonth();
    return startMonth === month;
  });

  return filteredWorkshops;
}

const parseWorkshopYearFromDatabase = (years: WorkshopYear[]) => {
  if (years.length === 5) {
    return 'Todos';
  } else {
    return years.join(', ');
  }
};

function filterWorkshopsByQuarter(
  workshops: WorkshopWithAllData[],
  quarter: number
): WorkshopWithAllData[] {
  const filteredWorkshops = workshops.filter((workshop) => {
    const startMonth = new Date(workshop.start_dates[0]).getMonth();
    const workshopQuarter = Math.floor(startMonth / 3) + 1;
    return workshopQuarter === quarter;
  });

  return filteredWorkshops;
}

function filterWorkshopsByYear(
  workshops: WorkshopWithAllData[],
  year: number
): WorkshopWithAllData[] {
  const filteredWorkshops = workshops.filter((workshop) => {
    const startYear = new Date(workshop.start_dates[0]).getFullYear();
    return startYear === year;
  });

  return filteredWorkshops;
}

function categorizeWorkshops(workshops: Workshop[]): {
  morning: Workshop[];
  afternoon: Workshop[];
} {
  const morningWorkshops: Workshop[] = [];
  const afternoonWorkshops: Workshop[] = [];

  for (const workshop of workshops) {
    const startHour = new Date(workshop.start_dates[0]).getHours();

    if (startHour < 12) {
      morningWorkshops.push(workshop);
    } else {
      afternoonWorkshops.push(workshop);
    }
  }

  return { morning: morningWorkshops, afternoon: afternoonWorkshops };
}

const page = async ({
  searchParams,
}: {
  params: { scholarId: string };
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const resultWorkshops = await getWorkshops();
  let workshops: WorkshopWithAllData[] = [];

  if (searchParams?.year) {
    workshops = filterWorkshopsByYear(resultWorkshops, Number(searchParams?.year));
  }
  if (searchParams?.quarter) {
    workshops = filterWorkshopsByQuarter(resultWorkshops, Number(searchParams?.quarter));
  }
  if (searchParams?.month) {
    workshops = filterWorkshopsByMonth(resultWorkshops, Number(searchParams?.month));
  }
  if (!searchParams?.year && !searchParams?.quarter && !searchParams?.month) {
    workshops = resultWorkshops;
  }

  const suspendedWorkshops = workshops.filter(
    (workshop) => workshop.activity_status === 'SUSPENDED'
  );
  const doneWorkshops = workshops.filter(
    (workshop) =>
      workshop.activity_status === 'ATTENDANCE_CHECKED' || workshop.activity_status === 'DONE'
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
      startHour: new Date(workshop.start_dates[0]).toLocaleTimeString('es-VE', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
      }),
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

  const stats = [
    {
      name: 'Actividades formativas ofertadas',
      stat: workshops.length || 0,
      previousStat: 250,
      change: Number((((150 - workshops.length) / 150) * 100).toFixed(2)),
      changeType: 'decrease',
    },
    {
      name: 'Actividades formativas realizadas',
      stat: doneWorkshops.length || 0,
      previousStat: 250,
      change: 0,
      changeType: 'increase',
    },
    {
      name: 'Actividades formativas agendadas',
      stat: scheduledWorkshops.length || 0,
      previousStat: 250,
      change: 0,
      changeType: 'increase',
    },
    {
      name: 'Actividades formativas canceladas',
      stat: suspendedWorkshops.length || 0,
      previousStat: 250,
      change: 0,
      changeType: 'increase',
    },
  ];

  const workshopsByModalityObj =
    doneWorkshops?.reduce(
      (acc, workshop) => {
        const skill = parseModalityFromDatabase(workshop.modality);
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const workshopsBySkillObj =
    doneWorkshops?.reduce(
      (acc, workshop) => {
        const skill = parseSkillFromDatabase(workshop.asociated_skill);
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const workshopsBySkill = createArrayFromObject(workshopsBySkillObj);
  const workshopsByModality = createArrayFromObject(workshopsByModalityObj);
  const { morning, afternoon } = categorizeWorkshops(doneWorkshops);

  const workshopsByMonth: Record<number, number> =
    doneWorkshops?.reduce(
      (acc, workshop) => {
        const month = new Date(workshop.start_dates[0]).getMonth();
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>
    ) || {};

  interface WorkshopWithAttendance extends Workshop {
    scholar_attendance?: { attendance: string }[];
  }

  const workshopsWithHighAttendancePerMonth: Record<string, number> =
    doneWorkshops?.reduce(
      (acc, workshop) => {
        const month = new Date(workshop.start_dates[0]).getMonth();
        const attendance = (workshop as WorkshopWithAttendance).scholar_attendance?.filter(
          (a: { attendance: string }) => a.attendance === 'ATTENDED'
        )?.length;
        if (attendance && attendance > 15) acc[month.toString()] = (acc[month.toString()] || 0) + 1;
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
              <div key={item.name} className="p-5">
                {/* <dt className="text-base font-medium ">{item.name}</dt> */}
                <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div className="flex items-baseline text-4xl font-semibold text-primary-light">
                    {item.stat}
                    <span className="ml-2 text-sm truncate font-medium text-gray-500">
                      {item.name}
                    </span>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="w-full  rounded-lg bg-white">
        <MixedAreaChartComponent areaSeries={areaSeries} barSeries={barSeries} />
      </div>
      <div className="w-full grid grid-cols-3 justify-center items-center rounded-lg bg-white">
        <div className="w-full">
          <PieChartComponent data={workshopsBySkill} />
        </div>
        <div className="w-11/12">
          <PieChartComponent data={workshopsByModality} />
        </div>
        <div className="w-11/12">
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
