import { formatCountsForCharts2 } from '@/lib/utils/activityFilters';
import { countScholarProperties } from '@/lib/utils/scholarCounter';
import Table from '../table/Table';
import scholarCvaInformationColumns from '../table/columns/scholars/cvaInfo/columns';
import { formatScholarsToCvaInfoTable } from '../table/columns/scholars/cvaInfo/formater';
import ScholarViewsProps from './types';

const CvaInfo = async ({ scholars }: ScholarViewsProps) => {
  const data = await formatScholarsToCvaInfoTable(scholars);
  const scholarsPropertiesCount = countScholarProperties(scholars);
  const dataForCharts = formatCountsForCharts2(scholarsPropertiesCount);
  return (
    <>

      <h2 className="font-bold  uppercase text-base tracking-wide px-4 mt-4">Base de datos</h2>
      <div className="w-full h-full">
        <Table
          tableColumns={scholarCvaInformationColumns}
          tableData={data}
          tableHeadersForSearch={[]}
        />
      </div>
    </>
  );
};

export default CvaInfo;
