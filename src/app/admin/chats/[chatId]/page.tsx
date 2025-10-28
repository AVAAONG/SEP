import AddScholarToActivity from '@/components/AddScholarToActivity';
import AdminActivityActions from '@/components/AdminActivityActions';
import QuitScholarFromActivity from '@/components/QuitScholarFromActivity';
import { ActivityBaseLayoutHeader } from '@/components/activitiesLayout/ActivityBaseLayoutHeader';
import { ActivityDetails } from '@/components/activitiesLayout/ActivityDetails';
import { ActivitySidebar } from '@/components/activitiesLayout/ActivitySidebar';
import ScholarAttendanceStatusCount from '@/components/activitiesLayout/ScholarAttendanceStatusCount';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import { getScholarEmailsByAttendanceStatus } from '@/lib/activities/utils';
import { getBlobImage } from '@/lib/azure/azure';
import { getChat } from '@/lib/db/utils/chats';
import { getNotEnrolledScholarsInChat } from '@/lib/db/utils/users';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import ExportButton from '@/lib/temp';
import { parseChatLevelFromDatabase, parseModalityFromDatabase } from '@/lib/utils2';
import { Gender, Modality, Prisma, ScholarAttendance } from '@prisma/client';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';

const chatInclude = {
  speaker: true,
  scholar_attendance: {
    include: {
      ChatSafisfactionForm: true,
      scholar: {
        include: {
          scholar: true,
        },
      },
    },
  },
} satisfies Prisma.ChatInclude;

type ChatWithDetails = Prisma.ChatGetPayload<{
  include: typeof chatInclude;
}>;

export interface IScholarForAttendanceTable extends Record<string, unknown> {
  id: string;
  name: string;
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
  if (!chat) return notFound();

  const activity = chat as ChatWithDetails;

  const scholars = await getNotEnrolledScholarsInChat(chatId);

  const { title, level, start_dates, modality, speaker, platform, scholar_attendance } = activity;

  if (speaker && speaker.length > 0) {
    await Promise.all(
      speaker.map(async (currentSpeaker, index) => {
        const image = await getBlobImage(currentSpeaker.image);
        speaker[index].image = image;
      })
    );
  }

  const attendanceList = scholar_attendance ?? [];

  const scholarAttendanceDataForTable = (await formatScholarDataForAttendanceTable(
    attendanceList.map((attendance) => attendance.scholar.scholar),
    attendanceList
  )) as IScholarForAttendanceTable[];

  const enrolledScholars = attendanceList.map((attendance) => attendance.scholar.scholar);

  const scholarDataToExport = scholarAttendanceDataForTable
    .filter((scholar) => scholar.attendance === 'ENROLLED')
    .map((scholar) => {
      return {
        names: scholar.name,
        dni: scholar.dni,
      };
    });

  const { attendedScholarEmails, enrolledScholarEmails } =
    getScholarEmailsByAttendanceStatus(attendanceList);

  const defaultForm = {
    activity_organization: 0,
    activity_number_of_participants: 0,
    activity_lenght: 0,
    activity_relevance_for_scholar: 0,
    speaker_theory_practice_mix: 0,
    speaker_knowledge_of_activity: 0,
    speaker_foment_scholar_to_participate: 0,
    speaker_knowledge_transmition: 0,
    content_match_necesities: 0,
    content_knowledge_adquisition: 0,
    content_knowledge_expansion: 0,
    content_personal_development: 0,
    general_satisfaction: 0,
  };

  const formResponses = attendanceList
    .filter((scholar) => scholar.attendance === 'ATTENDED')
    .map((attendance) => {
      const form = attendance.ChatSafisfactionForm;
      return {
        ...defaultForm,
        ...form,
      };
    });

  const primarySpeaker = speaker?.[0];
  const speakerName = primarySpeaker
    ? `${primarySpeaker.first_names.split(' ')[0]} ${primarySpeaker.last_names.split(' ')[0]}`
    : '';

  return (
    <div className="container mx-auto">
      <div className="space-y-10">
        <ActivityBaseLayoutHeader activity={activity} />
        <div className="grid md:grid-cols-3 gap-10">
          <ActivityDetails activity={activity} />
          <ActivitySidebar activity={activity}>
            <div className="space-y-6">
              <AdminActivityActions
                formResponses={formResponses}
                scholarsEmails={[...attendedScholarEmails, ...enrolledScholarEmails]}
                activity={activity}
              />
            </div>
          </ActivitySidebar>
        </div>
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-600">Becarios inscritos</h2>
          </div>
          <ScholarAttendanceStatusCount attendance={attendanceList} />

          <Table<IScholarForAttendanceTable>
            tableColumns={ScholarActivityAttendance}
            tableData={scholarAttendanceDataForTable}
            tableHeadersForSearch={[]}
          >
            <AddScholarToActivity scholars={scholars} activityId={chatId} kindOfActivity="chat" />
            <QuitScholarFromActivity
              scholars={enrolledScholars}
              activityId={chatId}
              kindOfActivity="chat"
            />
            <ExportButton
              activityTitle={title ?? ''}
              competenceOrLevel={level ? parseChatLevelFromDatabase(level) : ''}
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
              platform={platform ?? ''}
              speakerName={speakerName}
              attendeesData={scholarDataToExport}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default page;
