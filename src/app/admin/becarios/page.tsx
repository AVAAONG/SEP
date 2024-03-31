import TogleTab from '@/components/TogleTab';
import AdminStats from '@/components/admin/AdminStats';
import { DonutChartComponent, PieChartComponent } from '@/components/charts';
import { getScholarsWithAllData } from '@/lib/db/utils/users';
import { formatCountsForCharts2 } from '@/lib/utils/activityFilters';
import { countScholarProperties } from '@/lib/utils/scholarCounter';
import Link from 'next/link';
import { ExternalStatsIcon } from 'public/svgs/svgs';

const page = async ({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const scholars = await getScholarsWithAllData();
  const scholarsPropertiesCount = countScholarProperties(scholars);
  const dataForCharts = formatCountsForCharts2(scholarsPropertiesCount);

  const percentage = Number(
    ((scholarsPropertiesCount.status.PROBATION_I / scholars.length) * 100).toFixed(0)
  );

  return (
    <div className="flex flex-col w-full gap-4">
      <AdminStats
        stats={[
          {
            name: `Becarios activos`,
            stat: scholars.length || 0,
            changeType: 'increase',
            comparationText: ``,
            comparation: percentage,
            tooltipText: ``,
          },
          {
            name: `Becarios próximos a egresar`,
            stat: 0,
            changeType: 'increase',
            comparationText: `De ${scholars.length || 0} becarios activos`,
            comparation: percentage,
            tooltipText: `${percentage}% de los becarios se encuentran en Probatorio 1`,
          },
          {
            name: `Becarios en probatorio I`,
            stat: scholarsPropertiesCount.status.PROBATION_I || 0,
            changeType: 'decrease',
            comparationText: `De ${scholars.length || 0} becarios activos`,
            comparation: percentage,
            tooltipText: `${percentage}% de los becarios se encuentran en Probatorio 2    `,
          },
          {
            name: `Becarios en probatorio II`,
            stat: scholarsPropertiesCount.status.PROBATION_II || 0,
            changeType: 'decrease',
            comparationText: `De ${scholars.length || 0} becarios activos`,
            comparation: percentage,
            tooltipText: `${percentage}% de los becarios se encuentran en Probatorio 2    `,
          },
        ]}
      />
      <div className="m-auto">
        <TogleTab
          options={[
            { key: 'general', title: 'General' },
            { key: 'collage', title: 'Universidad' },
            { key: 'cva', title: 'CVA' },
            { key: 'job', title: 'Trabajo' },
            { key: 'mentors', title: 'Mentoria' },
            { key: 'components', title: 'Actividades' },
            { key: 'contact', title: 'Datos de contacto' },
          ]}
        />
      </div>
      <h2 className="font-bold uppercase text-base tracking-wide px-4 mt-4"> Resumen</h2>
      <div className="flex flex-col w-full h-full bg-white dark:bg-black rounded-lg py-4 justify-center shadow-md ">
        <div className="w-full flex justify-end h-5 text-primary-1">
          <Link href={'/admin/becarios/estadisticas'} className="w-5 h-5 text-primary-1 -mt-3 mr-1">
            <ExternalStatsIcon />
          </Link>
        </div>
        <div className="-mt-4 px-2 flex flex-col md:flex-row gap-8 md:gap-2 w-full h-full">
          <div className="w-full md:w-2/5 flex flex-col items-center gap-2 h-full">
            <h3 className="text-sm font-bold uppercase">
              Distribución de becarios area de estudio
            </h3>
            <div className="w-7/12 h-full min-w-max">
              <PieChartComponent data={dataForCharts.studyArea} />
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-center gap-2 h-full">
            <h3 className="text-sm font-bold uppercase">Distribución de becarios por género</h3>
            <div className="w-10/12 h-full min-w-max">
              <DonutChartComponent data={dataForCharts.gender} />
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-center gap-2 h-full">
            <h3 className="text-sm font-bold uppercase">Distribución de becarios por año</h3>
            <div className="w-9/12 h-full min-w-max">
              <DonutChartComponent data={dataForCharts.avaaYear} />
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-bold  uppercase text-base tracking-wide px-4 mt-4">Base de datos</h2>
      <div className="w-full h-full">
      </div>
    </div>
  );
};

export default page;
