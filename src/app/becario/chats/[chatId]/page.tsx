import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarStatusesCount from '@/components/ActivityScholarStatusesCount';
import ScholarActivitySatisfactionSurvey from '@/components/ScholarActivitySatisfactionSurvey';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import StatusUpdateButton from '@/components/activityActions/StatusUpdate/StatusUpdate';
import CeaseSpotButtonProps from '@/components/ceaseSpot/ceaseSpotButton';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import ScholarAttendanceInfoNoPriv from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/columns';
import {
  IChatAttendance,
  formatScholarDataForScholarAttendanceInfoNoPrivTable,
} from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/formater';
import { getServerSession } from '@/lib/auth/authOptions';
import { ChatWithSpeaker } from '@/lib/db/types';
import { getChat } from '@/lib/db/utils/chats';
import { getNotEnrolledScholarsInChat } from '@/lib/db/utils/users';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';
const page = async ({ params }: { params: { chatId: shortUUID.SUUID } }) => {
  const se = await getServerSession();
  const chatId = params.chatId || null;
  if (!chatId) return null;
  const chat = await getChat(chatId);
  if (!chat) return notFound();

  const notEnrolledScholars = await getNotEnrolledScholarsInChat(chatId);

  const scholarsAttendance = chat?.scholar_attendance;
  const scholars = scholarsAttendance.map((a) => a.scholar.scholar);

  const attendance = scholarsAttendance.find(
    (a) => a.scholar.scholar.id === se?.id
  ) as IChatAttendance;
  const scholarAttendanceDataForTable = await formatScholarDataForScholarAttendanceInfoNoPrivTable(
    scholars,
    scholarsAttendance
  );
  const scholarAttendanceDataForTableAdmin = await formatScholarDataForAttendanceTable(
    chat?.scholar_attendance ? chat.scholar_attendance.map((a) => a.scholar.scholar) : [],
    chat?.scholar_attendance ? chat.scholar_attendance : []
  );

  const isTheSpeaker = chat?.speaker?.[0]?.id === se?.id || chat.speaker?.[1]?.id === se?.id;

  const scholarAttendance = isTheSpeaker
    ? 'SPEAKER'
    : attendance
      ? attendance.attendance
      : undefined;

  const scholarEmails = scholarsAttendance
    ? scholarsAttendance.map((attendance) => attendance.scholar.scholar.email)
    : [];
  return (
    <div className="min-h-screen flex flex-col gap-4 w-full">
      <ActivityPanelInfo activity={chat as ChatWithSpeaker}>
        {isTheSpeaker ? (
          <div className="flex flex-col gap-4">
            <ActivityScholarStatusesCount scholarAttendance={scholarsAttendance} />
            <StatusUpdateButton
              kindOfActivity="chat"
              activityForChangeId={chatId}
              scholarsEmails={scholarEmails}
            />
          </div>
        ) : (
          <div className="w-full flex gap-4  items-center justify-end">
            <div className="flex gap-2 items-center justify-center">
              <h3 className=" leading-none tracking-tight text-primary-light font-semibold">
                Estatus de asistencia
              </h3>
              <div className="text-lg leading-none tracking-tight text-primary-light font-normal">
                <ScholarAttendanceWidget value={scholarAttendance} />
              </div>
            </div>

            <div className="flex gap-4">
              {scholarAttendance === 'ENROLLED' && (
                <CeaseSpotButtonProps
                  scholarWhoCeaseAttendance={attendance}
                  kindOfActivity="chat"
                  activity={chat}
                  scholarsToCeaseSpot={notEnrolledScholars}
                />
              )}
              {scholarAttendance === 'ATTENDED' && (
                <ScholarActivitySatisfactionSurvey
                  attendanceId={attendance?.id}
                  satisfactionFormFilled={attendance?.satisfaction_form_filled}
                  workshopStatus={chat.activity_status}
                  kindOfActivity="chat"
                />
              )}
            </div>
          </div>
        )}
      </ActivityPanelInfo>
      <section className="w-full space-y-3">
        <h2 className="px-8 text-2xl leading-none tracking-tight text-primary-light font-semibold">
          Becarios inscritos
        </h2>
        <div className="flex flex-row items-center space-x-2">
          <div className="overflow-x-scroll md:overflow-x-clip rounded-lg w-full">
            {isTheSpeaker ? (
              <Table
                tableColumns={ScholarActivityAttendance}
                tableData={scholarAttendanceDataForTableAdmin}
                tableHeadersForSearch={[]}
              />
            ) : (
              <Table
                tableColumns={ScholarAttendanceInfoNoPriv}
                tableData={scholarAttendanceDataForTable}
                tableHeadersForSearch={[]}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
