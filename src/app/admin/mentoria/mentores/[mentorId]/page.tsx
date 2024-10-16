import defailProfilePic from '@/../public/defaultProfilePic.png';

import IconWithInfo from '@/components/commons/IconInWithInformation';
import { getMentor } from '@/lib/db/utils/mentors';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@nextui-org/react';
import { Mentor } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import {
  CellPhoneIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../../../../public/svgs/SocialNetworks';
import { AddressIcon, CurriculumIcon, EmailIcon } from '../../../../../../public/svgs/svgs';

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
    facebook_profile,
    twitter_profile,
    instagram_profile,
    linkedin_profile,
    image,
    curriculum,
    company,
    cell_phone,
    email,
    company_position,
    profession,
    motivation,
    areas_of_interest,
    city_of_residence,
    hobbies,
    how_know_avaa,
    status,
    tiktok_profile,
    birthdate,
    other_activities,
  } = mentor as Mentor;

  const workshopSpeakerSocialNetwork = [
    {
      name: 'Twitter',
      url: `https://twitter.com/${twitter_profile}`,
      icon: <TwitterIcon />,
      username: twitter_profile,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/${facebook_profile}`,
      icon: <FacebookIcon />,
      username: facebook_profile,
    },
    {
      name: 'Instagram',
      url: `https://www.instagram.com/${instagram_profile}`,
      icon: <InstagramIcon />,
      username: instagram_profile,
    },
    {
      name: 'Linkedin',
      url: `https://www.linkedin.com/in/${linkedin_profile}`,
      icon: <LinkedinIcon />,
      username: linkedin_profile,
    },
  ];

  const scholarContactData = [
    {
      name: 'Celular',
      value: cell_phone,
      icon: <CellPhoneIcon />,
    },
    {
      name: 'Correo',
      value: email,
      icon: <EmailIcon />,
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row gap-6 min-h-screen">
      <div className="w-full lg:w-1/4 flex flex-col lg:justify-start items-center gap-4 ">
        <div className="flex flex-col gap-4 justify-center items-center sm:flex-row lg:flex-col w-full">
          <div className="w-64 flex items-center justify-center rounded-full shadow-lg border-4 border-green-500 p-1">
            <Image
              src={image ? image : defailProfilePic}
              alt="Imagen del facilitador"
              width={250}
              height={250}
              priority
              className="rounded-full "
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-1 sm:gap-1 w-full px-1">
            <div className="flex text-green-700 gap-1  items-center">
              <h1 className="text-2xl w-full font-bold text-center flex items-center justify-center gap-2">
                {first_name} {last_name}{' '}
              </h1>
              {curriculum && (
                <Link href={curriculum} target="_blank" className="w-6 block">
                  <CurriculumIcon />
                </Link>
              )}
            </div>
            <span className="text-gray-400 dark:text-gray-300 font-semibold uppercase text-center w-full ">
              {company} | {company_position}
            </span>
          </div>
          <Tooltip content="Fecha de nacimiento">
            <div className="text-sm flex gap-1 items-center ">
              <div className="w-5 h-5  text-primary-dark">
                <CalendarIcon />
              </div>
              {birthdate?.toLocaleString('es-ES', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              <span className="text-primary-light font-medium">
                ({new Date().getFullYear() - birthdate?.getFullYear()!} años)
              </span>
            </div>
          </Tooltip>

          <Tooltip content="Ciudad de residencia">
            <div className="text-sm flex gap-1 items-center  text-primary-dark">
              <div className="w-5 h-5">
                <AddressIcon />
              </div>
              {city_of_residence}
            </div>
          </Tooltip>

          <div className="flex flex-row gap-4">
            {scholarContactData.map(({ value, icon }, index) => {
              return <IconWithInfo key={index} value={value!} icon={icon} />;
            })}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/4 bg-white rounded-lg p-6 ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-green-700">Profesión</h2>
              <p>{profession}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-green-700">Motivación para ser mentor</h2>
              <p className="">{motivation}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-green-700">Áreas de interés</h2>
              <p className="">{areas_of_interest}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-green-700">Hobbies</h2>
              <p className="">{hobbies}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-green-700">Otras actividades</h2>
              <p className="">{other_activities}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-green-700">
                ¿Cómo se enteró sobre el componente de Mentoría AVAA?
              </h2>
              <p className="">{how_know_avaa}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-green-700">Redes sociales</h2>
            <div className="flex flex-row gap-4 text-black">
              {workshopSpeakerSocialNetwork.map(({ url, icon, name, username }, index) => {
                return (
                  <Link
                    target="_blank"
                    href={url ? url : ''}
                    className="w-9 text-primary-light dark:text-primary-light rounded-full bg-light dark:bg-slate-600 p-2"
                  >
                    {icon}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
