import { PieChartComponent } from '@/components/charts';
import DateSelector from '@/components/commons/datePicker';
import Stats from '@/components/scholar/ScholarStats';
import Table from '@/components/table/Table';
import scholarWorkshopAttendanceColumns from '@/components/table/columns/scholarWorkshopAttendance';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getWorkhsopsByScholar } from '@/lib/db/utils/Workshops';
import {
  countActivityByModality,
  countWorkshopProperties,
  getAttendedActivities,
} from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { createScholarWorkshopAttendanceObject } from '@/lib/utils/parseDataForTable';
import { ActivityStatus, KindOfSpeaker, Modality, Skill, WorkshopYear } from '@prisma/client';
import { getServerSession } from 'next-auth';

export interface IScholarWorkshopColumns {
  id: string;
  title: string;
  platform: string;
  speakerKind: (KindOfSpeaker | null)[];
  start_dates: Date[];
  end_dates: Date[];
  modality: Modality;
  skill: Skill;
  activity_status: ActivityStatus;
  attendance: string;
  year: WorkshopYear[];
  speakerNames: string[];
  speakerImages: (string | undefined)[];
  speakerIds: (string | null)[];
  speakerCompany: (string | null)[];
}

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const workshopsDbList = await getWorkhsopsByScholar(session?.scholarId);
  const workshops = filterActivitiesBySearchParams(workshopsDbList, searchParams);
  const workshopsAttended = getAttendedActivities(workshops);
  const { inPersonActivities, onlineActivities } = countActivityByModality(workshopsAttended);
  const { skills, years, kinds } = countWorkshopProperties(workshopsAttended);
  const workshopObjectForTable = createScholarWorkshopAttendanceObject(workshops);

  return (
    <div className="flex flex-col gap-1">
      <DateSelector />
      <h1 className="text-xl ml-4 font-medium sm:text-2xl mb-3 ">Registro de actividades formativas</h1>
      <div className="h-full w-full flex flex-col gap-4">
        <Stats
          kindOfActivity="workshop"
          activitiesDone={workshopsAttended?.length}
          first={inPersonActivities}
          second={onlineActivities}
        />
        {workshops && workshops.length >= 1 && (
          <div className="w-full grid md:grid-cols-5  justify-center items-center">
            <div className="md:col-start-2">
              <h3 className="truncate font-semibold text-center text-sm">
                Distribución por competencia
              </h3>
              <PieChartComponent data={skills} />
            </div>
            <div>
              <h3 className="truncate font-semibold text-center text-sm">Distribución por tipo</h3>
              <PieChartComponent data={kinds} />
            </div>
            <div>
              <h3 className="truncate font-semibold text-center text-sm">Distribución por año</h3>
              <PieChartComponent data={years} />
            </div>
          </div>
        )}
        <Table
          tableColumns={scholarWorkshopAttendanceColumns}
          tableData={workshopObjectForTable || []}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
