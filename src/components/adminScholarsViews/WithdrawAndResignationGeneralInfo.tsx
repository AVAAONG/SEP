import { formatCountsForCharts } from '@/lib/utils/activityFilters';
import { countScholarGeneralProperties } from '@/lib/utils/scholarCounter';
import { DonutChartComponent } from '../charts';
import Table from '../table/Table';
import scholarToWithdrawAndResignationGeneralInformationColumns from '../table/columns/scholars/withdrawAndResignationGenereralInfo/columns';
import { formatScholarsToWithdrawAndResignationGeneralInfoTable } from '../table/columns/scholars/withdrawAndResignationGenereralInfo/formater';
import ScholarViewsProps from './types';

const TABLE_SEARCH_OPTIONS = [
  {
    label: 'Año en AVAA',
    option: 'yearsInAvaa',
  },
  {
    label: 'Estatus',
    option: 'programStatus',
  },
  {
    label: 'Género',
    option: 'gender',
  },
  {
    label: 'Edad',
    option: 'years',
  },
];

const WithdrawAndResignationGeneralInfo = async ({ scholars }: ScholarViewsProps) => {
  const data = await formatScholarsToWithdrawAndResignationGeneralInfoTable(scholars);
  const scholarsPropertiesCount = countScholarGeneralProperties(scholars);
  const dataForCharts = await formatCountsForCharts(scholarsPropertiesCount);
  return (
    <>
      <div className="flex flex-col w-full h-full bg-white dark:bg-black rounded-lg py-4 justify-center shadow-md ">
        <div className="w-full grid md:grid-cols-5 justify-center items-center">
          {/* Necesary div to center the charts */} <div></div>
          <DonutChartComponent
            data={dataForCharts.status}
            chartTitle="Distribución por condición"
          />
          <DonutChartComponent data={dataForCharts.gender} chartTitle="Distribución por género" />
        </div>
      </div>
      <h2 className="font-bold  uppercase text-base tracking-wide px-4 mt-4">Base de datos</h2>
      <div className="w-full h-full">
        <Table
          tableColumns={scholarToWithdrawAndResignationGeneralInformationColumns}
          tableData={data}
          tableHeadersForSearch={TABLE_SEARCH_OPTIONS}
        />
      </div>
    </>
  );
};

export default WithdrawAndResignationGeneralInfo;
