import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarActions from '@/components/ActivityScholarActions';
import ScholarActivitySatisfactionSurvey from '@/components/ScholarActivitySatisfactionSurvey';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import Table from '@/components/table/Table';
import ScholarAttendanceInfoNoPriv from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/columns';
import { formatScholarDataForScholarAttendanceInfoNoPrivTable } from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/formater';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { getWorkshop } from '@/lib/db/utils/Workshops';
import { getNotEnrolledScholarsInWorkshop } from '@/lib/db/utils/users';
import isDisabled from '@/lib/utils/isCancelationDisabled';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { workshopId: shortUUID.SUUID } }) => {
  const se = await getServerSession(authOptions);
  const workshopId = params.workshopId || null;

  if (!workshopId) return null;
  const workshop = await getWorkshop(workshopId);
  if (!workshop) return notFound();

  const notEnrolledScholars = await getNotEnrolledScholarsInWorkshop(workshopId);
  const scholarAttendance = workshop?.scholar_attendance;
  const scholars = scholarAttendance.map((a) => a.scholar.scholar);
  const attendance = scholarAttendance.find((a) => a.scholar.scholar.id === se?.scholarId);

  const scholarAttendanceDataForTable = await formatScholarDataForScholarAttendanceInfoNoPrivTable(
    scholars,
    scholarAttendance
  );

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <ActivityPanelInfo activity={workshop as WorkshopWithSpeaker}>
        <div className="w-full flex-col flex gap-4  items-center lg:items-end">
          <div className="flex gap-3 items-center">
            <h3 className=" leading-none tracking-tight text-primary-light font-semibold">
              Estatus de asistencia
            </h3>
            <div className="text-lg leading-none tracking-tight text-primary-light font-normal">
              <ScholarAttendanceWidget value={attendance?.attendance!} />
            </div>
          </div>
          <div className="flex gap-4">
            <ActivityScholarActions
              activityId={workshopId}
              attendanceId={attendance?.id!}
              kindOfActivity="workshop"
              scholars={notEnrolledScholars}
              isButtonDisabled={isDisabled(
                attendance?.attendance!,
                workshop?.start_dates![0]!.toISOString()!,
                workshop?.activity_status!
              )}
              scholarWhoCeaseName={se?.user?.name!}
              activityName={workshop?.title || ''}
              date={workshop?.start_dates[0].toISOString() || ''}
              startDate={workshop?.start_dates[0].toISOString() || ''}
              endDate={workshop?.end_dates[0].toISOString() || ''}
              modality={workshop?.modality || ''}
              eventId={workshop.calendar_ids[0] || ''}
              platform={workshop?.platform || ''}
            />
            <ScholarActivitySatisfactionSurvey
              attendanceId={attendance?.id}
              satisfactionFormFilled={attendance?.satisfaction_form_filled}
              workshopStatus={workshop.activity_status}
            />
          </div>
        </div>
      </ActivityPanelInfo>
      <section className="w-full space-y-3">
        <h2 className="px-8 text-2xl leading-none tracking-tight text-primary-light font-semibold">
          Becarios inscritos
        </h2>
        <div className="flex flex-row items-center space-x-2">
          <div className="overflow-x-scroll md:overflow-x-clip rounded-lg w-full">
            <Table
              tableColumns={ScholarAttendanceInfoNoPriv}
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
