import AddCollageAcademicPeriod from '@/components/AddCollageAcademicPeriod';
import Table from '@/components/table/Table';
import CollageAcademicPeriodsColumns from '@/components/table/columns/collageAcademicPeriodsColumns';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getBlobFile } from '@/lib/azure/azure';
import { getCollageInformationByScholar } from '@/lib/db/utils/collage';
import { parseModalityFromDatabase } from '@/lib/utils2';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);
  const collageInformation = await getCollageInformationByScholar(session?.scholarId!);
  const collagePeriods = await Promise.all(
    collageInformation?.collage_period.map(async (collagePeriod) => {
      return {
        id: collagePeriod.id,
        current_academic_period: collagePeriod.current_academic_period,
        startDate: new Date(collagePeriod.start_date).toLocaleDateString(),
        endDate: new Date(collagePeriod.end_date).toLocaleDateString(),
        grade: collagePeriod.grade,
        modality: parseModalityFromDatabase(collagePeriod?.class_modality),
        record: collagePeriod.record ? await getBlobFile(collagePeriod.record) : null,
      };
    }) || []
  );

  return (
    <div className="flex flex-col pt-6 gap-4 min-h-screen">
      <h1 className="text-xl font-semibold  sm:text-2xl ">
        Información sobre el periodo academico
      </h1>
      {/* <div className="p-2 lg:p-6 w-full bg-gray-100 dark:bg-black rounded-lg">
        <ScholarCVAInformation
          scholarCvaInformation={cvaInformation}
          certificateUrl={cvaCertificate}
          scholarId={session?.scholarId!}
        />
      </div> */}
      <div className="w-full">
        <Table
          tableData={collagePeriods || []}
          tableColumns={CollageAcademicPeriodsColumns}
          tableHeadersForSearch={[]}
        >
          <AddCollageAcademicPeriod collageInformationId={collageInformation?.id || null} />
        </Table>
      </div>
    </div>
  );
};

export default page;
