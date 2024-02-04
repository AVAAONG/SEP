import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarActions from '@/components/ActivityScholarActions';
import Table from '@/components/table/Table';
import ScholarActivityAttendanceForScholarTemp from '@/components/table/columns/scholatActivityAttendanceForScholarTemp';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { getWorkshop, getWorkshopWithSpecificScholarAttendance } from '@/lib/db/utils/Workshops';
import { getNotEnrolledScholarsInWorkshop } from '@/lib/db/utils/users';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import { getServerSession } from 'next-auth';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { workshopId: shortUUID.SUUID } }) => {
  const se = await getServerSession(authOptions);
  const workshopId = params.workshopId || ('null' as shortUUID.SUUID);
  const attendance = await getWorkshopWithSpecificScholarAttendance(workshopId, se?.scholarId);
  const scholars = await getNotEnrolledScholarsInWorkshop(workshopId)
  const { workshop } = attendance || {};
  const chatForSpeaker = await getWorkshop(workshopId);
  const isDisabled = () => {
    if (attendance?.attendance! !== 'ENROLLED') return true
    else if (new Date(workshop?.start_dates![0]!) <= new Date()) return true
    else if (workshop?.activity_status !== 'SENT') return true
    else return false
  }
  const scholarAttendanceDataForTable = formatScholarDataForAttendanceTable(
    chatForSpeaker?.scholar_attendance ? chatForSpeaker.scholar_attendance.map((a) => a.scholar.scholar) : [],
    chatForSpeaker?.scholar_attendance ? chatForSpeaker.scholar_attendance : []
  );


  return (
    <div className="min-h-screen flex flex-col gap-4">
      <ActivityPanelInfo activity={workshop as WorkshopWithSpeaker}  >
        <div className='w-full flex  items-center justify-end'>
          Estatus de asistencia = {attendance?.attendance!}
          <ActivityScholarActions activityId={workshopId} attendanceId={attendance?.id!} kindOfActivity='workshop' scholars={scholars} isButtonDisabled={isDisabled()} />
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
