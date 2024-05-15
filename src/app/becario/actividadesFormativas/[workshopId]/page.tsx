import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ScholarActivitySatisfactionSurvey from '@/components/ScholarActivitySatisfactionSurvey';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import CeaseSpotButtonProps from '@/components/ceaseSpot/ceaseSpotButton';
import Table from '@/components/table/Table';
import ScholarAttendanceInfoNoPriv from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/columns';
import {
  IWorkshopAttendance,
  formatScholarDataForScholarAttendanceInfoNoPrivTable,
} from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/formater';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { getWorkshop } from '@/lib/db/utils/Workshops';
import { getNotEnrolledScholarsInWorkshop } from '@/lib/db/utils/users';
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
  const scholarsAttendance = workshop?.scholar_attendance;
  const scholars = scholarsAttendance.map((a) => a.scholar.scholar);
  const attendance = scholarsAttendance.find(
    (a) => a.scholar.scholar.id === se?.scholarId
  ) as IWorkshopAttendance;
  const scholarAttendanceDataForTable = await formatScholarDataForScholarAttendanceInfoNoPrivTable(
    scholars,
    scholarsAttendance
  );
  const scholarAttendance = attendance ? attendance.attendance : undefined;
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <ActivityPanelInfo activity={workshop as WorkshopWithSpeaker}>
        <div className="w-full flex-col flex gap-4  items-center lg:items-end">
          <div className="flex gap-3 items-center">
            <h3 className=" leading-none tracking-tight text-primary-light font-semibold">
              Estatus de asistencia
            </h3>
            <div className="text-lg leading-none tracking-tight text-primary-light font-normal">
              <ScholarAttendanceWidget value={scholarAttendance} />
            </div>
          </div>
          <div className="flex gap-4">
            {scholarAttendance === 'ENROLLED' && (
              <CeaseSpotButtonProps
                scholarWhoCeaseAttendance={attendance}
                kindOfActivity="workshop"
                activity={workshop}
                scholarsToCeaseSpot={notEnrolledScholars}
              />
            )}
            {scholarAttendance === 'ATTENDED' && (
              <ScholarActivitySatisfactionSurvey
                attendanceId={attendance?.id}
                satisfactionFormFilled={attendance?.satisfaction_form_filled}
                workshopStatus={workshop.activity_status}
                kindOfActivity="workshop"
              />
            )}
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
