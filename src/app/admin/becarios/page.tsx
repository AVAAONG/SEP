import Card from '@/components/admin/dashboard/Card';
import Table from '@/components/table/Table';
import scholarAllInformationCollumn from '@/components/table/columns/scholarAllInformationColumns';
import { getScholarWithAllData, getScholarcountByGender } from '@/lib/db/utils/users';
import { UserIcon } from '@heroicons/react/20/solid';
import dynamic from 'next/dynamic';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'public/svgs/SocialNetworks';

/**
 * @see https://stackoverflow.com/questions/67784672/react-next-js-doesnt-seem-to-work-with-apexcharts for more info
 */
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
  const scholars = await getScholarWithAllData();
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
    <div className="flex flex-col items-center w-full gap-6">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="h-28 w-full">
          <Card
            Icon={UserIcon}
            bg="bg-gradient-to-r from-yellow-700  to-yellow-900"
            cardButtonBg="bg-yelow-950 active:bg-yellow-700 hover:bg-yellow-700"
            stat={scholars?.length || 0}
            text="Becarios activos"
          />
        </div>
        <div>
          <PieChartComponent
            data={[
              { name: 'Hombres', value: menScholars },
              { name: 'Mujeres', value: womenScholars },
            ]}
          />
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
