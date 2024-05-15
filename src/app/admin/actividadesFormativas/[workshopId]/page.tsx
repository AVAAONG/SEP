import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarStatusesCount from '@/components/ActivityScholarStatusesCount';
import AddScholarToActivity from '@/components/AddScholarToActivity';
import AdminActivityActions from '@/components/AdminActivityActions';
import QuitScholarFromActivity from '@/components/QuitScholarFromActivity';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import { getScholarEmailsByAttendanceStatus } from '@/lib/activities/utils';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { getWorkshop } from '@/lib/db/utils/Workshops';
import { getNotEnrolledScholarsInWorkshop } from '@/lib/db/utils/users';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import ExportButton from '@/lib/temp';
import { parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import { Modality } from '@prisma/client';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { workshopId: shortUUID.SUUID } }) => {
  const workshopId = params.workshopId;
  if (!workshopId) return null;
  const workshop = await getWorkshop(workshopId);
  if (!workshop) return notFound();

  const scholars = await getNotEnrolledScholarsInWorkshop(workshopId);

  const { title, start_dates, speaker, modality, asociated_skill, platform, scholar_attendance } =
    workshop || {};

  const scholarAttendanceDataForTable = await formatScholarDataForAttendanceTable(
    scholar_attendance ? scholar_attendance.map((a) => a.scholar.scholar) : [],
    scholar_attendance ? scholar_attendance : []
  );
  const scholarsForQuit = scholar_attendance
    ? scholar_attendance.map((a) => a.scholar.scholar)
    : [];
  const scholarDataToExport = scholarAttendanceDataForTable
    .filter((scholar) => scholar.attendance === 'ENROLLED')
    .map((scholar) => {
      return {
        names: scholar.first_names.split(' ')[0] + ' ' + scholar.last_names.split(' ')[0],
        dni: scholar.dni,
      };
    });

  const {
    attendedScholarEmails,
    enrolledScholarEmails
  } = getScholarEmailsByAttendanceStatus(scholar_attendance)


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
    <div className="space-y-6  min-h-screen">
      <ActivityPanelInfo activity={workshop as WorkshopWithSpeaker}>
        <div className="flex flex-col gap-4">
          <ActivityScholarStatusesCount scholarAttendance={scholar_attendance} />
          <AdminActivityActions
            formResponses={formResponses}
            scholarsEmails={[...attendedScholarEmails,
            ...enrolledScholarEmails]}
            activity={workshop}
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
      </section>
    </div>
  );
};

export default page;
