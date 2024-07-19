import { DonutChartComponent } from '@/components/charts';
import DateSelector from '@/components/commons/datePicker';
import DatePickerByEvaluationPeriod from '@/components/commons/datePicker/DatePickerByEvaluationBlock';
import Stats from '@/components/scholar/ScholarStats';
import Table from '@/components/table/Table';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import scholarChatAttendaceColumns from '@/components/table/columns/scholar/activityAttendance/chats/columns';
import createScholarChatAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/chats/formater';
import scholarChatAttendanceSearchOptions from '@/components/table/columns/scholar/activityAttendance/chats/searchOptions';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getChatsByScholar } from '@/lib/db/utils/Workshops';
import {
  countActivityByModality,
  countChatProperties,
  formatCountsForCharts,
} from '@/lib/utils/activityFilters';
import { filterActivitiesBySearchParamsPeriod } from '@/lib/utils/datePickerFilters';
import { getAttendedChats } from '@/lib/utils/getAttendedActivities';
import { getServerSession } from 'next-auth';

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const chatDbList = await getChatsByScholar(session.scholarId);
  const chats = (await filterActivitiesBySearchParamsPeriod(
    chatDbList,
    searchParams
  )) as ChatsWithAllData[];
  const attendedChat = getAttendedChats(chats, session.scholarId);
  const { inPersonActivities, onlineActivities } = await countActivityByModality(attendedChat);
  const { level, modality } = await countChatProperties(attendedChat);
  const objectsFormatedForCharts = await formatCountsForCharts({ level, modality });
  const chatObjectForTable = createScholarChatAttendanceForTable(chats, session.scholarId);

  return (
    <div className="flex flex-col gap-1">
      <DatePickerByEvaluationPeriod />
      <h1 className="text-xl font-medium sm:text-2xl mb-3 ">Registro de chat clubs de inglés</h1>
      <div className="h-full w-full flex flex-col gap-4">
        <Stats
          kindOfActivity="chat"
          activitiesDone={attendedChat?.length}
          first={inPersonActivities}
          second={onlineActivities}
        />
        {chats && chats.length >= 1 && (
          <div className="w-full grid md:grid-cols-5  justify-center items-center">
            <div></div>
            <DonutChartComponent
              data={objectsFormatedForCharts.level}
              chartTitle="Distribución por nivel"
            />
            <div></div>
            <DonutChartComponent
              data={objectsFormatedForCharts.modality}
              chartTitle="Distribución por modalidad"
            />
          </div>
        )}
        <Table
          tableColumns={scholarChatAttendaceColumns}
          tableData={chatObjectForTable}
          tableHeadersForSearch={scholarChatAttendanceSearchOptions}
        />
      </div>
    </div>
  );
};

export default page;
