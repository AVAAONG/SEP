import StatsCard from '@/components/StatsCard';
import Table from '@/components/table/Table';
import scholarAllInformationCollumn from '@/components/table/columns/scholarAllInformationColumns';
import createSocialMediaIcons from '@/lib/createSocialInfo';
import { getScholarcountByGender, getScholarsWithAllData } from '@/lib/db/utils/users';
import { parseAvaaAdmisionYear } from '@/lib/parseFromDatabase';
import { createArrayFromObject, reduceByProperty } from '@/lib/utils';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ExternalStatsIcon } from 'public/svgs/svgs';

/**
 * @see https://stackoverflow.com/questions/67784672/react-next-js-doesnt-seem-to-work-with-apexcharts for more info
 */
const DonutChartComponent = dynamic(() => import('@/components/charts/DonutChart'), { ssr: false });
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
];

const page = async () => {
  const scholars = await getScholarsWithAllData();
  const [womenScholars, menScholars] = await getScholarcountByGender();
  const activeScholarsByStudyArea = reduceByProperty(scholars, 'collage_information', 'study_area');
  const activeScholarsByStatus = reduceByProperty(
    scholars,
    'program_information',
    'scholar_status'
  );
  const activeScholarsByStudyAreaArray = createArrayFromObject(activeScholarsByStudyArea);
  const activeScholarsByAvaYear = scholars.reduce(
    (acc, scholar) => {
      const year = scholar.program_information?.avaa_admission_year ?? 'Unknown';
      const avaaYears = year ? moment().diff(moment(year), 'years') : 0;
      const accValue = parseAvaaAdmisionYear(avaaYears);
      acc[accValue] = (acc[accValue] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const activeScholarsByAvaYearArray = createArrayFromObject(activeScholarsByAvaYear);

  const workshopSpeakersWithSocialNetworks = scholars?.map((scholar) => {
    const { twitter_user, facebook_user, instagram_user, linkedin_user } = scholar;
    const socialMedia = createSocialMediaIcons(
      twitter_user,
      facebook_user,
      instagram_user,
      linkedin_user
    );
    return { ...scholar, socialMedia };
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
            stat: activeScholarsByStatus.PROBATORIO_2 || 0,
            previousStat: 250,
            change: 0,
            changeType: 'increase',
          },
          {
            name: 'Becarios en probatorio II',
            stat: activeScholarsByStatus.PROBATORIO_1 || 0,
            previousStat: 250,
            change: 0,
            changeType: 'increase',
          },
        ]}
      />
      <h2 className="font-bold uppercase text-base tracking-wide px-4 mt-4"> Resumen</h2>

      <div className="flex flex-col w-full h-full bg-white dark:bg-black rounded-lg py-4 justify-center shadow-md ">
        <div className="w-full flex justify-end h-5 text-primary-1">
          <Link href={'/admin/becarios/estadisticas'} className="w-5 h-5 text-primary-1 -mt-3 mr-1">
            <ExternalStatsIcon />
          </Link>
        </div>
        <div className="-mt-4 px-2 flex flex-col md:flex-row gap-8 md:gap-2 w-full h-full">
          <div className="w-full md:w-2/5 flex flex-col items-center gap-2 h-full">
            <h3 className="text-sm font-bold uppercase">
              Distribución de becarios area de estudio
            </h3>
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
        </div>
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
