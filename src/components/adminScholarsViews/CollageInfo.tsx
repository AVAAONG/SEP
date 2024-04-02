import { formatCountsForCharts } from '@/lib/utils/activityFilters';
import { countScholarCollageProperties } from '@/lib/utils/scholarCounter';
import { DonutChartComponent } from '../charts';
import Table from '../table/Table';
import scholarCollageInformationColumns from '../table/columns/scholars/collageInfo/columns';
import { formatScholarsToCollageinfoTable } from '../table/columns/scholars/collageInfo/formater';
import ScholarViewsProps from './types';

const TABLE_SEARCH_OPTIONS = [
  {
    label: 'Area de estudio',
    option: 'studyArea',
  },
  {
    label: 'Universidad',
    option: 'collage',
  },
  {
    label: 'Carrera',
    option: 'carrer',
  },
  {
    label: 'Regimen de estudios',
    option: 'studyRegime',
  },
];

const CollageInfo = async ({ scholars }: ScholarViewsProps) => {
  const data = await formatScholarsToCollageinfoTable(scholars);
  const scholarsPropertiesCount = countScholarCollageProperties(scholars);
  const dataForCharts = await formatCountsForCharts(scholarsPropertiesCount);
  return (
    <>
      <div className="flex flex-col w-full h-full bg-white dark:bg-black rounded-lg py-4 justify-center shadow-md ">
        <div className="w-full grid md:grid-cols-5 justify-center items-center">
          {/* Necesary div to center the charts */} <div></div>
          <DonutChartComponent
            data={dataForCharts.kindOfCollage}
            chartTitle="Distribución por tipo de universidad"
          />
          <DonutChartComponent
            data={dataForCharts.studyArea}
            chartTitle="Distribución por area de estudio"
          />
          <DonutChartComponent
            data={dataForCharts.studyRegimen}
            chartTitle="Distribución por el regimen de estudio"
          />
        </div>
      </div>
      <h2 className="font-bold  uppercase text-base tracking-wide px-4 mt-4">Base de datos</h2>
      <div className="w-full h-full">
        <Table
          tableColumns={scholarCollageInformationColumns}
          tableData={data}
          tableHeadersForSearch={TABLE_SEARCH_OPTIONS}
        />
      </div>
    </>
  );
};

export default CollageInfo;
