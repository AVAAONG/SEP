import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarActions from '@/components/ActivityScholarActions';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import ScholarActivityAttendanceForScholarTemp from '@/components/table/columns/scholatActivityAttendanceForScholarTemp';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { ChatWithSpeaker } from '@/lib/db/types';
import { getChatWithSpecificScholarAttendance } from '@/lib/db/utils/Workshops';
import { getChat } from '@/lib/db/utils/chats';
import { getNotEnrolledScholarsInChat } from '@/lib/db/utils/users';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import { getServerSession } from 'next-auth';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { chatId: shortUUID.SUUID } }) => {
  const se = await getServerSession(authOptions);
  const chatId = params.chatId || ('null' as shortUUID.SUUID);
  const attendance = await getChatWithSpecificScholarAttendance(chatId, se?.scholarId);
  const scholars = await getNotEnrolledScholarsInChat(chatId);
  const { chat } = attendance || {};
  const chatForSpeaker = await getChat(chatId);
  const isDisabled = () => {
    if (attendance?.attendance! !== 'ENROLLED') return true;
    else if (new Date(chat?.start_dates![0]!) <= new Date()) return true;
    else if (chat?.activity_status === 'SENT') return true;
    else if (chat?.activity_status === 'SUSPENDED') return true;
    else return false;
  };

  const scholarAttendanceDataForTable = formatScholarDataForAttendanceTable(
    chatForSpeaker?.scholar_attendance
      ? chatForSpeaker.scholar_attendance.map((a) => a.scholar.scholar)
      : [],
    chatForSpeaker?.scholar_attendance ? chatForSpeaker.scholar_attendance : []
  );

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <ActivityPanelInfo activity={chatForSpeaker as ChatWithSpeaker}>
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
              activityName={chatForSpeaker?.title || ''}
              date={chatForSpeaker?.start_dates[0] || ''}
              startDate={chatForSpeaker?.start_dates[0] || ''}
              endDate={chatForSpeaker?.end_dates[0] || ''}
              modality={chatForSpeaker?.modality || ''}
              platform={chatForSpeaker?.platform || ''}
            />
          </div>
        )}
      </ActivityPanelInfo>
      {chat?.speaker[0].id === se?.scholarId ? (
        <section className="w-full space-y-3">
          <h2 className="px-8 text-2xl leading-none tracking-tight text-primary-light font-semibold">
            Becarios
          </h2>
          <div className="flex flex-row items-center space-x-2">
            <div className="overflow-x-scroll md:overflow-x-clip rounded-lg w-full">
              <Table
                tableColumns={ScholarActivityAttendance}
                tableData={scholarAttendanceDataForTable}
                tableHeadersForSearch={[]}
              >
                {/* <ExportButton
                  activityTitle={chat.title!}
                  competenceOrLevel={parseChatLevelFromDatabase(chat.level!)}
                  date={chat.start_dates ? new Date(chat.start_dates[0]).toLocaleDateString('ez-VE') : ''}
                  hour={
                    chat.start_dates
                      ? new Date(chat.start_dates[0]).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                      : ''
                  }
                  modality={parseModalityFromDatabase(chat.modality as Modality)}
                  platform={chat.platform!}
                  speakerName={
                    chat.speaker![0].first_names.split(' ')[0] + ' ' + chat.speaker![0].last_names.split(' ')[0]
                  }
                  attendeesData={scholarDataToExport}
                /> */}
              </Table>
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full space-y-3">
          <h2 className="px-8 text-2xl leading-none tracking-tight text-primary-light font-semibold">
            Becarios inscritos
          </h2>
          <div className="flex flex-row items-center space-x-2">
            <div className="overflow-x-scroll md:overflow-x-clip rounded-lg w-full">
              <Table
                tableColumns={ScholarActivityAttendanceForScholarTemp}
                tableData={scholarAttendanceDataForTable}
                tableHeadersForSearch={[]}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default page;
