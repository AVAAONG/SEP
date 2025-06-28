import AddScholarToActivity from '@/components/AddScholarToActivity';
import QuitScholarFromActivity from '@/components/QuitScholarFromActivity';
import { ActivityBaseLayoutHeader } from '@/components/activitiesLayout/ActivityBaseLayoutHeader';
import { ActivityDetails } from '@/components/activitiesLayout/ActivityDetails';
import { ActivitySidebar } from '@/components/activitiesLayout/ActivitySidebar';
import ScholarAttendanceStatusCount from '@/components/activitiesLayout/ScholarAttendanceStatusCount';
import StatusUpdateButton from '@/components/activityActions/StatusUpdate/StatusUpdate';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import ScholarAttendanceInfoNoPriv from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/columns';
import { formatScholarDataForScholarAttendanceInfoNoPrivTable } from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/formater';
import { getServerSession } from '@/lib/auth/authOptions';
import { getChat } from '@/lib/db/utils/chats';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';
import { getNotEnrolledScholarsInChat } from '@/lib/db/utils/users';

const page = async ({ params }: { params: { id: shortUUID.SUUID } }) => {
  const se = await getServerSession();
  const chatId = params.id || null;
  if (!chatId) return null;
  const chat = await getChat(chatId);
  if (!chat) return notFound();

  const scholarsAttendance = chat?.scholar_attendance;
  const scholars = scholarsAttendance.map((a) => a.scholar.scholar);

  const scholarsEnrrolled =
    scholarsAttendance?.map((attendance) => attendance.scholar.scholar) || [];

  const scholarAttendanceDataForTable = await formatScholarDataForScholarAttendanceInfoNoPrivTable(
    scholars,
    scholarsAttendance
  );
  const scholarAttendanceDataForTableAdmin = await formatScholarDataForAttendanceTable(
    chat?.scholar_attendance ? chat.scholar_attendance.map((a) => a.scholar.scholar) : [],
    chat?.scholar_attendance ? chat.scholar_attendance : []
  );

  const isTheSpeaker = chat?.speaker?.[0]?.id === se?.id || chat.speaker?.[1]?.id === se?.id;
  const notEnrolledScholars = await getNotEnrolledScholarsInChat(chatId);
  const scholarEmails = scholarsAttendance
    ? scholarsAttendance.map((attendance) => attendance.scholar.scholar.email)
    : [];

  return (
    <div className="container mx-auto">
      <div className="space-y-10">
        <ActivityBaseLayoutHeader activity={chat} />

        <div className="grid md:grid-cols-3 gap-10">
          <ActivityDetails activity={chat} />
          {/* Sidebar */}
          <ActivitySidebar activity={chat}>
            {isTheSpeaker && (
              <StatusUpdateButton
                kindOfActivity="chat"
                activityForChangeId={chatId}
                scholarsEmails={scholarEmails}
              />
            )}
          </ActivitySidebar>
        </div>
        {/* Attendees Table */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-600">Becarios inscritos</h2>
          </div>
          {isTheSpeaker && <ScholarAttendanceStatusCount attendance={chat.scholar_attendance} />}
          {isTheSpeaker ? (
            <Table
              tableColumns={ScholarActivityAttendance}
              tableData={scholarAttendanceDataForTableAdmin}
              tableHeadersForSearch={[]}
            >
              <AddScholarToActivity scholars={notEnrolledScholars} activityId={chatId} kindOfActivity="chat" />
              <QuitScholarFromActivity
                scholars={scholarsEnrrolled}
                activityId={chatId}
                kindOfActivity="chat"
              />
            </Table>
          ) : (
            <Table
              tableColumns={ScholarAttendanceInfoNoPriv}
              tableData={scholarAttendanceDataForTable}
              tableHeadersForSearch={[]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
