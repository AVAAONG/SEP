import MonthTab from '@/components/MonthsTab';
import StatsCard from '@/components/StatsCard';
import MixedAreaChart from '@/components/charts/MixedAreaChart';
import Table from '@/components/table/Table';
import WorkshopColumns from '@/components/table/columns/workshopColumns';
import { getWorkshops } from '@/lib/db/utils/Workshops';
import { createArrayFromObject } from '@/lib/utils';
import { Workshop } from '@prisma/client';
import dynamic from 'next/dynamic';

const months = [
  { name: 'Enero', href: 'Enero', current: false },
  { name: 'Febrero', href: 'Febrero', current: false },
  { name: 'Marzo', href: 'Marzo', current: false },
  { name: 'Abril', href: 'Abril', current: false },
  { name: 'Mayo', href: 'Mayo', current: false },
  { name: 'Junio', href: 'Junio', current: true },
  { name: 'Julio', href: 'Julio', current: false },
  { name: 'Agosto', href: 'Agosto', current: false },
  { name: 'Septiembre', href: 'Septiembre', current: false },
  { name: 'Octubre', href: 'Octubre', current: false },
  { name: 'Noviembre', href: 'Noviembre', current: false },
  { name: 'Diciembre', href: 'Diciembre', current: false },
];

const years = [
  { name: '2020', href: 'Enero', current: false },
  { name: '2021', href: 'Febrero', current: false },
  { name: '2022', href: 'Marzo', current: true },
  { name: '2023', href: 'Marzo', current: false },
];

const PieChartComponent = dynamic(() => import('@/components/charts/Pie'), { ssr: false });

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

const page = async () => {
  const workshops = await getWorkshops();
  const suspendedWorkshops = workshops.filter(
    (workshop) => workshop.activity_status === 'SUSPENDED'
  );
  const doneWorkshops = workshops.filter(
    (workshop) => workshop.activity_status === 'ATTENDANCE_CHECKED' && 'DONE'
  );
  const test = doneWorkshops.filter(
    (w) =>
      w.scholar_attendance.filter((a) => a.attendance === 'ATTENDED') &&
      w.scholar_attendance.length > 20
  );

  const workshopsByMonth: Record<number, number> =
    doneWorkshops?.reduce((acc, workshop) => {
      const month = new Date(workshop.start_dates[0]).getMonth();
      const enrolledScholars = workshop.scholar_attendance.filter(
        (attendance) => attendance.attendance === 'ATTENDED'
      );
      if (enrolledScholars.length > 20) {
        acc[month] = (acc[month] || 0) + 1;
      }
      return acc;
    }, {}) || {};

  const d: Record<number, number> =
    doneWorkshops?.reduce((acc, workshop) => {
      const month = new Date(workshop.start_dates[0]).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {}) || {};

  // Add null values for months without workshops
  for (let month = 0; month < 12; month++) {
    if (!(month in workshopsByMonth)) {
      workshopsByMonth[month] = 0;
    }
  }
  const { morning, afternoon } = categorizeWorkshops(test);

  const workshopsBySchil =
    doneWorkshops?.reduce((acc, workshop) => {
      const skill = workshop.asociated_skill;
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {}) || {};

  const workshopsByModality =
    doneWorkshops?.reduce((acc, workshop) => {
      const skill = workshop.modality;
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {}) || {};
  const byModality = createArrayFromObject(workshopsByModality);

  const s = createArrayFromObject(workshopsBySchil);
  console.log(s);

  const chartData = Object.entries(workshopsByMonth).map(([month, count]) => ({
    x: new Date(0, month),
    y: count,
  }));

  const f = Object.entries(d).map(([month, count]) => ({
    x: new Date(0, month),
    y: count,
  }));
  return (
    <div className="w-full flex flex-col gap-6  items-center ">
      <div className="flex flex-col gap-2 items-center">
        <MonthTab month={months} year={years} />
      </div>

      <div className="w-full">
        <StatsCard
          stats={[
            {
              name: 'Total de actividades formativas ofertadas',
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
              name: 'Actividades formativas canceladas',
              stat: suspendedWorkshops.length || 0,
              previousStat: 250,
              change: 0,
              changeType: 'increase',
            },
          ]}
        />
      </div>

      <div className="w-full  rounded-lg bg-white">
        <MixedAreaChart areaSeries={chartData.map((d) => d.y)} barSeries={f.map((y) => y.y)} />
      </div>
      <div className="w-full flex gap-6 justify-center rounded-lg bg-white">
        <div className="w-1/3 ">
          <PieChartComponent data={s} />
        </div>
        <div className="w-1/3 ">
          <PieChartComponent data={byModality} />
        </div>
        <div className="w-1/3 ">
          <PieChartComponent
            data={[
              {
                label: 'Mananas',
                value: morning.length,
              },
              { label: 'Tardes', value: afternoon.length },
            ]}
          />
        </div>
      </div>
      <div className="w-full ">
        <Table tableData={workshops} tableColumns={WorkshopColumns} tableHeadersForSearch={[]} />
      </div>
    </div>
  );
};

export default page;
