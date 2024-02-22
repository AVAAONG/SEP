import AddCvaModule from '@/components/AddCvaModule';
import ScholarCVAInformation from '@/components/forms/scholarCVAInfo';
import Table from '@/components/table/Table';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getCvaInformationByScholar } from '@/lib/db/utils/cva';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);
  const cvaInformation = await getCvaInformationByScholar(session?.scholarId);
  console.log(cvaInformation);

  return (
    <div className="flex flex-col px-2 pt-6 gap-4 h-screen">
      <h1 className="text-xl font-semibold  sm:text-2xl ">Información sobre el CVA</h1>
      <div className="p-8 w-full bg-gray-100 dark:bg-black rounded-lg">
        <ScholarCVAInformation scholarCvaInformation={cvaInformation} />
      </div>
      <div className="w-full ">
        <Table tableData={[]} tableColumns={[]} tableHeadersForSearch={[]}>
          <AddCvaModule />
        </Table>
      </div>
    </div>
  );
};

export default page;
