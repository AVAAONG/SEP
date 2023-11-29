import defailProfilePic from '@/../public/defaultProfilePic.png';

import { getMentor } from '@/lib/db/utils/mentors';
import Image from 'next/image';
import Link from 'next/link';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../../../../public/svgs/SocialNetworks';
import { CurriculumIcon, EmailIcon, PhoneIcon } from '../../../../../../public/svgs/svgs';

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
const page = async ({ params }: { params: { mentorId: string } }) => {
  const { mentorId } = params;
  const mentor = await getMentor(mentorId);
  const {
    first_name,
    last_name,
    twitter_user,
    facebook_user,
    instagram_user,
    linkedin_user,
    image,
    curriculum,
    company,
    cell_phone,
    email,
  } = mentor;

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
              <h1 className="text-2xl text-green-700 font-bold text-center flex items-center justify-center gap-2">
                <span>
                  {first_name} {last_name}{' '}
                </span>
                {curriculum && (
                  <Link href={curriculum} target="_blank" className="w-6 block">
                    <CurriculumIcon />
                  </Link>
                )}
              </h1>{' '}
              <span className="text-gray-400 dark:text-gray-300 font-semibold uppercase text-center w-full ">
                {company}
              </span>
            </div>
            {/* {description && (
              <div className="flex flex-col justify-center items-center gap-2 sm:gap-1 sm:justify-start sm:items-start ">
                <span className="text-base text-gray-400 dark:text-gray-300 font-semibold ">
                  adsfknlkjdsa{' '}
                </span>
              </div>
            )} */}
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
              {cell_phone && (
                <div className="w-full flex gap-2 items-center justify-center ">
                  <div className="bg-gray-100 dark:bg-slate-600 p-2 w-9 rounded-full">
                    <PhoneIcon />
                  </div>
                  <span>{cell_phone}</span>
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
        <div className="flex flex-col  w-full lg:w-3/4 pl-4">
          {/* <div className="flex gap-2 justify-center items-center mt-4">
            {cardContent.map(({ icon, text, number, bg }) => {
              return <NormalCard key={text} stat={number} Icon={icon} text={text} bg={bg} />;
            })}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default page;
