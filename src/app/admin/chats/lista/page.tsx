import DateSelector from '@/components/DateSelector';
import Table from '@/components/table/Table';
import ChatColumns, { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import { getChats } from '@/lib/db/utils/chats';
import { createArrayFromObject } from '@/lib/utils';
import { parseModalityFromDatabase, parseWorkshopStatusFromDatabase } from '@/lib/utils2';
import { Chat } from '@prisma/client';
import dynamic from 'next/dynamic';

const PieChartComponent = dynamic(() => import('@/components/charts/Pie'), { ssr: false });
const MixedAreaChartComponent = dynamic(() => import('@/components/charts/MixedAreaChart'), {
  ssr: false,
});

function filterWorkshopsByMonth(workshops: ChatsWithAllData[], month: number): ChatsWithAllData[] {
  const filteredWorkshops = workshops.filter((workshop) => {
    const startMonth = new Date(workshop.start_dates[0]).getMonth();
    return startMonth === month;
  });

  return filteredWorkshops;
}
function filterWorkshopsByQuarter(
  workshops: ChatsWithAllData[],
  quarter: number
): ChatsWithAllData[] {
  const filteredWorkshops = workshops.filter((workshop) => {
    const startMonth = new Date(workshop.start_dates[0]).getMonth();
    const workshopQuarter = Math.floor(startMonth / 3) + 1;
    return workshopQuarter === quarter;
  });

  return filteredWorkshops;
}

function filterWorkshopsByYear(workshops: ChatsWithAllData[], year: number): ChatsWithAllData[] {
  const filteredWorkshops = workshops.filter((workshop) => {
    const startYear = new Date(workshop.start_dates[0]).getFullYear();
    return startYear === year;
  });

  return filteredWorkshops;
}

function categorizeWorkshops(workshops: ChatsWithAllData[]): {
  morning: Chat[];
  afternoon: Chat[];
} {
  const morningWorkshops: Chat[] = [];
  const afternoonWorkshops: Chat[] = [];

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
  const resultWorkshops = await getChats();
  let workshops: ChatsWithAllData[] = [];
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

  const chatSDataForTable = workshops.map((chat) => {
    const speakerName =
      chat.speaker[0].first_names.split(' ')[0] + ' ' + chat.speaker[0].last_names.split(' ')[0];
    return {
      id: chat.id,
      title: chat.title,
      speakerId: chat.speaker[0].id,
      speakerName,
      speakerCompany: chat.speaker[0].job_company,
      speakerImage: chat.speaker[0].image,
      date: new Date(chat.start_dates[0]).toLocaleString('es-ES', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }),
      startHour: new Date(chat.start_dates[0]).toLocaleTimeString('es-VE', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
      }),
      status: parseWorkshopStatusFromDatabase(chat.activity_status),
      modality: parseModalityFromDatabase(chat.modality),
      platform: chat.platform,
      level: chat.level,
      scholarsEnrroled: chat.scholar_attendance.filter(
        (a) => a.attendance === 'ENROLLED' || 'ATTENDED'
      ).length,
      attendedScholars: chat.scholar_attendance.filter((a) => a.attendance === 'ATTENDED').length,
    };
  });
  const stats = [
    {
      name: 'Chat clubs ofertados',
      stat: workshops.length || 0,
      previousStat: 250,
      change: Number((((150 - workshops.length) / 150) * 100).toFixed(2)),
      changeType: 'decrease',
    },
    {
      name: 'Chat clubs realizados',
      stat: doneWorkshops.length || 0,
      previousStat: 250,
      change: 0,
      changeType: 'increase',
    },
    {
      name: 'Chat clubs agendados',
      stat: scheduledWorkshops.length || 0,
      previousStat: 250,
      change: 0,
      changeType: 'increase',
    },
    {
      name: 'Chat clubs cancelados',
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

  const chatsBySkill =
    doneWorkshops?.reduce(
      (acc, chat) => {
        acc[chat.level] = (acc[chat.level] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const workshopsBySkill = createArrayFromObject(chatsBySkill);
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

  interface ChatWithAttendance extends Chat {
    scholar_attendance?: { attendance: string }[];
  }

  const workshopsWithHighAttendancePerMonth: Record<string, number> =
    doneWorkshops?.reduce(
      (acc, workshop) => {
        const month = new Date(workshop.start_dates[0]).getMonth();
        const attendance = (workshop as ChatWithAttendance).scholar_attendance?.filter(
          (a: { attendance: string }) => a.attendance === 'ATTENDED'
        )?.length;
        if (attendance && attendance > 8) acc[month.toString()] = (acc[month.toString()] || 0) + 1;
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
    name: 'Chats clubs con alta asistencia',
    color: '#eab308',
    type: 'line',
  };
  const barSeries = {
    data: chartData,
    name: 'Chats clubs realizadas',
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
          tableData={chatSDataForTable}
          tableColumns={ChatColumns}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
