import Table from '@/components/table/Table';
import scholarAllInformationCollumn from '@/components/table/columns/scholarAllInformationColumns';
import { getScholarcountByGender, getScholarsWithAllData } from '@/lib/db/utils/users';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'public/svgs/SocialNetworks';
import { WarningIcon } from 'public/svgs/svgs';

/**
 * @see https://stackoverflow.com/questions/67784672/react-next-js-doesnt-seem-to-work-with-apexcharts for more info
 */
const DonutChartComponent = dynamic(() => import('@/components/charts/DonutChart'), { ssr: false });
const TreeMapChartComponent = dynamic(() => import('@/components/charts/TreeMapChart'), {
  ssr: false,
});
const PieChartComponent = dynamic(() => import('@/components/charts/Pie'), { ssr: false });
const tableHeaders = [
  {
    option: 'first_names',
    label: 'Nombre',
  },
  {
    option: 'last_names',
    label: 'Apellidos',
  },
  {
    option: 'email',
    label: 'Correo',
  },
  {
    option: 'phone_number',
    label: 'Telefono',
  },
  {
    option: 'job_company',
    label: 'Organización',
  },
];

const page = async () => {
  const scholars = await getScholarsWithAllData();

  const activeScholarsByCollege = scholars.reduce(
    (acc, scholar) => {
      if (scholar.program_information?.scholar_condition === 'ACTIVE') {
        const college = scholar.collage_information?.collage ?? 'Unknown';
        acc[college] = (acc[college] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const activeScholarsByCollegeArray: {
    label: string;
    value: string | number;
  }[] = Object.entries(activeScholarsByCollege)
    .map(([label, value]) => ({
      label,
      value,
    }))
    .sort((a, b) => b.value - a.value); // sort by value from major to minor

  // const activeScholarsByCollegeArray: {
  //   label: string;
  //   value: string | number;
  // }[] = Object.entries(activeScholarsByCollege).map(([label, value]) => ({
  //   label,
  //   value: value > 5 ? '+5' : value,
  // }));

  const activeScholarsByStudyArea = scholars.reduce(
    (acc, scholar) => {
      if (scholar.program_information?.scholar_condition === 'ACTIVE') {
        const studyArea = scholar.collage_information?.study_area ?? 'Unknown';
        acc[studyArea] = (acc[studyArea] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const activeScholarsByStudyAreaArray: {
    label: string;
    value: string | number;
  }[] = Object.entries(activeScholarsByStudyArea).map(([label, value]) => ({
    label,
    value,
  }));

  const activeScholarsByStatus = scholars.reduce(
    (acc, scholar) => {
      if (scholar.program_information?.scholar_condition === 'ACTIVE') {
        const status = scholar.program_information.scholar_status ?? 'Unknown';
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const activeScholarsByAvaYear = scholars.reduce(
    (acc, scholar) => {
      if (scholar.program_information?.scholar_condition === 'ACTIVE') {
        const year = scholar.program_information?.avaa_admission_year ?? 'Unknown';
        const avaaYears = year ? moment().diff(moment(year), 'years') : 0;
        const accValue = avaaYears < 1 ? 1 : avaaYears;
        if (avaaYears > 5) {
          acc['+5'] = (acc['+5'] || 0) + 1;
          return acc;
        } else {
          acc[accValue] = (acc[accValue] || 0) + 1;
        }
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const activeScholarsByAvaYearArray: {
    label: string;
    value: number;
  }[] = Object.entries(activeScholarsByAvaYear).map(([label, value]) => ({
    label,
    value,
  }));

  const [womenScholars, menScholars] = await getScholarcountByGender();
  const workshopSpeakersWithSocialNetworks = scholars?.map((scholar) => {
    const { twitter_user, facebook_user, instagram_user, linkedin_user } = scholar;
    const socialNetworks = [
      {
        name: 'Twitter',
        url: `https://twitter.com/${twitter_user}`,
        icon: <TwitterIcon />,
      },
      {
        name: 'Facebook',
        url: `https://www.facebook.com/${facebook_user}`,
        icon: <FacebookIcon />,
      },
      {
        name: 'Instagram',
        url: `https://www.instagram.com/${instagram_user}`,
        icon: <InstagramIcon />,
      },
      {
        name: 'Linkedin',
        url: linkedin_user,
        icon: <LinkedinIcon />,
      },
    ];
    return { ...scholar, socialNetworks };
  });
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col gap-4 w-full bg-white rounded-lg p-4 shadow-md">
        <h2 className="truncated font-bold text-2xl">Resumen</h2>

        <div className="flex gap-4 relative overflow-hidden antialiased ">
          <div className="flex flex-col border border-primary-1 p-4 rounded-lg">
            <div className="text-xs font-bold truncated">Total de becarios activos</div>
            <div className="flex items-end gap-1">
              <p className="text-3xl font-bold">{scholars.length}</p>
              <p className="text-xs font-medium truncated">becarios</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex gap-2 items-center justify-center text-yellow-600 border border-yellow-400 bg-yellow-100 py-1 px-2 rounded-lg h-fit">
              <div className="w-3">
                <WarningIcon />
              </div>
              <div className="font-medium truncate ">Becarios en probatorio I</div>
              <p className="font-bold">3</p>
            </div>
            <div className="flex gap-2 items-center justify-center text-red-600 border border-red-300 bg-red-100 py-1 px-4 rounded-lg h-fit">
              <div className="w-3">
                <WarningIcon />
              </div>
              <div className="font-medium truncate">Becarios en probatorio II</div>
              <p className="font-bold">3</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* <div className="w-80 flex flex-col items-center">
            <h3 className="text-lg font-bold">Distribucion de becarios por genero</h3>
            <DonutChartComponent
              data={[
                { label: 'Becarios', value: menScholars },
                { label: 'Becarias', value: womenScholars },
              ]}
            />
          </div> 
          <div className="w-80 flex flex-col items-center">
            <h3 className="text-lg font-bold">Distribucion de becarios por area de a;o</h3>
            <PieChartComponent data={activeScholarsByAvaYearArray} />
          </div>
          */}
          <h2 className="truncated font-bold text-2xl">Resumen universitario</h2>
          <div className="w-full flex ">
            <div className="w-1/3 h-full flex flex-col  items-center">
              <h3 className="text-lg font-bold">Distribucion de becarios por universidad</h3>
              <div className="w-full">
                <TreeMapChartComponent data={activeScholarsByCollegeArray} />
              </div>
            </div>
            <div className="w-1/3 h-full flex flex-col items-center">
              <h3 className="text-lg font-bold">Distribucion de becarios por area de estudio</h3>
              <div className="w-full">
                <PieChartComponent data={activeScholarsByStudyAreaArray} />
              </div>
            </div>
          </div>

          {/* <div className="w-full flex flex-col items-center">
            <h3 className="text-lg font-bold">Distribucion de becarios por area de estudio</h3>
            <PieChartComponent data={activeScholarsByStudyAreaArray} />
          </div>
           */}
        </div>
      </div>

      <div className="w-full h-full">
        <Table
          tableColumns={scholarAllInformationCollumn}
          tableData={workshopSpeakersWithSocialNetworks || []}
          tableHeadersForSearch={tableHeaders}
        />
      </div>
    </div>
  );
};

export default page;
