import DOSExchangeProgramApplicationTable from '@/components/table/columns/scholar/dosPrograms/Columns';
import { getServerSession } from '@/lib/auth/authOptions';
import { getScholarDOSExchangeProgramApplications } from '@/lib/db/utils/users';
const page = async () => {
  const session = await getServerSession();
  const programApplicationsRaw = await getScholarDOSExchangeProgramApplications(session.id!);

  return (
    <div className="flex flex-col pt-6 gap-4 min-h-screen">
      <h1 className="text-xl font-semibold  sm:text-2xl ">Department Of State Exchange Programs</h1>
      <div className="w-full">
        <DOSExchangeProgramApplicationTable
          scholarId={session.id}
          dosProgramApplication={programApplicationsRaw}
        />
      </div>
    </div>
  );
};

export default page;
