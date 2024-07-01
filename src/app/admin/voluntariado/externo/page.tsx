import DateSelector from '@/components/commons/datePicker';
import Table from '@/components/table/Table';
import ExternalVolunteerAdminColumns from '@/components/table/columns/adminVolunteerColumns';
import { getExternalVolunteer } from '@/lib/db/utils/volunteer';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { parseKindOfVolunteerFromDatabase, parseModalityFromDatabase } from '@/lib/utils2';

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const volunteerData = await getExternalVolunteer();

  const volunteers = await filterActivitiesBySearchParams(volunteerData, searchParams);
  console.log(volunteers)
  const v = volunteers.map((volunteer) => {
    return {
      scholarNames:
        volunteer.volunteer_attendance?.[0]?.scholar.scholar.first_names.split(' ')[0] +
        ' ' +
        volunteer.volunteer_attendance?.[0]?.scholar.scholar.last_names.split(' ')[0],
      id: volunteer.id,
      title: volunteer.title,
      endDate: new Date(volunteer.end_dates[0]).toISOString(),
      startDate: new Date(volunteer.start_dates[0]).toISOString(),
      status: volunteer.status,
      modality: parseModalityFromDatabase(volunteer.modality),
      platform: volunteer.platform,
      kindOfVolunteer: parseKindOfVolunteerFromDatabase(volunteer.kind_of_volunteer),
      asignedHours: volunteer.volunteer_attendance?.[0]?.asigned_hours,
      proof: volunteer.proof,
    };
  });
  return (
    <div className="min-h-screen flex flex-col gap-6  items-center">
      <DateSelector />
      <div className="flex flex-col px-2 pt-6 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Registro de actividades de voluntariado externas
          </h1>
          <div className="h-full max-w-7xl flex flex-col gap-4 pt-4"></div>
        </div>
      </div>
      <div className="w-full">
        <Table
          tableData={v}
          tableColumns={ExternalVolunteerAdminColumns}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
