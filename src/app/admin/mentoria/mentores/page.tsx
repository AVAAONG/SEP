import Table from '@/components/table/Table';
import ActiveMentorsColumns from '@/components/table/columns/mentors/activeMentorColumns';
import { getActiveMentors } from '@/lib/db/utils/mentors';
import { userIcon } from 'public/svgs/svgs';

const page = async () => {
  const mentors = await getActiveMentors();

  return (
    <div className="flex flex-col items-center w-full gap-6 ">
      <div className="flex flex-1 flex-col md:flex-row gap-4 w-full">
        <div className="relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-primary-light rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">Total de mentores</p>
          </dt>
          <dd className="ml-16 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">{mentors?.length}</p>
          </dd>
        </div>
      </div>
      <div className="w-full">
        <Table tableColumns={ActiveMentorsColumns} tableData={mentors} tableHeadersForSearch={[]} />
      </div>
    </div>
  );
};

export default page;
