import { formatCountsForCharts2 } from '@/lib/utils/activityFilters';
import { countScholarProperties } from '@/lib/utils/scholarCounter';
import { DonutChartComponent } from '../charts';
import Table from '../table/Table';
import scholarGeneralInformationColumns from '../table/columns/scholars/generalInfo/columns';
import { formatScholarsToGeneralInfoTable } from '../table/columns/scholars/generalInfo/formater';
import ScholarViewsProps from './types';

const TABLE_SEARCH_OPTIONS = [
  {
    label: 'Año en AVAA',
    option: 'yearsInAvaa'
  },
  {
    label: 'Estatus',
    option: 'programStatus'
  }
]

const GeneralInfo = async ({ scholars }: ScholarViewsProps) => {
  const data = await formatScholarsToGeneralInfoTable(scholars);
  const scholarsPropertiesCount = countScholarProperties(scholars);
  const dataForCharts = formatCountsForCharts2(scholarsPropertiesCount);
  return (
    <>
      <div className="flex flex-col w-full h-full bg-white dark:bg-black rounded-lg py-4 justify-center shadow-md ">
        <div className="w-full grid md:grid-cols-5 justify-center items-center">
          {/* Necesary div to center the charts */} <div></div>
          <DonutChartComponent data={dataForCharts.status} chartTitle='Becarios segun su estatus' />
          <DonutChartComponent data={dataForCharts.gender} chartTitle='Distribución de becarios por género' />
          <DonutChartComponent data={dataForCharts.avaaYear} chartTitle='Distribución de becarios por año' />
        </div>
      </div>
      <h2 className="font-bold  uppercase text-base tracking-wide px-4 mt-4">Base de datos</h2>
      <div className="w-full h-full">
        <Table
          tableColumns={scholarGeneralInformationColumns}
          tableData={data}
          tableHeadersForSearch={TABLE_SEARCH_OPTIONS}
        />
      </div>
    </>
  );
};

export default GeneralInfo;
