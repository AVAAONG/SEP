import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarStatusesCount from '@/components/ActivityScholarStatusesCount';
import AdminActivityActions from '@/components/AdminActivityActions';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import { ChatWithSpeaker } from '@/lib/db/types';
import { getChat } from '@/lib/db/utils/chats';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import ExportButton from '@/lib/temp';
import { parseChatLevelFromDatabase, parseModalityFromDatabase } from '@/lib/utils2';
import { Gender, Modality, ScholarAttendance } from '@prisma/client';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';


export interface IScholarForAttendanceTable {
  id: string;
  first_names: string;
  last_names: string;
  email: string | null;
  kindOfActivity: 'workshop' | 'chat';
  phone_number: string | null;
  whatsAppNumber: string | null;
  dni: string;
  gender: Gender;
  attendanceId: string;
  attendance?: ScholarAttendance;
  profilePhoto: string | null;
}

const page = async ({ params }: { params: { chatId: shortUUID.SUUID } }) => {
  const chatId = params.chatId;
  if (!chatId) return null;
  const chat = await getChat(chatId);
  if (!chatId) return notFound();

  const {
    title,
    level,
    start_dates,
    modality,
    speaker,
    platform,
    scholar_attendance,
  } = chat || {};

  const scholarAttendanceDataForTable = await formatScholarDataForAttendanceTable(
    scholar_attendance ? scholar_attendance.map((a) => a.scholar.scholar) : [],
    scholar_attendance ? scholar_attendance : []
  );

  const scholarDataToExport = scholarAttendanceDataForTable.filter((scholar) => scholar.attendance === 'ENROLLED').map((scholar) => {
    return {
      names: scholar.first_names.split(' ')[0] + ' ' + scholar.last_names.split(' ')[0],
      dni: scholar.dni,
    };
  });

  const attendanceHadBeenPassed = scholar_attendance?.some(
    (attendance) =>
      attendance.attendance === 'ATTENDED' ||
      attendance.attendance === 'NOT_ATTENDED' ||
      attendance.attendance === 'JUSTIFY'
  );

  return (
    <div className="space-y-6  min-h-screen">
      <ActivityPanelInfo activity={chat as ChatWithSpeaker}>
        <div className="flex flex-col gap-4">
          <ActivityScholarStatusesCount scholarAttendance={scholar_attendance} />
          <AdminActivityActions
            activityId={chatId}
            kindOfActivity="workshop"
            attendanceHadBeenPassed={attendanceHadBeenPassed}
          />
        </div>
      </ActivityPanelInfo>
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
              <ExportButton
                activityTitle={title!}
                competenceOrLevel={parseChatLevelFromDatabase(level!)}
                date={start_dates ? new Date(start_dates[0]).toLocaleDateString('ez-VE') : ''}
                hour={
                  start_dates
                    ? new Date(start_dates[0]).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })
                    : ''
                }
                modality={parseModalityFromDatabase(modality as Modality)}
                platform={platform!}
                speakerName={
                  speaker![0].first_names.split(' ')[0] + ' ' + speaker![0].last_names.split(' ')[0]
                }
                attendeesData={scholarDataToExport}
              />
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
