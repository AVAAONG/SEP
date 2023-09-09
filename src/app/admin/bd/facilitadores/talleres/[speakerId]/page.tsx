import defailProfilePic from '@/../public/defaultProfilePic.png';
import NormalCard from '@/components/scholar/card/NormalCard';
import Table from '@/components/table/Table';
import speakerWorkshopsColumn from '@/components/table/columns/singleWorkshopSpeakerColumns';
import { getWorkshopSpeaker } from '@/lib/db/speaker';
import Image from 'next/image';
import Link from 'next/link';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../../../../../public/svgs/SocialNetworks';
import { CurriculumIcon, EmailIcon, PhoneIcon, Star, chatIcon, workshopIcon } from '../../../../../../../public/svgs/svgs';

const CARD_CONTENT = [
  {
    icon: workshopIcon,
    text: 'Actividades formativas realizadas',
    number: 15,
    bg: 'bg-gradient-to-r from-blue-700  to-indigo-900',
    cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
  },
  {
    icon: chatIcon,
    text: 'Total de becarios unicos',
    number: 20,
    bg: 'bg-gradient-to-r from-red-500  to-red-900',
    cardButtonBg: 'bg-indigo-950 active:bg-blue-700',
  },
  {
    icon: Star,
    text: 'Calificación promedio',
    number: 4.5,
    bg: 'from-yellow-500  to-yellow-700',
    cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
  },
];

const TEMPORAL_DATA = [
  {
    title: 'Taller de prueba',
    modality: 'Presencial',
    platform: 'Zoom',
    start_dates: '12/12/2021',
    asociated_skill: 'Liderazgo',
    rating: 4.5,
  },
  {
    title: 'Taller de prueba',
    modality: 'Presencial',
    platform: 'Zoom',
    start_dates: '12/12/2021',
    asociated_skill: 'Liderazgo',
    rating: 4.5,
  },
  {
    title: 'Taller de prueba',
    modality: 'Presencial',
    platform: 'Zoom',
    start_dates: '12/12/2021',
    asociated_skill: 'Liderazgo',
    rating: 1,
  },
  {
    title: 'Taller de prueba',
    modality: 'Presencial',
    platform: 'Zoom',
    start_dates: '12/12/2021',
    asociated_skill: 'Liderazgo',
    rating: 2,
  },
  {
    title: 'Taller de prueba',
    modality: 'Presencial',
    platform: 'Zoom',
    start_dates: '12/12/2021',
    asociated_skill: 'Liderazgo',
    rating: 4.5,
  },
  {
    title: 'Taller de prueba',
    modality: 'Presencial',
    platform: 'Zoom',
    start_dates: '12/12/2021',
    asociated_skill: 'Liderazgo',
    rating: 4.5,
  },
];

const speakerSearchOptions = [
  {
    option: 'title',
    label: 'Nombre',
  },
  {
    option: 'modality',
    label: 'Modalidad',
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
  const workshopSpeaker = await getWorkshopSpeaker(speakerId);
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
  } = workshopSpeaker;

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
  return (
    <section className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/4 lg:min-h-screen flex flex-col lg:justify-start items-center gap-4 ">
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
            <h1 className="text-2xl text-green-700 font-bold text-center flex items-center justify-center gap-2">
              <span>
                {first_names} {last_names}{' '}
              </span>
              {curriculum && (
                <Link href={curriculum} target="_blank" className="w-6 block">
                  <CurriculumIcon />
                </Link>
              )}
            </h1>{' '}
            <span className="text-gray-400 dark:text-gray-300 font-semibold uppercase text-center w-full ">
              {job_company}
            </span>
          </div>
          {description && (
            <div className="flex flex-col justify-center items-center gap-2 sm:gap-1 sm:justify-start sm:items-start ">
              <span className="text-base text-gray-400 dark:text-gray-300 font-semibold ">
                adsfknlkjdsa{' '}
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
          <div className="flex flex-col w-full text-sm gap-2 items-center justify-center">
            {phone_number && (
              <div className="w-full flex gap-2 items-center justify-center ">
                <div className="bg-gray-100 dark:bg-slate-600 p-2 w-9 rounded-full">
                  <PhoneIcon />
                </div>
                <span>{phone_number}</span>
              </div>
            )}
            {email && (
              <div className="w-full flex gap-2 items-center justify-center">
                <div className="bg-gray-100 dark:bg-slate-600 p-2 w-9 rounded-full">
                  <EmailIcon />
                </div>
                <span>{email}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col min-h-screen w-full lg:w-3/4 pl-4">
        <div className="flex gap-2 justify-center items-center mt-4">
          {CARD_CONTENT.map(({ icon, text, number, bg }) => {
            return <NormalCard key={text} stat={number} Icon={icon} text={text} bg={bg} />;
          })}
        </div>
        <div className="flex gap-2 justify-center items-center mt-20">
          <Table
            tableColumns={speakerWorkshopsColumn}
            tableData={TEMPORAL_DATA}
            tableHeadersForSearch={speakerSearchOptions}
          />
        </div>
      </div>
    </section>
  );
};

export default page;
