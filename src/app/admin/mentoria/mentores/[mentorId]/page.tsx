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
  InstagramIcon,
  LinkedinIcon,
} from '../../../../../../public/svgs/SocialNetworks';
import { AddressIcon, CurriculumIcon, EmailIcon } from '../../../../../../public/svgs/svgs';

const page = async ({ params }: { params: { mentorId: string } }) => {
  const { mentorId } = params;
  const mentor = await getMentor(mentorId);
  const {
    first_name,
    last_name,
    instagram,
    linkedin,
    photo,
    cv,
    company,
    phone,
    email,
    position,
    residence,
    birth_date,
  } = mentor as Mentor;

  const workshopSpeakerSocialNetwork = [
    {
      name: 'Instagram',
      url: `https://www.instagram.com/${instagram}`,
      icon: <InstagramIcon />,
      username: instagram,
    },
    {
      name: 'Linkedin',
      url: `${linkedin}`,
      icon: <LinkedinIcon />,
      username: linkedin,
    },
  ];

  const scholarContactData = [
    {
      name: 'Celular',
      value: phone,
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
              src={
                photo
                  ? `${photo}?sp=r&st=2024-02-08T16:10:32Z&se=2034-02-09T00:10:32Z&spr=https&sv=2022-11-02&sr=c&sig=m%2B0OpD98j6ZoUyhkBCX1Zotm%2BrwC5Pt2%2FO6bvDQfCJk%3D`
                  : defailProfilePic
              }
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
              {cv && (
                <Link href={cv} target="_blank" className="w-6 block">
                  <CurriculumIcon />
                </Link>
              )}
            </div>
            <span className="text-gray-400 dark:text-gray-300 font-semibold uppercase text-center w-full ">
              {company} | {position}
            </span>
          </div>
          <Tooltip content="Fecha de nacimiento">
            <div className="text-sm flex gap-1 items-center ">
              <div className="w-5 h-5  text-primary-dark">
                <CalendarIcon />
              </div>
              {birth_date?.toLocaleString('es-ES', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              <span className="text-primary-light font-medium">
                ({new Date().getFullYear() - birth_date?.getFullYear()!} años)
              </span>
            </div>
          </Tooltip>

          <Tooltip content="Ciudad de residencia">
            <div className="text-sm flex gap-1 items-center  text-primary-dark">
              <div className="w-5 h-5">
                <AddressIcon />
              </div>
              {residence}
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
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
          <ProfileField label="Cedula de identidad" value={mentor?.id_number} />
          <ProfileField label="Genero" value={mentor?.gender || 'Not specified'} />
          <ProfileField label="Profesion" value={mentor?.profession} />
          <ProfileField label="Empleado" value={mentor?.employed ? 'Yes' : 'No'} />
          <ProfileField label="Empresa" value={mentor?.company || 'N/A'} />
          <ProfileField label="Posicion" value={mentor?.position || 'N/A'} />
          <div className="md:col-span-3">
            <ProfileField label="Experiencia laboral" value={mentor?.work_experience} />
          </div>
          <div className="md:col-span-3">
            <ProfileField
              label="Experiencia relacionada"
              value={mentor?.related_experience || 'N/A'}
            />
          </div>
          <div className="md:col-span-3">
            <ProfileField label="Otras actividades" value={mentor?.other_activities || 'N/A'} />
          </div>
          <ProfileField
            label="Habla otro idioma?"
            value={mentor?.speaks_other_lang ? 'Yes' : 'No'}
          />
          <ProfileField label="Idioma" value={mentor?.other_lang || 'N/A'} />
          <ProfileField label="Nivel" value={mentor?.lang_level || 'N/A'} />
          <ProfileField label="Interests" value={mentor?.interests} />
          <ProfileField label="Hobbies" value={mentor?.hobbies} />
          <div className="md:col-span-3">
            <ProfileField
              label="Razones por las cuales quiere pertenecer al programa"
              value={mentor?.mentor_reason}
            />
          </div>
          <ProfileField
            label="Experiencia previa como mentor"
            value={mentor?.prev_mentor_exp ? 'Yes' : 'No'}
          />
          <div className="md:col-span-3">
            <ProfileField
              label="Descripcion de experiencia previa como mentor"
              value={mentor?.prev_mentor_desc || 'N/A'}
            />
          </div>

          <div className="md:col-span-3">
            <ProfileField label="Habilidades y fortalezas" value={mentor?.skills_strengths} />
          </div>
          <div className="md:col-span-3">
            <ProfileField label="Tecnicas de confianza" value={mentor?.trust_techniques} />
          </div>
          <div className="md:col-span-3">
            <ProfileField label="Ayuda al mentee" value={mentor?.mentee_support} />
          </div>
          <ProfileField label="Compromiso de tiempo" value={mentor?.time_commitment} />
          <div className="md:col-span-3">
            <ProfileField label="Mentee ideal" value={mentor?.ideal_mentee} />
          </div>
          <ProfileField
            label="Actividades grupales"
            value={mentor?.group_activities ? 'Yes' : 'No'}
          />
          <ProfileField label="Como se entero del programa" value={mentor?.referral_source} />
          <ProfileField
            label="Completo la certificacion del IESA"
            value={mentor?.iesa_cert ? 'Yes' : 'No'}
          />
          <ProfileField
            label="Fecha de la certificacion del IESA"
            value={mentor?.iesa_cert_date?.toDateString() || 'N/A'}
          />
          <ProfileField label="Estatus de captacion" value={mentor?.recruitment_status} />
          <ProfileField label="Observaciones" value={mentor?.recruitment_observation || 'N/A'} />
          <ProfileField label="Estatus" value={mentor?.status} />
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
    </section>
  );
};

export default page;
function ProfileField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-lg font-medium text-primary-light">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}
