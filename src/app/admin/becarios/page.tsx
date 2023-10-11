import StatsCard from '@/components/StatsCard';
import Table from '@/components/table/Table';
import scholarAllInformationCollumn from '@/components/table/columns/scholarAllInformationColumns';
import { getScholarcountByGender, getScholarsWithAllData } from '@/lib/db/utils/users';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'public/svgs/SocialNetworks';

const SAMPLESTATTS = [
  {
    name: 'Total Subscribers',
    stat: '71,897',
    previousStat: '70,946',
    change: '12%',
    changeType: 'increase',
  },
  {
    name: 'Avg. Open Rate',
    stat: '58.16%',
    previousStat: '56.14%',
    change: '2.02%',
    changeType: 'increase',
  },
  {
    name: 'Avg. Click Rate',
    stat: '24.57%',
    previousStat: '28.62%',
    change: '4.05%',
    changeType: 'decrease',
  },
  {
    name: 'Avg. Click Rate',
    stat: '24.57%',
    previousStat: '28.62%',
    change: '4.05%',
    changeType: 'decrease',
  },
];

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
  }[] = Object.entries(activeScholarsByStudyArea)
    .map(([label, value]) => ({
      label,
      value,
    }))
    .sort((a, b) => b.value - a.value);

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
  }[] = Object.entries(activeScholarsByAvaYear)
    .map(([label, value]) => ({
      label,
      value,
    }))
    .sort((a, b) => b.value - a.value);

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
    <div className="flex flex-col w-full gap-4">
      <StatsCard
        stats={[
          {
            name: 'Becarios activos',
            stat: scholars.length || 0,
            previousStat: 250,
            change: Number((((250 - scholars.length) / 250) * 100).toFixed(2)),
            changeType: 'decrease',
          },
          {
            name: 'Becarios en probatorio I',
            stat: 4 || 0,
            previousStat: 250,
            change: Number((((250 - scholars.length) / 250) * 100).toFixed(2)),
            changeType: 'decrease',
          },
          {
            name: 'Becarios en probatorio II',
            stat: 10 || 0,
            previousStat: 250,
            change: Number((((250 - scholars.length) / 250) * 100).toFixed(2)),
            changeType: 'decrease',
          },
        ]}
      />
      <h2 className="font-bold uppercase text-base tracking-wide px-4 mt-4"> Resumen</h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-2 w-full h-full bg-white dark:bg-black rounded-lg py-4 justify-center shadow-md ">
        <div className="w-full md:w-2/5 flex flex-col items-center gap-2 h-full">
          <h3 className="text-sm font-bold uppercase">Distribución de becarios area de estudio</h3>
          <div className="w-full h-full">
            <PieChartComponent data={activeScholarsByStudyAreaArray} />
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col items-center gap-2 h-full">
          <h3 className="text-sm font-bold uppercase">Distribución de becarios por género</h3>
          <div className="w-10/12 h-full min-w-max">
            <DonutChartComponent
              data={[
                { label: 'Becarios', value: menScholars },
                { label: 'Becarias', value: womenScholars },
              ]}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col items-center gap-2 h-full">
          <h3 className="text-sm font-bold uppercase">Distribución de becarios por año</h3>
          <div className="w-9/12 h-full min-w-max">
            <PieChartComponent data={activeScholarsByAvaYearArray} />
          </div>
        </div>
        {/* <div className="absolute translate-x-[700px] w-8 h-8 text-primary-1">
          <ExternalStatsIcon />
        </div> */}
      </div>
      <h2 className="font-bold  uppercase text-base tracking-wide px-4 mt-4"> Base de datos</h2>
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
