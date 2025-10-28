import AddScholarToActivity from '@/components/AddScholarToActivity';
import QuitScholarFromActivity from '@/components/QuitScholarFromActivity';
import ScholarAttendanceStatusCount from '@/components/activitiesLayout/ScholarAttendanceStatusCount';
import DeleteActivityButton from '@/components/activityActions/deleteActivity/DeleteActivityButton';
import ActivityEditFormModal from '@/components/activityActions/editActivity/ActivityEditFormModal';
import VolunteerStatusUpdate from '@/components/activityActions/volunteerStatusUpdate/VolunteerStatusUpdate';
import Table from '@/components/table/Table';
import ScholarVolunteerAttendance, {
  IScholarVolunteerAtendance,
} from '@/components/table/columns/scholarsVolunteerAttendance/columns';
import { formatScholarDataForVolunteerAttendanceTable } from '@/components/table/columns/scholarsVolunteerAttendance/formater';
import { VolunteerBaseLayoutHeader } from '@/components/volunteerLayout/VolunteerBaseLayoutHeader';
import { VolunteerDetails } from '@/components/volunteerLayout/VolunteerDetails';
import { VolunteerSidebar } from '@/components/volunteerLayout/VolunteerSidebar';
import { VolunteerWithDetails } from '@/components/volunteerLayout/types';
import { getBlobFile } from '@/lib/azure/azure';
import { getVolunteer } from '@/lib/db/utils/Workshops';
import { getNotEnrolledScholarsInVolunteer } from '@/lib/db/utils/users';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { volunteerId: shortUUID.SUUID } }) => {
  const volunteerId = params.volunteerId || null;

  if (!volunteerId) return null;
  const volunteer = await getVolunteer(volunteerId);
  if (!volunteer) return notFound();

  const volunteerDetails = volunteer as VolunteerWithDetails;

  const proofUrl = volunteerDetails.proof ? await getBlobFile(volunteerDetails.proof) : null;

  const attendanceList = volunteerDetails.volunteer_attendance;
  const scholars = attendanceList.map((attendance) => attendance.scholar.scholar);

  const scholarAttendanceDataForTable = (await formatScholarDataForVolunteerAttendanceTable(
    scholars,
    attendanceList
  )) as IScholarVolunteerAtendance[];
  const notEnrolledScholars = await getNotEnrolledScholarsInVolunteer(volunteerId);
  const totalHours = scholarAttendanceDataForTable.reduce(
    (acc, scholar) => acc + (scholar.asignedHours || 0),
    0
  );
  const totalAttendants = scholarAttendanceDataForTable.reduce(
    (acc, scholar) => acc + (scholar.attendance === 'ATTENDED' ? 1 : 0),
    0
  );

  return (
    <div className="container mx-auto">
      <div className="space-y-10">
        <VolunteerBaseLayoutHeader volunteer={volunteerDetails} />
        <div className="grid md:grid-cols-3 gap-10">
          <VolunteerDetails volunteer={volunteerDetails} proofUrl={proofUrl} />
          <VolunteerSidebar volunteer={volunteerDetails}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border text-card-foreground shadow-sm overflow-hidden">
                  <div className="flex flex-col space-y-1.5 p-4">
                    <h3 className="text-sm font-semibold whitespace-nowrap leading-none tracking-tight">
                      Horas hombre
                    </h3>
                  </div>
                  <p className="text-3xl font-semibold whitespace-nowrap leading-none tracking-tight px-4 pb-4">
                    {totalHours}
                  </p>
                </div>
                <div className="rounded-lg border text-card-foreground shadow-sm overflow-hidden">
                  <div className="flex flex-col space-y-1.5 p-4">
                    <h3 className="text-sm font-semibold whitespace-nowrap leading-none tracking-tight">
                      Participantes
                    </h3>
                  </div>
                  <p className="text-3xl font-semibold whitespace-nowrap leading-none tracking-tight px-4 pb-4">
                    {totalAttendants}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ActivityEditFormModal activity={volunteerDetails} />
                <VolunteerStatusUpdate volunteerId={volunteerId} />
                <DeleteActivityButton kindOfActivity="volunteer" activityId={volunteerId} />
              </div>
            </div>
          </VolunteerSidebar>
        </div>
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-600">Becarios inscritos</h2>
          </div>
          <ScholarAttendanceStatusCount attendance={attendanceList} />

          <Table<IScholarVolunteerAtendance>
            tableColumns={ScholarVolunteerAttendance}
            tableData={scholarAttendanceDataForTable}
            tableHeadersForSearch={[]}
          >
            <AddScholarToActivity
              scholars={notEnrolledScholars}
              activityId={volunteerId}
              kindOfActivity="volunteer"
            />
            <QuitScholarFromActivity
              scholars={scholars}
              activityId={volunteerId}
              kindOfActivity="volunteer"
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default page;
