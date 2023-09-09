import Table from '@/components/table/Table';
import workshopSpeakerColumns from '@/components/table/columns/workshopSpeakerColumns';
import { getWorkshopSpeakersWithParams } from '@/lib/db/speaker';
import { Prisma } from '@prisma/client';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../../../../public/svgs/SocialNetworks';

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
    <div className="flex flex-col items-center">
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
