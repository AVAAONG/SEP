import DOSExchangeProgramApplicationTable from '@/components/table/columns/scholar/dosPrograms/Columns';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getScholarDOSExchangeProgramApplications } from '@/lib/db/utils/users';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);
  const programApplicationsRaw = await getScholarDOSExchangeProgramApplications(
    session?.scholarId!
  );

  return (
    <div className="flex flex-col pt-6 gap-4 min-h-screen">
      <h1 className="text-xl font-semibold  sm:text-2xl ">Department Of State Exchange Programs</h1>
      <div className="w-full">
        <DOSExchangeProgramApplicationTable
          scholarId={session?.scholarId!}
          dosProgramApplication={programApplicationsRaw}
        />
      </div>
    </div>
  );
};

export default page;
