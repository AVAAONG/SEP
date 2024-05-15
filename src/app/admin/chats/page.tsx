import ActivityByScheduleChart from '@/components/activityByScheduleChart';
import AdminStats from '@/components/admin/AdminStats';
import { DonutChartComponent, MixedAreaChartComponent } from '@/components/charts';
import DateSelector from '@/components/commons/datePicker';
import Table from '@/components/table/Table';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import AdminChatColumns from '@/components/table/columns/scholars/activities/chats/columns';
import createAdminChatsObjectForTable from '@/components/table/columns/scholars/activities/chats/formater';
import { getChats } from '@/lib/db/utils/chats';
import {
  categorizeActivityByStatus,
  countChatProperties,
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
  const rawChats = await getChats();
  const chats = (await filterActivitiesBySearchParams(
    rawChats,
    searchParams
  )) as ChatsWithAllData[];
  const chatObjectForTable = createAdminChatsObjectForTable(chats);
  const activitiesByStatus = await categorizeActivityByStatus(chats);

  const chatPropertiesCounts = await countChatProperties(
    activitiesByStatus.ATTENDANCE_CHECKED as ChatsWithAllData[]
  );
  const chatPropertiesFormatedForCharts = await formatCountsForCharts(chatPropertiesCounts);
  const stats = await createAdminStatsForActivities(activitiesByStatus, chats.length, 'chat');

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
          data={chatPropertiesFormatedForCharts.level}
          chartTitle="Distribución por nivel"
        />
        <DonutChartComponent
          data={chatPropertiesFormatedForCharts.modality}
          chartTitle="Distribución por modalidad"
        />
        <ActivityByScheduleChart activities={activitiesByStatus.ATTENDANCE_CHECKED} />
      </div>
      <div className="w-full ">
        <Table
          tableData={chatObjectForTable}
          tableColumns={AdminChatColumns}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
