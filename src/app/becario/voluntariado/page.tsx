import { DonutChartComponent } from '@/components/charts';
import DateSelector from '@/components/commons/datePicker';
import Stats from '@/components/scholar/ScholarStats';
import Table from '@/components/table/Table';
import scholarVolunteerAttendanceColumns from '@/components/table/columns/scholar/activityAttendance/volunteer/columns';
import createScholarVolunteerAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/volunteer/formater';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getVolunteersByScholar } from '@/lib/db/utils/Workshops';
import {
  countVolunteerProperties,
  formatCountsForCharts,
  getApprovedAndAttendedVolunteers,
} from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { getServerSession } from 'next-auth';

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const session = await getServerSession(authOptions);
  const volunteerDbList = await getVolunteersByScholar(session?.scholarId!);
  const { externalVolunteerHours, internalVolunteerHours, totalVolunteerHours } =
    await getApprovedAndAttendedVolunteers(volunteerDbList);
  const volunteers = await filterActivitiesBySearchParams(volunteerDbList, searchParams);
  const volunteerPropertiesCount = await countVolunteerProperties(volunteers);
  const volunteerDataForCharts = await formatCountsForCharts(volunteerPropertiesCount);
  const volunteerDataForTable = createScholarVolunteerAttendanceForTable(volunteers);
  return (
    <div className="min-h-screen">
      <DateSelector />
      <div className="flex flex-col px-2 pt-6 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Registro de actividades de voluntariado
          </h1>
          <div className="h-full max-w-7xl flex flex-col gap-4 pt-4"></div>
        </div>
      </div>
      <div className="h-full w-full flex flex-col gap-4">
        <Stats
          kindOfActivity="volunteer"
          activitiesDone={totalVolunteerHours}
          first={internalVolunteerHours}
          second={externalVolunteerHours}
        />
        {volunteerDbList && volunteerDbList.length >= 1 && (
          <div className="w-full grid md:grid-cols-5  justify-center items-center">
            <div />
            <div>
              <DonutChartComponent
                data={volunteerDataForCharts.asociatedProject}
                chartTitle="Distribucion por proyecto"
              />
            </div>
            <div>
              <DonutChartComponent
                data={volunteerDataForCharts.kindOfVolunteer}
                chartTitle="Distribucion por tipo"
              />
            </div>
            <DonutChartComponent
              data={volunteerDataForCharts.modality}
              chartTitle="Distribucion por modalidad"
            />
          </div>
        )}
        <Table
          tableData={volunteerDataForTable}
          tableColumns={scholarVolunteerAttendanceColumns}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
