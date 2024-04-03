import ActivityByScheduleChart from '@/components/activityByScheduleChart';
import AdminStats from '@/components/admin/AdminStats';
import { MixedAreaChartComponent, PieChartComponent } from '@/components/charts';
import DateSelector from '@/components/commons/datePicker';
import Table from '@/components/table/Table';
import ChatColumns from '@/components/table/columns/chatsColumns';
import { getChats } from '@/lib/db/utils/chats';
import {
  categorizeActivityByStatus,
  countChatProperties,
  createAdminStatsForActivities,
  formatCountsForCharts,
  getActivityAttendancePerMonth,
} from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { createAdminChatsObjectForTable } from '@/lib/utils/parseDataForTable';

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const rawChats = await getChats();
  const chats = await filterActivitiesBySearchParams(rawChats, searchParams);
  const chatObjectForTable = createAdminChatsObjectForTable(chats);
  const activitiesByStatus = await categorizeActivityByStatus(chats);

  const chatPropertiesCounts = await countChatProperties(activitiesByStatus.ATTENDANCE_CHECKED);
  const chatPropertiesFormatedForCharts = await formatCountsForCharts(chatPropertiesCounts);
  const stats = await createAdminStatsForActivities(activitiesByStatus, chats.length, 'chat');

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
      <div className="w-full flex h-80 gap-6 justify-center items-center rounded-lg bg-white">
        <div>
          <h3 className="truncate font-semibold text-center text-sm">Distribución por nivel</h3>
          <PieChartComponent data={chatPropertiesFormatedForCharts.level} />
        </div>
        <div>
          <h3 className="truncate font-semibold text-center text-sm">Distribución por modalidad</h3>
          <PieChartComponent data={chatPropertiesFormatedForCharts.modality} />
        </div>
        <div>
          <h3 className="truncate font-semibold text-center text-sm">Distribución por horario</h3>
          <ActivityByScheduleChart activities={activitiesByStatus.ATTENDANCE_CHECKED} />
        </div>
      </div>
      <div className="w-full ">
        <Table
          tableData={chatObjectForTable}
          tableColumns={ChatColumns}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
