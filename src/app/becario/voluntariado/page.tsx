import DateSelector from '@/components/commons/datePicker';
import Stats from '@/components/scholar/ScholarStats';
import Table from '@/components/table/Table';
import VolunteerColumns from '@/components/table/columns/volunteerColumns';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { VolunteerWithAllData } from '@/lib/db/types';
import { getVolunteersByScholar } from '@/lib/db/utils/volunteer';
import { getApprovedAndAttendedVolunteers } from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { parseKindOfVolunteerFromDatabase, parseModalityFromDatabase } from '@/lib/utils2';
import { getServerSession } from 'next-auth';

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const session = await getServerSession(authOptions);
  const volunteerDbList = await getVolunteersByScholar(session?.scholarId!);
  const { externalVolunteerHours, internalVolunteerHours, totalVolunteerHours } =
    getApprovedAndAttendedVolunteers(volunteerDbList);
  const volunteers = filterActivitiesBySearchParams(
    volunteerDbList,
    searchParams
  ) as VolunteerWithAllData[];

  const volunteerDataForTable = volunteers.map((volunteer) => {
    const volunteerAttendance = volunteer.volunteer_attendance[0];
    return {
      id: volunteer.id,
      title: volunteer.title,
      endDate: new Date(volunteer.end_dates[0]).toISOString(),
      startDate: new Date(volunteer.start_dates[0]).toISOString(),
      endHour: volunteer.end_dates,
      status: volunteer.status,
      modality: parseModalityFromDatabase(volunteer.modality),
      platform: volunteer.platform,
      attendance: volunteerAttendance.attendance,
      kindOfVolunteer: parseKindOfVolunteerFromDatabase(volunteer.kind_of_volunteer),
      attendedHours: volunteerAttendance.asigned_hours,
    };
  });
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
          <></>
          // <div className="w-full grid md:grid-cols-5  justify-center items-center">
          //   <div className="md:col-start-2">
          //     <h3 className="truncate font-semibold text-center text-sm">
          //       Distribución por competencia
          //     </h3>
          //     <PieChartComponent data={skills} />
          //   </div>
          //   <div>
          //     <h3 className="truncate font-semibold text-center text-sm">Distribución por tipo</h3>
          //     <PieChartComponent data={kinds} />
          //   </div>
          //   <div>
          //     <h3 className="truncate font-semibold text-center text-sm">Distribución por año</h3>
          //     <PieChartComponent data={years} />
          //   </div>
          // </div>
        )}
        <Table
          tableData={volunteerDataForTable}
          tableColumns={VolunteerColumns}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
