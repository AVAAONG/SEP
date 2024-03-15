import ActivityByScheduleChart from '@/components/activityByScheduleChart';
import AdminStats from '@/components/admin/AdminStats';
import { MixedAreaChartComponent, PieChartComponent } from '@/components/charts';
import DateSelector from '@/components/commons/datePicker';
import Table from '@/components/table/Table';
import WorkshopColumns from '@/components/table/columns/workshopColumns';
import { getWorkshops } from '@/lib/db/utils/Workshops';
import {
  categorizeActivityByStatus,
  countWorkshopProperties,
  createAdminStatsForWorkshops,
  formatCountsForCharts,
  getActivityAttendancePerMonth,
} from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { createAdminWorkshopsObjectForTable } from '@/lib/utils/parseDataForTable';

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const resultWorkshops = await getWorkshops();
  const workshops = filterActivitiesBySearchParams(resultWorkshops, searchParams);
  const workshopObjectForTable = createAdminWorkshopsObjectForTable(workshops);
  const activitiesByStatus = categorizeActivityByStatus(workshops);

  const workshopPropertiesCounts = countWorkshopProperties(activitiesByStatus.ATTENDANCE_CHECKED);
  const workshopPropertiesFormatedForCharts = formatCountsForCharts(workshopPropertiesCounts);
  const stats = createAdminStatsForWorkshops(activitiesByStatus, workshops.length);

  const { barSeries, lineSeries } = getActivityAttendancePerMonth(
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
        <div className="md:col-start-2">
          <h3 className="truncate font-semibold text-center text-sm">
            Distribución por competencia
          </h3>
          <PieChartComponent data={workshopPropertiesFormatedForCharts.skills} />
        </div>
        <div>
          <h3 className="truncate font-semibold text-center text-sm">Distribución por modalidad</h3>
          <PieChartComponent data={workshopPropertiesFormatedForCharts.modality} />
        </div>
        <div>
          <h3 className="truncate font-semibold text-center text-sm">Distribución por horario</h3>
          <ActivityByScheduleChart activities={activitiesByStatus.ATTENDANCE_CHECKED} />
        </div>
      </div>
      <div className="w-full ">
        <Table
          tableData={workshopObjectForTable}
          tableColumns={WorkshopColumns}
          tableHeadersForSearch={[{ option: 'parsedStatus', label: 'Estatus' }]}
        />
      </div>
    </div>
  );
};

export default page;
