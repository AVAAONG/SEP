import TogleTab from '@/components/TogleTab';
import AdminStats from '@/components/admin/AdminStats';
import AdminScholarsView from '@/components/adminScholarsViews';
import { getScholarsWithAllData } from '@/lib/db/utils/users';
import { countScholarGeneralProperties } from '@/lib/utils/scholarCounter';

const TAB_OPTIONS = [
  { key: 'general', title: 'General' },
  { key: 'collage', title: 'Universidad' },
  { key: 'cva', title: 'CVA' },
  // { key: 'job', title: 'Trabajo' },
  { key: 'activities', title: 'Actividades' },
  // { key: 'contact', title: 'Datos de contacto' },
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
      | undefined;
  };
}) => {
  const view = searchParams?.selectedKey;
  const scholars = await getScholarsWithAllData();
  const scholarsPropertiesCount = countScholarGeneralProperties(scholars);

  const probationI =
    scholars.length > 0
      ? ((scholarsPropertiesCount.status.PROBATION_I / scholars.length) * 100).toFixed(0)
      : '0';
  const probationII = Number(
    ((scholarsPropertiesCount.status.PROBATION_II / scholars.length) * 100).toFixed(0)
  );

  return (
    <div className="flex flex-col w-full gap-4">
      <AdminStats
        stats={[
          {
            name: `Becarios activos`,
            stat: scholars.length || 0,
            changeType: 'increase',
            comparationText: null,
            tooltipText: null,
          },
          {
            name: `Becarios próximos a egresar`,
            stat: 0,
            changeType: 'increase',
            comparationText: `De ${scholars.length || 0} becarios activos`,
            comparation: probationI,
            tooltipText: `${probationI}% de los becarios se encuentran proximos a egresar`,
          },
          {
            name: `Becarios en probatorio I`,
            stat: scholarsPropertiesCount.status.PROBATION_I || 0,
            changeType: 'decrease',
            comparationText: `De ${scholars.length || 0} becarios activos`,
            comparation: probationII,
            tooltipText: `${probationII}% de los becarios se encuentran en Probatorio 2`,
          },
          {
            name: `Becarios en probatorio II`,
            stat: scholarsPropertiesCount.status.PROBATION_II || 0,
            changeType: 'decrease',
            comparationText: `De ${scholars.length || 0} becarios activos`,
            comparation: 55,
            tooltipText: `${probationII}% de los becarios se encuentran en Probatorio 2`,
          },
        ]}
      />
      <div className="mx-auto">
        <TogleTab options={TAB_OPTIONS} />
      </div>
      <h2 className="font-bold uppercase text-base tracking-wide px-4 mt-4">Resumen</h2>
      <AdminScholarsView scholars={scholars} view={view} />
    </div>
  );
};

export default page;
