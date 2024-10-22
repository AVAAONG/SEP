import TogleTab from '@/components/TogleTab';
import AdminStats from '@/components/admin/AdminStats';
import AdminScholarsView from '@/components/adminScholarsViews';
import { getScholarsWithAllData } from '@/lib/db/utils/users';
import { countScholarGeneralProperties } from '@/lib/utils/scholarCounter';

const TAB_OPTIONS = [
  { key: 'general', title: 'General' },
  { key: 'collage', title: 'Universidad' },
  { key: 'cva', title: 'CVA' },
  { key: 'activities', title: 'Seguimiento' },
  { key: 'all', title: 'Todos los datos' },
];

const page = async ({
  searchParams,
}: {
  searchParams?: {
    selectedKey:
      | 'general'
      | 'collage'
      | 'cva'
      | 'job'
      | 'mentorship'
      | 'activities'
      | 'contact'
      | 'all'
      | undefined;
  };
}) => {
  const view = searchParams?.selectedKey;
  const scholars = await getScholarsWithAllData();
  const scholarsPropertiesCount = countScholarGeneralProperties(scholars);

  const activateScholars = scholars.filter(
    (scholar) => scholar.program_information?.scholar_condition === 'ACTIVE'
  );

  const activeScholars = scholarsPropertiesCount.condition.ACTIVE;

  const probationI = Number(
    ((scholarsPropertiesCount.status.PROBATION_I / activeScholars) * 100).toFixed(0)
  );
  const probationII = Number(
    ((scholarsPropertiesCount.status.PROBATION_II / activeScholars) * 100).toFixed(0)
  );
  const toBeAlumniComparation = Number(
    ((scholarsPropertiesCount.condition.TO_BE_ALUMNI / activeScholars) * 100).toFixed(0)
  );

  return (
    <div className="flex flex-col w-full gap-4">
      <AdminStats
        stats={[
          {
            name: `Becarios activos`,
            stat: activeScholars || 0,
            changeType: 'increase',
            comparationText: null,
            tooltipText: null,
          },
          {
            name: `Becarios en espera de egreso`,
            stat: scholarsPropertiesCount.condition.TO_BE_ALUMNI,
            changeType: 'increase',
            comparationText: `De ${activeScholars + scholarsPropertiesCount.condition.TO_BE_ALUMNI || 0} becarios`,
            comparation: toBeAlumniComparation,
            tooltipText: `0% de los becar ios se encuentran proximos a egresar`,
          },
          {
            name: `Becarios en probatorio I`,
            stat: scholarsPropertiesCount.status.PROBATION_I || 0,
            changeType: 'decrease',
            comparationText: `De ${activeScholars || 0} becarios activos`,
            comparation: probationI,
            tooltipText: `${probationI}% de los becarios se encuentran en Probatorio 1`,
          },
          {
            name: `Becarios en probatorio II`,
            stat: scholarsPropertiesCount.status.PROBATION_II || 0,
            changeType: 'decrease',
            comparationText: `De ${activeScholars || 0} becarios activos`,
            comparation: probationII,
            tooltipText: `${probationII}% de los becarios se encuentran en Probatorio 2`,
          },
        ]}
      />
      <div className="mx-auto">
        <TogleTab options={TAB_OPTIONS} />
      </div>
      <h2 className="font-bold uppercase text-base tracking-wide px-4 mt-4">Resumen</h2>
      <AdminScholarsView scholars={activateScholars} view={view} searchs={searchParams} />
    </div>
  );
};

export default page;
