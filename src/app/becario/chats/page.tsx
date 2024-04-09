import { PieChartComponent } from '@/components/charts';
import DateSelector from '@/components/commons/datePicker';
import Stats from '@/components/scholar/ScholarStats';
import Table from '@/components/table/Table';
import scholarChatAttendaceColumns from '@/components/table/columns/scholarChatAttendance';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getChatsByScholar } from '@/lib/db/utils/Workshops';
import {
  countActivityByModality,
  countChatProperties,
  formatCountsForCharts,
} from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { getAttendedChats } from '@/lib/utils/getAttendedActivities';
import { createScholarChatAttendanceObject } from '@/lib/utils/parseDataForTable';
import { ActivityStatus, KindOfSpeaker, Level } from '@prisma/client';
import { getServerSession } from 'next-auth';

export interface IScholarChatColumns {
  id: string;
  title: string;
  platform: string;
  start_dates: Date[];
  end_dates: Date[];
  modality: string;
  level: Level;
  attendance: string;
  activity_status: ActivityStatus;
  speakerNames: string[];
  speakerImages: (string | undefined)[];
  speakerIds: (string | null)[];
  speakerCompany: (string | null)[];
  speakerKind: (KindOfSpeaker | null)[];
}

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const chatDbList = await getChatsByScholar(session.scholarId);
  const chats = await filterActivitiesBySearchParams(chatDbList, searchParams);
  const attendedChat = getAttendedChats(chats, session.scholarId);
  const { inPersonActivities, onlineActivities } = await countActivityByModality(attendedChat);
  const { level, modality } = await countChatProperties(attendedChat);
  const objectsFormatedForCharts = await formatCountsForCharts({ level, modality });

  const chatObjectForTable = createScholarChatAttendanceObject(chats);

  return (
    <div className="flex flex-col gap-1">
      <DateSelector />
      <h1 className="text-xl font-medium sm:text-2xl mb-3 ">Registro de chat clubs de inglés</h1>
      <div className="h-full w-full flex flex-col gap-4">
        <Stats
          kindOfActivity="chat"
          activitiesDone={attendedChat?.length}
          first={inPersonActivities}
          second={onlineActivities}
        />
        {chats && chats.length >= 1 && (
          <div className="w-full grid md:grid-cols-4  justify-center items-center">
            <div className="md:col-start-2">
              <h3 className="truncate font-semibold text-center text-sm">Distribución por nivel</h3>
              <PieChartComponent data={objectsFormatedForCharts.level} />
            </div>
            <div>
              <h3 className="truncate font-semibold text-center text-sm">
                Distribución por modalidad
              </h3>
              <PieChartComponent data={objectsFormatedForCharts.modality} />
            </div>
          </div>
        )}
        <Table
          tableColumns={scholarChatAttendaceColumns}
          tableData={chatObjectForTable || []}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
