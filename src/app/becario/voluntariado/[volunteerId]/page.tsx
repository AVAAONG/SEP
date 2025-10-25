import Table from '@/components/table/Table';
import ScholarAttendanceInfoNoPriv from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/columns';
import {
  IVolunteerAttendance,
  formatScholarDataForScholarAttendanceInfoNoPrivTable,
} from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/formater';
import { VolunteerBaseLayoutHeader } from '@/components/volunteerLayout/VolunteerBaseLayoutHeader';
import { VolunteerDetails } from '@/components/volunteerLayout/VolunteerDetails';
import { VolunteerSidebar } from '@/components/volunteerLayout/VolunteerSidebar';
import { VolunteerWithDetails } from '@/components/volunteerLayout/types';
import { getEnrolledScholarsCount } from '@/lib/activities/utils';
import { getBlobFile } from '@/lib/azure/azure';
import { getVolunteer } from '@/lib/db/utils/Workshops';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { volunteerId: shortUUID.SUUID | undefined | null } }) => {
  const volunteerId = params.volunteerId;

  if (!volunteerId) return null;
  const volunteer = await getVolunteer(volunteerId);
  if (!volunteer) return notFound();

  const volunteerDetails = volunteer as VolunteerWithDetails;

  const proofUrl = volunteerDetails.proof ? await getBlobFile(volunteerDetails.proof) : null;
  const scholars = volunteerDetails.volunteer_attendance.map((attendance) => attendance.scholar.scholar);
  const volunteerAttendance = volunteerDetails.volunteer_attendance as IVolunteerAttendance[];

  const scholarAttendanceDataForTable = await formatScholarDataForScholarAttendanceInfoNoPrivTable(
    scholars,
    volunteerAttendance
  );
  return (
    <div className="container mx-auto">
      <div className="space-y-10">
        <VolunteerBaseLayoutHeader volunteer={volunteerDetails} />
        <div className="grid md:grid-cols-3 gap-10">
          <VolunteerDetails volunteer={volunteerDetails} proofUrl={proofUrl} />
          <VolunteerSidebar volunteer={volunteerDetails} />
        </div>
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-600">Becarios inscritos</h2>
            <span className="text-sm text-muted-foreground">
              {getEnrolledScholarsCount(volunteerDetails)} becarios
            </span>
          </div>
          <Table
            tableColumns={ScholarAttendanceInfoNoPriv}
            tableData={scholarAttendanceDataForTable}
            tableHeadersForSearch={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
