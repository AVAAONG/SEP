import defailProfilePic from '@/../public/defaultProfilePic.png';
import AreaChart from '@/components/charts/AreaChart';
import NormalCard from '@/components/scholar/card/NormalCard';

import { getScholarWithAllData } from '@/lib/db/utils/users';
import { createDataCardsContent } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'public/svgs/SocialNetworks';
import { EmailIcon, PhoneIcon, chatIcon, volunterIcon, workshopIcon } from 'public/svgs/svgs';

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
const page = async ({ params }: { params: { scholarId: string } }) => {
  const { scholarId } = params;
  const scholar = await getScholarWithAllData(scholarId);
  const {
    first_names,
    last_names,
    job_company,
    email,
    image,
    twitter_user,
    facebook_user,
    instagram_user,
    linkedin_user,
    program_information,
    local_phone_number,
    whatsapp_number,
    cell_phone_Number,
  } = scholar || {};
  const { attended_workshops, attended_chats } = program_information || {};
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
  const atendedWorkshops = attended_workshops?.filter(
    (workshop) => workshop.attendance === 'ATTENDED'
  );
  const cardContent = createDataCardsContent([
    {
      icon: workshopIcon,
      text: 'Actividades formativas',
      number: atendedWorkshops?.length || 0,
      bg: 'bg-gradient-to-r from-blue-700  to-indigo-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
    },
    {
      icon: chatIcon,
      text: 'Chats clubs',
      number: attended_chats?.length || 0,
      bg: 'bg-gradient-to-r from-red-500  to-red-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700',
    },
    {
      icon: volunterIcon,
      text: 'Horas de voluntariado',
      number: 0,
      bg: 'from-green-500  to-green-700',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
    },
  ]);

  const workshopsByMonth: Record<number, number> =
    attended_workshops?.reduce((acc, workshop) => {
      const month = new Date(workshop.workshop.start_dates[0]).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {}) || {};

  const workshops = attended_workshops?.map((workshop) => workshop.workshop) || [];

  // Add null values for months without workshops
  for (let month = 0; month < 12; month++) {
    if (!(month in workshopsByMonth)) {
      workshopsByMonth[month] = 0;
    }
  }

  const chartData = Object.entries(workshopsByMonth).map(([month, count]) => ({
    x: new Date(0, month),
    y: count,
  }));

  return (
    <section className="flex flex-col gap-4 ">
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full">
          <div className="w-52 flex items-center justify-center rounded-full shadow-lg border-4 border-green-500 p-1">
            <Image
              src={image ? image : defailProfilePic}
              alt="Imagen del facilitador"
              width={200}
              height={200}
              priority
              className="rounded-full"
            />
          </div>
          <div>
            <div className="flex flex-col justify-center items-center gap-1 sm:gap-1 w-full px-4">
              <h1 className="text-xl text-green-700 font-bold text-center flex items-center justify-center gap-2">
                <span>
                  {first_names} {last_names}{' '}
                </span>
              </h1>{' '}
            </div>
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
            <div className="flex text-sm gap-2 ">
              {cell_phone_Number && (
                <div className="w-full flex gap-2 items-center justify-center ">
                  <div className="bg-white dark:bg-slate-600 p-2 w-9 rounded-full">
                    <PhoneIcon />
                  </div>
                  {/* <span>{cell_phone_Number}</span> */}
                </div>
              )}
              {local_phone_number && (
                <div className="w-full flex gap-2 items-center justify-center ">
                  <div className="bg-white dark:bg-slate-600 p-2 w-9 rounded-full">
                    <PhoneIcon />
                  </div>
                  {/* <span>{local_phone_number}</span> */}
                </div>
              )}
              {email && (
                <div className=" bg-white rounded-full  flex gap-2 items-center justify-center">
                  <div className="bg-white dark:bg-slate-600 p-2 w-9 rounded-full">
                    <EmailIcon />
                  </div>
                  {/* <span>{email}</span> */}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col  w-full">
          <div className="flex gap-2 justify-center items-center mt-4">
            {cardContent.map(({ icon, text, number, bg }) => {
              return <NormalCard key={text} stat={number} Icon={icon} text={text} bg={bg} />;
            })}
          </div>
          <div className="mt-6">
            <AreaChart chartData={chartData} title="Actividades realizadas" xAxysType="datetime" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        {/* <Table
          tableColumns={singleScholarWorkshopsColumns}
          tableData={workshops || []}
          tableHeadersForSearch={speakerSearchOptions}
        /> */}
      </div>
    </section>
  );
};

export default page;
