import { ActivityBaseLayoutHeader } from '@/components/activitiesLayout/ActivityBaseLayoutHeader';
import { ActivityDetails } from '@/components/activitiesLayout/ActivityDetails';
import { ActivitySidebar } from '@/components/activitiesLayout/ActivitySidebar';
import Table from '@/components/table/Table';
import ScholarAttendanceInfoNoPriv from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/columns';
import { formatScholarDataForScholarAttendanceInfoNoPrivTable } from '@/components/table/columns/scholars/activityAttendanceWithNoPrivilege/formater';
import { getEnrolledScholarsCount } from '@/lib/activities/utils';
import { getWorkshop } from '@/lib/db/utils/Workshops';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { id: shortUUID.SUUID | undefined | null } }) => {
  const workshopId = params.id;

  if (!workshopId) return null;
  const workshop = await getWorkshop(workshopId);
  if (!workshop) return notFound();

  const scholarsAttendance = workshop?.scholar_attendance;

  const scholars = scholarsAttendance.map((a) => a.scholar.scholar);

  const scholarAttendanceDataForTable = await formatScholarDataForScholarAttendanceInfoNoPrivTable(
    scholars,
    scholarsAttendance
  );

  return (
    <div className="container mx-auto">
      <div className="space-y-10">
        <ActivityBaseLayoutHeader activity={workshop} />
        <div className="grid md:grid-cols-3 gap-10">
          <ActivityDetails activity={workshop} />
          {/* Sidebar */}
          <ActivitySidebar activity={workshop} />
        </div>
        {/* Attendees Table */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-emerald-600">Becarios inscritos</h2>
            <span className="text-sm text-muted-foreground">
              {getEnrolledScholarsCount(workshop)} becarios
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
