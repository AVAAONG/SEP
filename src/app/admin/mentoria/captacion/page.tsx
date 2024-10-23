import { DonutChartComponent } from '@/components/charts';
import Table from '@/components/table/Table';
import MentorColumns from '@/components/table/columns/mentors/mentorColumns';
import { getNewMentors } from '@/lib/db/utils/mentors';
import { UserIcon } from '@heroicons/react/24/solid';

const page = async () => {
  const mentors = await getNewMentors();
  return (
    <div className="flex flex-col items-center w-full gap-6 min-h-screen">
      <div className="flex self-start flex-col gap-4 ">
        <div className="relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-primary-light rounded-md p-2">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">Total de registrados</p>
          </dt>
          <dd className="ml-16 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">{mentors?.length}</p>
          </dd>
        </div>
      </div>
      <div className="grid grid-cols-5 bg-white rounded-md w-full p-4">
        <div></div>
        <div></div>
        <DonutChartComponent
          data={[
            {
              label: 'Hombres',
              value: 0,
            },
            {
              label: 'Mujeres',
              value: 2,
            },
          ]}
          chartTitle="Distribucion por genero"
        />
        <div></div>
      </div>

      <div className="w-full">
        <Table tableColumns={MentorColumns} tableData={mentors} tableHeadersForSearch={[]} />
      </div>
    </div>
  );
};

export default page;
