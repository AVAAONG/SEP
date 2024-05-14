import CollagePeriodsIntermediateComponent from '@/components/CollagePeriodsIntermediateComponent';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getBlobFile } from '@/lib/azure/azure';
import { getScholarCollageInformation } from '@/lib/db/utils/collage';
import { parseModalityFromDatabase } from '@/lib/utils2';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);
  const collageInformation = await getScholarCollageInformation(session?.scholarId!);
  const collagePeriods = await Promise.all(
    collageInformation?.collage_period.map(async (collagePeriod) => {
      return {
        id: collagePeriod.id,
        current_academic_period: collagePeriod.current_academic_period,
        startDate: new Date(collagePeriod.start_date).toISOString(),
        endDate: new Date(collagePeriod.end_date).toISOString(),
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
      <div className="w-full">
        <CollagePeriodsIntermediateComponent
          collageInformationId={collageInformation?.id}
          collagePeriodForUpdate={collageInformation?.collage_period}
          collagePeriodsForTable={collagePeriods}
        />
      </div>
    </div>
  );
};

export default page;
