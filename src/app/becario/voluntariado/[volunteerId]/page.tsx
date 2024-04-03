import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarActions from '@/components/ActivityScholarActions';
import ScholarActivitySatisfactionSurvey from '@/components/ScholarActivitySatisfactionSurvey';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import Table from '@/components/table/Table';
import ScholarActivityAttendanceForScholarTemp from '@/components/table/columns/scholatActivityAttendanceForScholarTemp';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { getVolunteer } from '@/lib/db/utils/Workshops';
import { getNotEnrolledScholarsInWorkshop } from '@/lib/db/utils/users';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { volunteerId: shortUUID.SUUID } }) => {
  const se = await getServerSession(authOptions);
  const volunteerId = params.volunteerId || null;

  if (!volunteerId) return null;
  const workshop = await getVolunteer(volunteerId);
  if (!workshop) return notFound();

  const notEnrolledScholars = await getNotEnrolledScholarsInWorkshop(volunteerId);

  let attendance = workshop?.volunteer_attendance.find(
    (a) => a.scholar.scholar.id === se?.scholarId
  );

  const scholarAttendanceDataForTable = formatScholarDataForAttendanceTable(
    workshop?.scholar_attendance ? workshop.scholar_attendance.map((a) => a.scholar.scholar) : [],
    workshop?.scholar_attendance ? workshop.scholar_attendance : []
  );

  const isDisabled = () => {
    if (attendance?.attendance! !== 'ENROLLED') return true;
    else if (new Date(workshop?.start_dates![0]!) <= new Date()) return true;
    else if (workshop?.activity_status !== 'SENT') return true;
    else return false;
  };
  attendance?.satisfaction_form_filled;

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <ActivityPanelInfo activity={workshop as WorkshopWithSpeaker}>
        <div className="w-full flex-col lg:flex-row flex gap-4  items-center justify-end">
          <div className="flex gap-2 items-center justify-center">
            <h3 className=" leading-none tracking-tight text-primary-light font-semibold">
              Estatus de asistencia
            </h3>
            <div className="text-lg leading-none tracking-tight text-primary-light font-normal">
              <ScholarAttendanceWidget value={attendance?.attendance!} />
            </div>
          </div>
          <div className="flex gap-4">
            <ActivityScholarActions
              activityId={volunteerId}
              attendanceId={attendance?.id!}
              kindOfActivity="workshop"
              scholars={notEnrolledScholars}
              isButtonDisabled={isDisabled()}
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
              tableColumns={ScholarActivityAttendanceForScholarTemp}
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
