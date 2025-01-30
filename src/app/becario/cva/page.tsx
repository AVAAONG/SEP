import ScholarCVAInformation from '@/components/forms/scholarCVAInfo';
import CvaModulesTable from '@/components/table/columns/scholar/cva/ScholarCVAModulesTable';
import { getServerSession } from '@/lib/auth/authOptions';
import { getBlobFile } from '@/lib/azure/azure';
import { getScholarCvaInformation } from '@/lib/db/utils/cva';
import { parseCvaScheduleFromDatabase, parseModalityFromDatabase } from '@/lib/utils2';
const page = async () => {
  const session = await getServerSession();
  const cvaInformation = await getScholarCvaInformation(session.id);
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
      <div className="p-2 lg:p-6 w-full bg-gray-100 dark:bg-black rounded-lg">
        <ScholarCVAInformation
          scholarCvaInformation={cvaInformation}
          certificateUrl={cvaCertificate}
          scholarId={session.id}
        />
      </div>
      <div className="w-full">
        <CvaModulesTable
          cvaInformationId={cvaInformation?.id}
          cvaModulesForTable={cvaModules}
          cvaModuleForUpdate={cvaInformation?.modules}
        />
      </div>
    </div>
  );
};

export default page;
