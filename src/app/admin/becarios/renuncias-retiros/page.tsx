import TogleTab from '@/components/TogleTab';
import AdminStats from '@/components/admin/AdminStats';
import AdminScholarsWithdrawAndResignationView from '@/components/adminScholarsViews/WithdrawAndResignationIndexView';
import { getWithdrawerAndResignedScholars } from '@/lib/db/utils/users';

const TAB_OPTIONS = [
  { key: 'general', title: 'General' },
  { key: 'collage', title: 'Universidad' },
  // { key: 'job', title: 'Trabajo' },
  // { key: 'contact', title: 'Datos de contacto' },
];

const page = async ({
  searchParams,
}: {
  searchParams?: {
    selectedKey: 'general' | 'collage' | 'job' | 'mentorship' | 'contact' | undefined;
  };
}) => {
  const view = searchParams?.selectedKey;
  const scholars = await getWithdrawerAndResignedScholars();
  const withdrawScholars = scholars.filter(
    (scholar) => scholar.program_information?.scholar_condition === 'WITHDRAWAL'
  ).length;
  const resignedScholars = scholars.filter(
    (scholar) => scholar.program_information?.scholar_condition === 'RESIGNATION'
  ).length;

  return (
    <div className="flex flex-col w-full gap-4">
      <AdminStats
        stats={[
          {
            name: `Total`,
            stat: scholars.length || 0,
            changeType: 'increase',
            comparationText: null,
            tooltipText: null,
          },
          {
            name: `Renuncias`,
            stat: resignedScholars,
            changeType: 'increase',
            comparationText: `De ${scholars.length || 0} becarios activos`,
            comparation: 0,
            tooltipText: `0% de los becar ios se encuentran proximos a egresar`,
          },
          {
            name: `Retiros`,
            stat: withdrawScholars,
            changeType: 'decrease',
            comparationText: `De ${scholars.length || 0} becarios activos`,
            comparation: 0,
            tooltipText: `${0}% de los becarios se encuentran en Probatorio 1`,
          },
        ]}
      />
      <div className="mx-auto">
        <TogleTab options={TAB_OPTIONS} />
      </div>
      <h2 className="font-bold uppercase text-base tracking-wide px-4 mt-4">Resumen</h2>
      <AdminScholarsWithdrawAndResignationView
        scholars={scholars}
        view={view}
        searchs={searchParams}
      />
    </div>
  );
};

export default page;
