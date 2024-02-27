import defailProfilePic from '@/../public/defaultProfilePic.png';
import NormalCard from '@/components/scholar/card/NormalCard';
import Table from '@/components/table/Table';

import ChartComponent from '@/components/charts/AreaChart';
import singleChatSpeakerColumns from '@/components/table/columns/SinglechatSpeakerColumns';
import { getChatSpeakersWithChats } from '@/lib/db/utils/speaker';
import Image from 'next/image';
import Link from 'next/link';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../../../../public/svgs/SocialNetworks';
import { Star, chatIcon, workshopIcon } from '../../../../../../public/svgs/svgs';

const speakerSearchOptions = [
  {
    option: 'title',
    label: 'Nombre',
  },
  {
    option: 'asociated_skill',
    label: 'Competencia asociada',
  },
  {
    option: 'job_company',
    label: 'Organización',
  },
];
const page = async ({ params }: { params: { speakerId: string } }) => {
  const { speakerId } = params;
  const [workshopSpeaker, workshops] = await getChatSpeakersWithChats(speakerId);
  const {
    first_names,
    last_names,
    phone_number,
    job_company,
    email,
    description,
    curriculum,
    image,
    twitter_user,
    facebook_user,
    instagram_user,
    linkedin_user,
  } = workshopSpeaker || {};

  const uniqueScholars = [
    ...new Set(
      workshops?.flatMap(
        (workshop) =>
          workshop.scholar_attendance?.map((attendance) => {
            console.log(attendance);
            if (attendance.attendance === 'ATTENDED')
              return attendance.program_information_scholar_id;
          })
      ) ?? []
    ),
  ];

  const workshopSpeakerSocialNetwork = [
    {
      name: 'Twitter',
      url: `https://twitter.com/${twitter_user}`,
      icon: <TwitterIcon />,
      username: twitter_user,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/${facebook_user}`,
      icon: <FacebookIcon />,
      username: facebook_user,
    },
    {
      name: 'Instagram',
      url: `https://www.instagram.com/${instagram_user}`,
      icon: <InstagramIcon />,
      username: instagram_user,
    },
    {
      name: 'Linkedin',
      url: `https://www.linkedin.com/in/${linkedin_user}`,
      icon: <LinkedinIcon />,
      username: linkedin_user,
    },
  ];
  const cardContent = [
    {
      icon: workshopIcon,
      text: 'Chat clubs realizados',
      number: workshops?.length || 0,
      bg: 'bg-gradient-to-r from-blue-700  to-indigo-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
      activity: 'chats',
    },
    {
      icon: chatIcon,
      text: 'Becarios unicos impactados',
      number: uniqueScholars?.length || 0,
      bg: 'bg-gradient-to-r from-red-500  to-red-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700',
      activity: 'chats',
    },
    {
      icon: Star,
      text: 'Calificación promedio',
      number: 0,
      bg: 'from-yellow-500  to-yellow-700',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
      activity: 'chats',
    },
  ];

  const workshopsByMonth: Record<number, number> =
    workshops?.reduce((acc, workshop) => {
      const month = new Date(workshop.start_dates[0]).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {}) || {};

  // Add null values for months without workshops
  for (let month = 0; month < 12; month++) {
    if (!(month in workshopsByMonth)) {
      workshopsByMonth[month] = 0;
    }
  }

  const areaSeries = [
    {
      name: 'Meses de actividad',
      data: Object.entries(workshopsByMonth).map(([month, count]) => ({
        x: new Date(0, month),
        y: count,
      })),
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 flex flex-col lg:justify-start items-center gap-4 ">
          <div className="flex flex-col gap-4 justify-center items-center sm:flex-row lg:flex-col w-full">
            <div className="w-64 flex items-center justify-center rounded-full shadow-lg border-4 border-green-500 p-1">
              <Image
                src={image ? image : defailProfilePic}
                alt="Imagen del facilitador"
                width={250}
                height={250}
                priority
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-1 sm:gap-1 w-full px-4">
              <div className="flex items-center justify-center gap-1 w-full">
                <h1 className="text-2xl text-green-700 font-bold text-center flex items-center justify-center gap-2">
                  {first_names} {last_names}{' '}
                </h1>
              </div>
              <span className="text-gray-400 dark:text-gray-300 font-semibold uppercase text-center w-full ">
                {job_company}
              </span>
            </div>
            {description && (
              <div className="flex flex-col justify-center items-center gap-2 sm:gap-1 sm:justify-start sm:items-start ">
                <span className="text-base text-gray-400 dark:text-gray-300 font-semibold ">
                  {description}
                </span>
              </div>
            )}
            <div className="flex flex-row gap-4">
              {workshopSpeakerSocialNetwork.map(
                ({ url, icon, username }, index) =>
                  username && (
                    <Link
                      target="_blank"
                      href={url}
                      className="w-9 text-green-700 dark:text-green-400 rounded-full  bg-gray-100 dark:bg-slate-600 p-2"
                      key={index}
                    >
                      {icon}
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col  w-full lg:w-3/4 pl-4">
          <div className="flex gap-2 justify-center items-center mt-4">
            {cardContent.map(({ icon, text, number, bg }) => {
              return <NormalCard key={text} stat={number} Icon={icon} text={text} bg={bg} />;
            })}
          </div>
          <div className="mt-6">
            <ChartComponent
              series={areaSeries}
              title="Chat clubs realizados"
              xAxysType="datetime"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <Table
          tableColumns={singleChatSpeakerColumns}
          tableData={workshops || []}
          tableHeadersForSearch={speakerSearchOptions}
        />
      </div>
    </section>
  );
};

export default page;
