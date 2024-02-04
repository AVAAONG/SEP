import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarActions from '@/components/ActivityScholarActions';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { getWorkshopWithSpecificScholarAttendance } from '@/lib/db/utils/Workshops';
import { getNotEnrolledScholarsInWorkshop } from '@/lib/db/utils/users';
import { getServerSession } from 'next-auth';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { workshopId: shortUUID.SUUID } }) => {
  const se = await getServerSession(authOptions);
  const workshopId = params.workshopId || ('null' as shortUUID.SUUID);
  const attendance = await getWorkshopWithSpecificScholarAttendance(workshopId, se?.scholarId);
  const scholars = await getNotEnrolledScholarsInWorkshop(workshopId)
  const { workshop } = attendance || {};
  const isDisabled = () => {
    if (attendance?.attendance! !== 'ENROLLED') return true
    else if (new Date(workshop?.start_dates![0]!) <= new Date()) return true
    else if (workshop?.activity_status !== 'SENT') return true
    else return false
  }

  return (
    <div className="min-h-screen">
      <ActivityPanelInfo activity={workshop as WorkshopWithSpeaker}  >
        <div className='w-full flex  items-center justify-end'>
          Estatus de asistencia = {attendance?.attendance!}
          <ActivityScholarActions activityId={workshopId} attendanceId={attendance?.id!} kindOfActivity='workshop' scholars={scholars} isButtonDisabled={isDisabled()} />
        </div>
      </ActivityPanelInfo>
    </div>
  );
};

export default page;
