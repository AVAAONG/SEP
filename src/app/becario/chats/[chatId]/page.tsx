import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarActions from '@/components/ActivityScholarActions';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import ScholarActivityAttendanceForScholarTemp from '@/components/table/columns/scholatActivityAttendanceForScholarTemp';
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

  const attendance = chat?.scholar_attendance.find((a) => a.scholar.scholar.id === se?.scholarId);
  const scholars = await getNotEnrolledScholarsInChat(chatId);

  const isDisabled = () => {
    if (attendance?.attendance! !== 'ENROLLED') return true;
    else if (new Date(chat?.start_dates![0]!) >= new Date()) return true;
    else if (chat?.activity_status !== 'SENT') return true;
    else return false;
  };

  const scholarAttendanceDataForTable = formatScholarDataForAttendanceTable(
    chat?.scholar_attendance ? chat.scholar_attendance.map((a) => a.scholar.scholar) : [],
    chat?.scholar_attendance ? chat.scholar_attendance : []
  );

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
                <ScholarAttendanceWidget value={attendance?.attendance!} />
              </div>
            </div>
            <ActivityScholarActions
              activityId={chatId}
              attendanceId={attendance?.id!}
              kindOfActivity="chat"
              scholars={scholars}
              isButtonDisabled={isDisabled()}
              scholarWhoCeaseName={se?.user?.name!}
              activityName={chat?.title || ''}
              date={chat?.start_dates[0].toISOString() || ''}
              startDate={chat?.start_dates[0].toISOString() || ''}
              endDate={chat?.end_dates[0].toISOString() || ''}
              modality={chat?.modality || ''}
              platform={chat?.platform || ''}
            />
          </div>
        )}
      </ActivityPanelInfo>
      <section className="w-full space-y-3">
        <h2 className="px-8 text-2xl leading-none tracking-tight text-primary-light font-semibold">
          Becarios inscritos
        </h2>
        <div className="flex flex-row items-center space-x-2">
          <div className="overflow-x-scroll md:overflow-x-clip rounded-lg w-full">
            <Table
              tableColumns={
                chat?.speaker[0].id === se?.scholarId
                  ? ScholarActivityAttendance
                  : ScholarActivityAttendanceForScholarTemp
              }
              tableData={scholarAttendanceDataForTable}
              tableHeadersForSearch={[]}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
