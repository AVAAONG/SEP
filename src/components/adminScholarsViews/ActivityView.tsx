import { getScholarsWithActivities } from '@/lib/db/utils/Workshops';
import Table from '../table/Table';
import scholarActivitiesInformationColumns from '../table/columns/scholars/activitiesInfo/columns';
import { formatScholarsActivitiesForActivitiesTable } from '../table/columns/scholars/activitiesInfo/formater';

const ActivitiesInfo = async () => {
  const scholars = await getScholarsWithActivities();
  const data = await formatScholarsActivitiesForActivitiesTable(scholars);
  //   const scholarsPropertiesCount = countScholarProperties(scholars);
  return (
    <>
      <h2 className="font-bold  uppercase text-base tracking-wide px-4 mt-4">Base de datos</h2>
      <div className="w-full h-full">
        <Table
          tableColumns={scholarActivitiesInformationColumns}
          tableData={data}
          tableHeadersForSearch={[]}
        />
      </div>
    </>
  );
};

export default ActivitiesInfo;
