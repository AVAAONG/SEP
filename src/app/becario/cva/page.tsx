import AddCvaModule from '@/components/AddCvaModule';
import ScholarCVAInformation from '@/components/forms/scholarCVAInfo';
import Table from '@/components/table/Table';
import CvaModulesColumns from '@/components/table/columns/cvaModuleColumns';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getBlobFile } from '@/lib/azure/azure';
import { getCvaInformationByScholar } from '@/lib/db/utils/cva';
import { parseCvaScheduleFromDatabase, parseModalityFromDatabase } from '@/lib/utils2';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);
  const cvaInformation = await getCvaInformationByScholar(session?.scholarId!);
  const cvaCertificate = await getBlobFile(cvaInformation?.certificate);
  const cvaModules = await Promise.all(
    cvaInformation?.modules.map(async (module) => {
      return {
        ...module,
        modality: parseModalityFromDatabase(module?.modality),
        schedule: parseCvaScheduleFromDatabase(module.schedule),
        record: module.record ? await getBlobFile(module.record) : null,
      };
    }) || []
  );

  return (
    <div className="flex flex-col pt-6 gap-4 min-h-screen">
      <h1 className="text-xl font-semibold  sm:text-2xl ">Información sobre el CVA</h1>
      <div className="p-8 w-full bg-gray-100 dark:bg-black rounded-lg">
        <ScholarCVAInformation
          scholarCvaInformation={cvaInformation}
          certificateUrl={cvaCertificate}
          scholarId={session?.scholarId!}
        />
      </div>
      <div className="w-full">
        <Table
          tableData={cvaModules || []}
          tableColumns={CvaModulesColumns}
          tableHeadersForSearch={[]}
        >
          <AddCvaModule cvaInformationId={cvaInformation?.id || null} />
        </Table>
      </div>
    </div>
  );
};

export default page;
