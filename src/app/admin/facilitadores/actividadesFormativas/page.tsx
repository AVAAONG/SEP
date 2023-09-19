import Card from '@/components/admin/dashboard/Card';
import Button from '@/components/commons/Button';
import Table from '@/components/table/Table';
import workshopSpeakerColumns from '@/components/table/columns/workshopSpeakerColumns';
import { getWorkshopSpeakersWithParams } from '@/lib/db/utils/speaker';
import { UserIcon } from '@heroicons/react/20/solid';
import { Prisma } from '@prisma/client';
import dynamic from 'next/dynamic';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../../../public/svgs/SocialNetworks';

/**
 * @see https://stackoverflow.com/questions/67784672/react-next-js-doesnt-seem-to-work-with-apexcharts for more info
 */
const PieChartComponent = dynamic(() => import('@/components/charts/Pie'), { ssr: false });

const page = async () => {
  const toSelect: Prisma.WorkshopSpeakerSelect = {
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
  };
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
        url: `https://www.linkedin.com/in/${linkedin_user}`,
        icon: <LinkedinIcon />,
      },
    ];
    return { ...workshopSpeaker, socialNetworks };
  });
  return (
    <div className="flex flex-col items-center w-full gap-6">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="h-28 w-full">
          <Card
            Icon={UserIcon}
            bg="bg-gradient-to-r from-blue-700  to-indigo-900"
            cardButtonBg="bg-indigo-950 active:bg-blue-700 hover:bg-blue-700"
            stat={workshopSpeakers?.length || 0}
            text="Facilitadores"
          />
        </div>

        <div>
          <PieChartComponent
            data={[
              { name: 'Hombres', value: 10 },
              { name: 'Mujeres', value: 20 },
            ]}
          />
        </div>

        <div className="w-1/3 px-3">
          <h4 className="text-xl font-medium">Acciones</h4>
          <Button buttonText="Crear facilitador" />
        </div>
      </div>
      <div className="w-full h-full">
        <Table
          tableColumns={workshopSpeakerColumns}
          tableData={workshopSpeakersWithSocialNetworks}
          tableHeadersForSearch={[
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
          ]}
        />
      </div>
    </div>
  );
};

export default page;
