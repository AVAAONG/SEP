import DateSelector from '@/components/commons/datePicker';
import Table from '@/components/table/Table';
import probationScholarColumns from '@/components/table/columns/probationScholarColumns';
import {
  ScholarsInProbationByYearReturnType,
  getScholarsInProbationByYear,
} from '@/lib/db/utils/users';

import { userIcon } from 'public/svgs/svgs';

const formatScholarsProbationData = (scholars: ScholarsInProbationByYearReturnType) => {
  return scholars.map((scholar) => {
    const probationLength = scholar.program_information?.probation.length! - 1;
    return {
      id: scholar.id,
      first_names: scholar.first_names,
      last_names: scholar.last_names,
      profileImage: scholar.photo,
      cell_phone_Number: scholar.cell_phone_Number,
      email: scholar.email,
      prbationKind: scholar.program_information?.scholar_status,
      collage: scholar.collage_information[0].collage,
      career: scholar.collage_information[0].career,
      probation_average:
        scholar.program_information?.probation[probationLength].done_at_the_moment?.average,
      probation_starting_date: new Date(
        scholar.program_information?.probation[probationLength].starting_date || ''
      ).toLocaleDateString(),

      probation_external_volunteer:
        scholar.program_information?.probation[0].external_volunteering_hours,
      probation_internal_volunteer:
        scholar.program_information?.probation[0].internal_volunteering_hours,
      // probation_internal_volunteer: scholar.program_information?.probation[0].starting_date,
      //   probation_starting_date: scholar.program_information?.probation[0].starting_date,
      //   probation_average: scholar.program_information?.probation[0].done_at_the_moment.average,
      // };
    };
  });
};

const page = async ({
  searchParams,
}: {
  params: { scholarId: string };
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const scholarsInProbation = await getScholarsInProbationByYear(
    searchParams?.year || new Date().getFullYear().toString()
  );
  const probationICount = scholarsInProbation.filter(
    (scholar) => scholar.program_information?.scholar_status === 'PROBATION_I'
  ).length;
  const probationIICount = scholarsInProbation.filter(
    (scholar) => scholar.program_information?.scholar_status === 'PROBATION_II'
  ).length;
  const scholarsInProbationTableData = formatScholarsProbationData(scholarsInProbation);
  console.log(scholarsInProbation[0].program_information?.probation);
  return (
    <div className="flex flex-col items-center w-full gap-6">
      <DateSelector />
      <div className="px-4 flex justify-center items-center  flex-col md:flex-row gap-4 w-full">
        <div className="w-full relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-yellow-500 rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-14 text-sm font-medium text-gray-500 truncate">
              Total de becarios en probatorio I
            </p>
          </dt>
          <dd className="ml-14 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">{probationICount}</p>
          </dd>
        </div>
        <div className="w-full relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-rose-500 rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-14 text-sm font-medium text-gray-500 truncate">
              Total de becarios en probatorio II
            </p>
          </dt>
          <dd className="ml-14 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">{probationIICount}</p>
          </dd>
        </div>
      </div>
      <div className="w-full h-fit">
        <Table
          tableColumns={probationScholarColumns}
          tableData={scholarsInProbationTableData}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
