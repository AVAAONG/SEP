import type { IScholarForAttendanceTable } from '@/app/admin/chats/[chatId]/page';
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
import { getWorkshop } from '@/lib/db/utils/Workshops';
import { getNotEnrolledScholarsInWorkshop } from '@/lib/db/utils/users';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import ExportButton from '@/lib/temp';
import { parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import { Modality, Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';

const workshopInclude = {
  speaker: true,
  scholar_attendance: {
    include: {
      satisfaction_form: true,
      scholar: {
        include: {
          scholar: true,
        },
      },
    },
  },
} satisfies Prisma.WorkshopInclude;

type WorkshopWithDetails = Prisma.WorkshopGetPayload<{
  include: typeof workshopInclude;
}>;

const page = async ({ params }: { params: { workshopId: shortUUID.SUUID } }) => {
  const workshopId = params.workshopId;
  if (!workshopId) return null;
  const workshop = await getWorkshop(workshopId);
  if (!workshop) return notFound();

  const activity = workshop as WorkshopWithDetails;
  const scholars = await getNotEnrolledScholarsInWorkshop(workshopId);

  const { title, start_dates, speaker, modality, asociated_skill, platform, scholar_attendance } =
    activity;

  const scholarAttendanceDataForTable = (await formatScholarDataForAttendanceTable(
    scholar_attendance ? scholar_attendance.map((a) => a.scholar.scholar) : [],
    scholar_attendance ? scholar_attendance : []
  )) as IScholarForAttendanceTable[];

  const scholarsForQuit = scholar_attendance
    ? scholar_attendance.map((a) => a.scholar.scholar)
    : [];

  const scholarDataToExport = scholarAttendanceDataForTable
    .filter((scholar) => scholar.attendance === 'ENROLLED')
    .map((scholar) => {
      return {
        names: scholar.name,
        dni: scholar.dni,
      };
    });

  const { attendedScholarEmails, enrolledScholarEmails } =
    getScholarEmailsByAttendanceStatus(scholar_attendance);

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

  const formResponses = scholar_attendance
    .filter((scholar) => scholar.attendance === 'ATTENDED')
    .map((attendance) => {
      const form = attendance.satisfaction_form;
      return {
        ...defaultForm,
        ...form,
      };
    });

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
          <ScholarAttendanceStatusCount attendance={scholar_attendance} />
          <Table<IScholarForAttendanceTable>
            tableColumns={ScholarActivityAttendance}
            tableData={scholarAttendanceDataForTable}
            tableHeadersForSearch={[]}
          >
            <AddScholarToActivity
              scholars={scholars}
              activityId={workshopId}
              kindOfActivity="workshop"
            />
            <QuitScholarFromActivity
              scholars={scholarsForQuit}
              activityId={workshopId}
              kindOfActivity="workshop"
            />

            <ExportButton
              activityTitle={title!}
              competenceOrLevel={parseSkillFromDatabase(asociated_skill!)}
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
    </div>
  );
};

export default page;
