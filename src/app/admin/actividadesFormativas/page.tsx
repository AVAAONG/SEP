import ActivityByScheduleChart from '@/components/activityByScheduleChart';
import AdminStats from '@/components/admin/AdminStats';
import { DonutChartComponent, MixedAreaChartComponent } from '@/components/charts';
import DateSelector from '@/components/commons/datePicker';
import Table from '@/components/table/Table';
import WorkshopAdminColumns from '@/components/table/columns/scholars/activities/workshop/columns';
import createAdminWorkshopsObjectForTable from '@/components/table/columns/scholars/activities/workshop/formater';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getWorkshops } from '@/lib/db/utils/Workshops';
import {
  categorizeActivityByStatus,
  countWorkshopProperties,
  createAdminStatsForActivities,
  formatCountsForCharts,
  getActivityAttendancePerMonth,
} from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const resultWorkshops = (await getWorkshops()) as WorkshopWithAllData[];
  const workshops = (await filterActivitiesBySearchParams(
    resultWorkshops,
    searchParams
  )) as WorkshopWithAllData[];
  const workshopObjectForTable = createAdminWorkshopsObjectForTable(workshops);
  const activitiesByStatus = await categorizeActivityByStatus(workshops);

  const workshopPropertiesCounts = await countWorkshopProperties(
    activitiesByStatus.ATTENDANCE_CHECKED as WorkshopWithAllData[]
  );
  const workshopPropertiesFormatedForCharts = await formatCountsForCharts(workshopPropertiesCounts);
  const stats = await createAdminStatsForActivities(
    activitiesByStatus,
    workshops.length,
    'workshop'
  );

  const { barSeries, lineSeries } = await getActivityAttendancePerMonth(
    activitiesByStatus.ATTENDANCE_CHECKED
  );
  return (
    <div className="w-full flex flex-col gap-6  items-center ">
      <DateSelector />
      <div className="w-full">
        <AdminStats stats={stats} />
      </div>
      <div className="w-full  rounded-lg bg-white">
        <MixedAreaChartComponent areaSeries={lineSeries} barSeries={barSeries} />
      </div>
      <div className="w-full grid md:grid-cols-5 justify-center items-center rounded-lg bg-white p-4">
        <div></div>
        <DonutChartComponent
          data={workshopPropertiesFormatedForCharts.skills}
          chartTitle="Distribución por competencia"
        />
        <DonutChartComponent
          data={workshopPropertiesFormatedForCharts.modality}
          chartTitle="Distribución por modalidad"
        />
        <ActivityByScheduleChart activities={activitiesByStatus.ATTENDANCE_CHECKED} />
      </div>
      <div className="w-full ">
        <Table
          tableData={workshopObjectForTable}
          tableColumns={WorkshopAdminColumns}
          tableHeadersForSearch={[{ option: 'parsedStatus', label: 'Estatus' }]}
        />
      </div>
    </div>
  );
};

export default page;
