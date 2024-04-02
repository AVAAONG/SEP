import { formatCountsForCharts } from '@/lib/utils/activityFilters';
import { countScholarCvaProperties } from '@/lib/utils/scholarCounter';
import { DonutChartComponent } from '../charts';
import Table from '../table/Table';
import scholarCvaInformationColumns from '../table/columns/scholars/cvaInfo/columns';
import { formatScholarsToCvaInfoTable } from '../table/columns/scholars/cvaInfo/formater';
import ScholarViewsProps from './types';

const TABLE_SEARCH_OPTIONS = [
  {
    label: 'Cede',
    option: 'cvaLocation',
  },
];


const CvaInfo = async ({ scholars }: ScholarViewsProps) => {
  const data = await formatScholarsToCvaInfoTable(scholars);
  const scholarsPropertiesCount = countScholarCvaProperties(scholars);
  const dataForCharts = await formatCountsForCharts(scholarsPropertiesCount);
  return (
    <>
      <div className="flex flex-col w-full h-full bg-white dark:bg-black rounded-lg py-4 justify-center shadow-md ">
        <div className="w-full grid md:grid-cols-5 justify-center items-center">
          <DonutChartComponent
            data={dataForCharts.isCurrentlyInCva}
            chartTitle="Distribución de becarios que estan en el CVA"
          />
          <DonutChartComponent
            data={dataForCharts.cvaLocation}
            chartTitle="Distribución por sede"
          />
          <DonutChartComponent
            data={dataForCharts.cvaModality}
            chartTitle="Distribución por modalidad"
          />
          <DonutChartComponent
            data={dataForCharts.hasFinishedCva}
            chartTitle="Distribución de becarios que han finalizado el CVA"
          />
          <DonutChartComponent
            data={dataForCharts.cvaLastModule}
            chartTitle="Distribución de becarios por modulo"
          />
        </div>
      </div>
      <h2 className="font-bold uppercase text-base tracking-wide px-4 mt-4">Base de datos</h2>
      <div className="w-full h-full">
        <Table
          tableColumns={scholarCvaInformationColumns}
          tableData={data}
          tableHeadersForSearch={TABLE_SEARCH_OPTIONS}
        />
      </div>
    </>
  );
};

export default CvaInfo;
