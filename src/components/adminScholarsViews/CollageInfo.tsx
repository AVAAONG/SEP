import { formatCountsForCharts2 } from '@/lib/utils/activityFilters';
import { countScholarProperties } from '@/lib/utils/scholarCounter';
import Link from 'next/link';
import { ExternalStatsIcon } from 'public/svgs/svgs';
import { DonutChartComponent, PieChartComponent } from '../charts';
import Table from '../table/Table';
import { formatScholarsToCollageinfoTable } from '../table/columns/scholars/collageInfo/formater';
import ScholarViewsProps from './types';
import scholarCollageInformationColumns from '../table/columns/scholars/collageInfo/columns';

const CollageInfo = async ({ scholars }: ScholarViewsProps) => {
  const data = await formatScholarsToCollageinfoTable(scholars);
  const scholarsPropertiesCount = countScholarProperties(scholars);
  const dataForCharts = formatCountsForCharts2(scholarsPropertiesCount);
  return (
    <>
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
        <Table
          tableColumns={scholarCollageInformationColumns}
          tableData={data}
          tableHeadersForSearch={[]}
        />
      </div>
    </>
  );
};

export default CollageInfo;
