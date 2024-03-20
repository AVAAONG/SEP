import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarStatusesCount from '@/components/ActivityScholarStatusesCount';
import AdminActivityActions from '@/components/AdminActivityActions';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { getWorkshop } from '@/lib/db/utils/Workshops';
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

  const { title, start_dates, speaker, modality, asociated_skill, platform, scholar_attendance } =
    workshop || {};

  const scholarAttendanceDataForTable = await formatScholarDataForAttendanceTable(
    scholar_attendance ? scholar_attendance.map((a) => a.scholar.scholar) : [],
    scholar_attendance ? scholar_attendance : []
  );

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

  const formResponses = scholar_attendance.map((attendance) => attendance.satisfaction_form);

  return (
    <div className="space-y-6  min-h-screen">
      <ActivityPanelInfo activity={workshop as WorkshopWithSpeaker}>
        <div className="flex flex-col gap-4">
          <ActivityScholarStatusesCount scholarAttendance={scholar_attendance} />
          <AdminActivityActions
            activityId={workshopId}
            formResponses={[
              {
                activity_organization: 5,
                activity_number_of_participants: 5,
                activity_lenght: 5,
                activity_relevance_for_scholar: 5,
                speaker_theory_practice_mix: 5,
                speaker_knowledge_of_activity: 5,
                speaker_foment_scholar_to_participate: 5,
                speaker_knowledge_transmition: 5,
                content_match_necesities: 4,
                content_knowledge_adquisition: 5,
                content_knowledge_expansion: 5,
                content_personal_development: 5,
                general_satisfaction: 5,
              },
              {
                activity_organization: 3,
                activity_number_of_participants: 1,
                activity_lenght: 2,
                activity_relevance_for_scholar: 2,
                speaker_theory_practice_mix: 2,
                speaker_knowledge_of_activity: 3,
                speaker_foment_scholar_to_participate: 8,
                speaker_knowledge_transmition: 1,
                content_match_necesities: 2,
                content_knowledge_adquisition: 1,
                content_knowledge_expansion: 2,
                content_personal_development: 5,
                general_satisfaction: 3,
              },
              {
                activity_organization: 4,
                activity_number_of_participants: 1,
                activity_lenght: 2,
                activity_relevance_for_scholar: 4,
                speaker_theory_practice_mix: 1,
                speaker_knowledge_of_activity: 2,
                speaker_foment_scholar_to_participate: 8,
                speaker_knowledge_transmition: 1,
                content_match_necesities: 2,
                content_knowledge_adquisition: 1,
                content_knowledge_expansion: 2,
                content_personal_development: 2,
                general_satisfaction: 1,
              },
            ]}
            kindOfActivity="workshop"
            scholarsEmails={scholarEmails}
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
