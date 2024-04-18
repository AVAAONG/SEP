import { DonutChartComponent } from '@/components/charts';
import DateSelector from '@/components/commons/datePicker';
import Table from '@/components/table/Table';
import AdminVolunteerActivityColumns from '@/components/table/columns/scholars/activities/volunteer/columns';
import createAdminVolunteerActivitiesForTable from '@/components/table/columns/scholars/activities/volunteer/formater';
import adminVolunteerActivitiesSearchOptions from '@/components/table/columns/scholars/activities/volunteer/searchOptions';
import { VolunteerWithAllData } from '@/lib/db/types';
import { getVolunteers } from '@/lib/db/utils/volunteer';
import { countVolunteerProperties, formatCountsForCharts } from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const volunteerDbList = await getVolunteers();
  const volunteers = (await filterActivitiesBySearchParams(
    volunteerDbList,
    searchParams
  )) as VolunteerWithAllData[];
  const volunteerPropertiesCount = await countVolunteerProperties(volunteers);
  const volunteerDataForCharts = await formatCountsForCharts(volunteerPropertiesCount);
  const volunteerDataForTable = createAdminVolunteerActivitiesForTable(volunteers);
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
        {volunteerDbList && volunteerDbList.length >= 1 && (
          <div className="w-full grid md:grid-cols-5  justify-center items-center">
            <div></div>
            <DonutChartComponent
              data={volunteerDataForCharts.asociatedProject}
              chartTitle="Distribucion por proyecto"
            />
            <DonutChartComponent
              data={volunteerDataForCharts.kindOfVolunteer}
              chartTitle="Distribucion por tipo"
            />

            <DonutChartComponent
              data={volunteerDataForCharts.modality}
              chartTitle="Distribucion por modalidad"
            />
          </div>
        )}
        <Table
          tableData={volunteerDataForTable}
          tableColumns={AdminVolunteerActivityColumns}
          tableHeadersForSearch={adminVolunteerActivitiesSearchOptions}
        />
      </div>
    </div>
  );
};

export default page;
