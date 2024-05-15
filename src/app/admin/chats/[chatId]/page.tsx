import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarStatusesCount from '@/components/ActivityScholarStatusesCount';
import AddScholarToActivity from '@/components/AddScholarToActivity';
import AdminActivityActions from '@/components/AdminActivityActions';
import QuitScholarFromActivity from '@/components/QuitScholarFromActivity';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import { ChatWithSpeaker } from '@/lib/db/types';
import { getChat } from '@/lib/db/utils/chats';
import { getNotEnrolledScholarsInChat } from '@/lib/db/utils/users';
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

  const { title, level, start_dates, modality, speaker, platform, scholar_attendance } = chat || {};
  const scholars = await getNotEnrolledScholarsInChat(chatId);

  const scholarAttendanceDataForTable = await formatScholarDataForAttendanceTable(
    scholar_attendance ? scholar_attendance.map((a) => a.scholar.scholar) : [],
    scholar_attendance ? scholar_attendance : []
  );

  const scholaras = scholar_attendance?.map((attendance) => attendance.scholar.scholar) || [];

  const scholarDataToExport = scholarAttendanceDataForTable
    .filter((scholar) => scholar.attendance === 'ENROLLED')
    .map((scholar) => {
      return {
        names: scholar.first_names.split(' ')[0] + ' ' + scholar.last_names.split(' ')[0],
        dni: scholar.dni,
      };
    });
  const scholarEmails = scholar_attendance
    ? scholar_attendance.map((attendance) => attendance.scholar.scholar.email)
    : [];

  const formResponses = scholar_attendance
    .filter((scholar) => scholar.attendance === 'ATTENDED')
    .map((attendance) => {
      const form = attendance.satisfaction_form;
      if (!form)
        return {
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
      return {
        activity_organization: form.activity_organization,
        activity_number_of_participants: form.activity_number_of_participants,
        activity_lenght: form.activity_lenght,
        activity_relevance_for_scholar: form.activity_relevance_for_scholar,
        speaker_theory_practice_mix: form.speaker_theory_practice_mix,
        speaker_knowledge_of_activity: form.speaker_knowledge_of_activity,
        speaker_foment_scholar_to_participate: form.speaker_foment_scholar_to_participate,
        speaker_knowledge_transmition: form.speaker_knowledge_transmition,
        content_match_necesities: form.content_match_necesities,
        content_knowledge_adquisition: form.content_knowledge_adquisition,
        content_knowledge_expansion: form.content_knowledge_expansion,
        content_personal_development: form.content_personal_development,
        general_satisfaction: form.general_satisfaction,
      };
    });

  return (
    <div className="space-y-6  min-h-screen">
      <ActivityPanelInfo activity={chat as ChatWithSpeaker}>
        <div className="flex flex-col gap-4">
          <ActivityScholarStatusesCount scholarAttendance={scholar_attendance} />
          <AdminActivityActions
            activityId={chatId}
            kindOfActivity="chat"
            formResponses={formResponses}
            scholarsEmails={scholarEmails}
            activity={chat}
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
              <AddScholarToActivity scholars={scholars} activityId={chatId} kindOfActivity="chat" />
              <QuitScholarFromActivity
                scholars={scholaras}
                activityId={chatId}
                kindOfActivity="chat"
              />
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
