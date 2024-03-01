import Table from '@/components/table/Table';
import VolunteerColumns from '@/components/table/columns/volunteerColumns';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getVolunteersByScholar } from '@/lib/db/utils/volunteer';
import { parseKindOfVolunteerFromDatabase, parseModalityFromDatabase } from '@/lib/utils2';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);
  const volunteerData = await getVolunteersByScholar(session?.scholarId!);
  const v = volunteerData.map((volunteer) => {
    return {
      id: volunteer.volunteer.id,
      title: volunteer.volunteer.title,
      endDate: new Date(volunteer.volunteer.end_dates[0]).toISOString(),
      startDate: new Date(volunteer.volunteer.start_dates[0]).toISOString(),
      endHour: volunteer.volunteer.end_dates,
      status: volunteer.volunteer.status,
      modality: parseModalityFromDatabase(volunteer.volunteer.modality),
      platform: volunteer.volunteer.platform,
      attendance: volunteer.attendance,
      kindOfVolunteer: parseKindOfVolunteerFromDatabase(volunteer.volunteer.kind_of_volunteer),
      attendedHours: volunteer.asigned_hours,
    };
  });
  return (
    <div className="min-h-screen">
      <div className="flex flex-col px-2 pt-6 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Registro de actividades de voluntariado
          </h1>
          <div className="h-full max-w-7xl flex flex-col gap-4 pt-4"></div>
        </div>
      </div>
      <div className="w-full">
        <Table tableData={v} tableColumns={VolunteerColumns} tableHeadersForSearch={[]} />
      </div>
    </div>
  );
};

export default page;
