import Table from '@/components/table/Table';
import workshopSpeakersColumns from '@/components/table/columns/workshopSpeakersColumns';
import {
  getWorkshopSpeakersCountByGender,
  getWorkshopSpeakersWithParams,
} from '@/lib/db/utils/speaker';
import { Prisma } from '@prisma/client';
import dynamic from 'next/dynamic';
import { userIcon } from 'public/svgs/svgs';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../../public/svgs/SocialNetworks';

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
const toSelect: Prisma.SpeakerSelect = {
  id: true,
  first_names: true,
  last_names: true,
  email: true,
  phone_number: true,
  gender: true,
  job_company: true,
  curriculum: true,
  image: true,
  twitter_user: true,
  facebook_user: true,
  instagram_user: true,
  linkedin_user: true,
  workshops: {
    select: {
      modality: true,
    },
  },
};

const page = async () => {
  const workshopSpeakers = await getWorkshopSpeakersWithParams(toSelect);
  const workshopSpeakersWithSocialNetworks = workshopSpeakers?.map((workshopSpeaker) => {
    const { twitter_user, facebook_user, instagram_user, linkedin_user } = workshopSpeaker;
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
    return { ...workshopSpeaker, socialNetworks };
  });
  const [workshopSpeakersWomanCount, workshopSpeakerMenCount] =
    await getWorkshopSpeakersCountByGender();
  return (
    <div className="flex flex-col items-center w-full gap-6 min-h-screen">
      <div className="flex flex-1 flex-col md:flex-row gap-4 w-full">
        <div className="relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-primary-light rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              Total de facilitadores
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">{workshopSpeakers?.length}</p>
          </dd>
        </div>

        <div className="flex flex-col justify-center bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-sm font-semibold truncate">
            Distribución de facilitadores según su género
          </h2>
          <PieChartComponent
            data={[
              { label: 'Mujeres', value: workshopSpeakersWomanCount },
              { label: 'Hombres', value: workshopSpeakerMenCount },
            ]}
          />
        </div>
      </div>
      <div className="w-full h-fit">
        <Table
          tableColumns={workshopSpeakersColumns}
          tableData={workshopSpeakersWithSocialNetworks || []}
          tableHeadersForSearch={tableHeaders}
        />
      </div>
    </div>
  );
};

export default page;
