import { formatCountsForCharts2 } from '@/lib/utils/activityFilters';
import { countScholarProperties } from '@/lib/utils/scholarCounter';
import Table from '../table/Table';
import scholarCollageInformationColumns from '../table/columns/scholars/collageInfo/columns';
import { formatScholarsToCollageinfoTable } from '../table/columns/scholars/collageInfo/formater';
import ScholarViewsProps from './types';

const CollageInfo = async ({ scholars }: ScholarViewsProps) => {
  const data = await formatScholarsToCollageinfoTable(scholars);
  const scholarsPropertiesCount = countScholarProperties(scholars);
  const dataForCharts = formatCountsForCharts2(scholarsPropertiesCount);
  return (
    <>

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
