import Table from '@/components/table/Table';
import scholarAllInformationCollumn from '@/components/table/columns/scholarAllInformationColumns';
import { getScholarcountByGender, getScholarsWithAllData } from '@/lib/db/utils/users';
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
  const scholars = await getScholarsWithAllData();
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
      <div className="flex flex-col md:flex-row gap-4 w-full bg-white rounded-lg p-4 items-center shadow-md">
        <div className="flex rounded-lg relative overflow-hidden antialiased">
          <div className="flex flex-col">
            <div className="text-2xl font-bold truncated text-gray-800">Becarios activos</div>
            <p className=" text-5xl font-bold">{scholars.length}</p>
          </div>
          <div className="w-52">{/* <UserIcon /> */}</div>
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
