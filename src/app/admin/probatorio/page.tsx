import Table from '@/components/table/Table';
import workshopSpeakersColumns from '@/components/table/columns/workshopSpeakersColumns';

import SpeakerCreationForm from '@/components/admin/SpeakerCreationForm/SpeakerCreationForm';
import { userIcon } from 'public/svgs/svgs';

const page = async () => {
  return (
    <div className="flex flex-col items-center w-full gap-6">
      <div className="px-4 flex justify-center items-center  flex-col md:flex-row gap-4 w-full">
        <div className="w-full relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-primary-light rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-14 text-sm font-medium text-gray-500 truncate">
              Total de facilitadores
            </p>
          </dt>
          <dd className="ml-14 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">6</p>
          </dd>
        </div>
        <div className="w-full relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-rose-500 rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-14 text-sm font-medium text-gray-500 truncate">
              Total de facilitadores femeninos
            </p>
          </dt>
          <dd className="ml-14 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">4</p>
          </dd>
        </div>
        <div className="w-full relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-blue-500 rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-14 text-sm font-medium text-gray-500 truncate">
              Total de facilitadores masculinos
            </p>
          </dt>
          <dd className="ml-14 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">3</p>
          </dd>
        </div>
        <div className="flex">
          <SpeakerCreationForm />
        </div>
      </div>
      <div className="w-full h-fit">
        <Table tableColumns={workshopSpeakersColumns} tableData={[]} tableHeadersForSearch={[]} />
      </div>
    </div>
  );
};

export default page;
