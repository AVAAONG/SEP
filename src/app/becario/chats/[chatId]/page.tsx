import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ScholarActivitySatisfactionSurvey from '@/components/ScholarActivitySatisfactionSurvey';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import CeaseSpotButtonProps from '@/components/ceaseSpot/ceaseSpotButton';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import ScholarAttendanceInfoNoPriv from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/columns';
import {
  IChatAttendance,
  formatScholarDataForScholarAttendanceInfoNoPrivTable,
} from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/formater';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { ChatWithSpeaker } from '@/lib/db/types';
import { getChat } from '@/lib/db/utils/chats';
import { getNotEnrolledScholarsInChat } from '@/lib/db/utils/users';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { chatId: shortUUID.SUUID } }) => {
  const se = await getServerSession(authOptions);
  const chatId = params.chatId || null;
  if (!chatId) return null;
  const chat = await getChat(chatId);
  if (!chat) return notFound();

  const notEnrolledScholars = await getNotEnrolledScholarsInChat(chatId);

  const scholarsAttendance = chat?.scholar_attendance;
  const scholars = scholarsAttendance.map((a) => a.scholar.scholar);

  const attendance = scholarsAttendance.find(
    (a) => a.scholar.scholar.id === se?.scholarId
  ) as IChatAttendance;
  const scholarAttendanceDataForTable = await formatScholarDataForScholarAttendanceInfoNoPrivTable(
    scholars,
    scholarsAttendance
  );
  const scholarAttendanceDataForTableAdmin = await formatScholarDataForAttendanceTable(
    chat?.scholar_attendance ? chat.scholar_attendance.map((a) => a.scholar.scholar) : [],
    chat?.scholar_attendance ? chat.scholar_attendance : []
  );

  const isTheSpeaker =
    chat?.speaker?.[0]?.id === se?.scholarId || chat.speaker?.[1]?.id === se?.scholarId;

  const scholarAttendance = isTheSpeaker
    ? 'SPEAKER'
    : attendance
      ? attendance.attendance
      : undefined;

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <ActivityPanelInfo activity={chat as ChatWithSpeaker}>
        {chat?.speaker[0].id === se?.scholarId ? (
          <></>
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
