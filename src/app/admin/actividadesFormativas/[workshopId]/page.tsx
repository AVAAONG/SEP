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
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { workshopId: shortUUID.SUUID } }) => {
  const workshopId = params.workshopId || ('null' as shortUUID.SUUID);
  const workshop = await getWorkshop(workshopId);
  const { title, start_dates, speaker, modality, asociated_skill, platform, scholar_attendance } =
    workshop || {};

  const scholarAttendanceDataForTable = await formatScholarDataForAttendanceTable(
    scholar_attendance ? scholar_attendance.map((a) => a.scholar.scholar) : [],
    scholar_attendance ? scholar_attendance : []
  );

  const attendanceHadBeenPassed = scholar_attendance?.some(
    (attendance) =>
      attendance.attendance === 'ATTENDED' ||
      attendance.attendance === 'NOT_ATTENDED' ||
      attendance.attendance === 'JUSTIFY'
  );
  const scholarDataToExport = scholarAttendanceDataForTable
    .filter((scholar) => scholar.attendance === 'ENROLLED')
    .map((scholar) => {
      return {
        names: scholar.first_names.split(' ')[0] + ' ' + scholar.last_names.split(' ')[0],
        dni: scholar.dni,
      };
    });

  return (
    <div className="space-y-6  min-h-screen">
      <ActivityPanelInfo activity={workshop as WorkshopWithSpeaker}>
        <div className="flex flex-col gap-4">
          <ActivityScholarStatusesCount scholarAttendance={scholar_attendance} />
          <AdminActivityActions
            activityId={workshopId}
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
