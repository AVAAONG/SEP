import { getScholarsWithAllAllData } from '@/lib/db/utils/users';
import { formatCountsForCharts } from '@/lib/utils/activityFilters';
import { countScholarGeneralProperties } from '@/lib/utils/scholarCounter';
import { DonutChartComponent } from '../charts';
import Table from '../table/Table';
import scholarAllInformationColumns from '../table/columns/scholars/allInfo/columns';
import { formatScholarsToAllInfoTable } from '../table/columns/scholars/allInfo/formater';

const AllInformation = async () => {
  const scholars = await getScholarsWithAllAllData();

  const data = await formatScholarsToAllInfoTable(scholars);
  const scholarsPropertiesCount = countScholarGeneralProperties(scholars);
  const dataForCharts = await formatCountsForCharts(scholarsPropertiesCount);
  return (
    <>
      <div className="flex flex-col w-full h-full bg-white dark:bg-black rounded-lg py-4 justify-center shadow-md ">
        <div className="w-full grid md:grid-cols-5 justify-center items-center">
          {/* Necesary div to center the charts */} <div></div>
          <DonutChartComponent data={dataForCharts.status} chartTitle="Distribución por estatus" />
          <DonutChartComponent data={dataForCharts.gender} chartTitle="Distribución por género" />
          <DonutChartComponent data={dataForCharts.avaaYear} chartTitle="Distribución por año" />
        </div>
      </div>
      <h2 className="font-bold  uppercase text-base tracking-wide px-4 mt-4">Base de datos</h2>
      <div className="w-full h-full">
        <Table
          tableColumns={scholarAllInformationColumns}
          tableData={data}
          tableHeadersForSearch={[]}
        />
      </div>
    </>
  );
};

export default AllInformation;
