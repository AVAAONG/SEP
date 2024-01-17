import ChatSpeakerFormCreation from '@/components/admin/SpeakerCreationForm/ChatSpeakerFormCreation';
import Table from '@/components/table/Table';
import chatSpeakerColumns from '@/components/table/columns/chatSpeakerColumns';
import { prisma } from '@/lib/db/utils/prisma';
import { getChatSpeakersCountByGender, getChatSpeakersWithParams } from '@/lib/db/utils/speaker';
import { Prisma } from '@prisma/client';
import { userIcon } from 'public/svgs/svgs';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../../../public/svgs/SocialNetworks';

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
  const chatSpeakers = await getChatSpeakersWithParams(toSelect);
  const scholars = await prisma.scholar.findMany({
    orderBy: {
      first_names: 'asc',
    },
  });
  const chattSpeakersWithSocialNetworks = chatSpeakers?.map((workshopSpeaker) => {
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
  const [chatSpeakerWomanCount, chatSpeakerManCount] = await getChatSpeakersCountByGender();
  return (
    <div className="flex flex-col items-center w-full gap-6">
      <div className="px-4 flex items-center justify-center  flex-col md:flex-row gap-4 w-full">
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
            <p className="text-2xl font-semibold text-gray-900">{chatSpeakers?.length}</p>
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
            <p className="text-2xl font-semibold text-gray-900">{chatSpeakerWomanCount}</p>
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
            <p className="text-2xl font-semibold text-gray-900">{chatSpeakerManCount}</p>
          </dd>
        </div>
        <div className="flex">
          <ChatSpeakerFormCreation scholars={scholars} />
        </div>
      </div>
      <div className="w-full h-fit">
        <Table
          tableColumns={chatSpeakerColumns}
          tableData={chattSpeakersWithSocialNetworks || []}
          tableHeadersForSearch={tableHeaders}
        />
      </div>
    </div>
  );
};

export default page;
