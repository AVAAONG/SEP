'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { ChatWithSpeaker, WorkshopWithSpeaker } from '@/lib/db/types';
import { parsePlatformFromDatabase } from '@/lib/utils2';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import DisplayTime from './DisplayTime';
import ActivityStatusIndicator from './table/ActivityStatus';

interface ActivityPanelInfoProps {
  activity: WorkshopWithSpeaker | ChatWithSpeaker;
  children: React.ReactNode;
}

const ActivityPanelInfo: React.FC<ActivityPanelInfoProps> = ({ activity, children }) => {
  const {
    title,
    start_dates,
    end_dates,
    description,
    speaker,
    modality,
    activity_status,
    meeting_id,
    meeting_link,
    meeting_password,
    platform,
  } = activity;
  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-0 rounded-lg bg-white dark:bg-gray-900 p-8 ">
      <div className="space-y-3 w-full md:w-1/2 ">
        <div className="flex flex-col space-y-2 ">
          <div className="flex gap-2 items-center">
            <div className="w-fit font-medium px-2">
              {'level' in activity ? 'Chat club' : 'Actividad formativa'}
            </div>
            <div>
              <ActivityStatusIndicator status={activity_status!} />
            </div>
          </div>
          <h1 className="italic text-xl font-bold leading-none tracking-tight text-primary-light md:text-3xl">
            {title}
          </h1>
        </div>
        <h2 className="text-xl  font-semibold text-primary-light">Fechas:</h2>
        <div className="space-y-4">
          <div className="flex space-x-4">
            {start_dates?.map((date, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col space-y-2 border-l-2 border-primartext-primary-light pl-1.5 sm:pl-3"
                >
                  <div className="space-y-sm">
                    <h3 className="text-sm leading-6 text-secondary">Fecha {index + 1}:</h3>
                    <p className="text-base font-semibold">{moment(date).format('L')}</p>
                  </div>
                  <div className="space-y-sm">
                    <h3 className="text-sm leading-6 text-secondary">
                      Hora de inicio {index + 1}:
                    </h3>
                    <p className="text-base font-semibold">
                      <DisplayTime time={date.toISOString()} />
                    </p>
                  </div>
                  <div className="space-y-sm">
                    <h3 className="text-sm leading-6 text-secondary">
                      Hora de cierre {index + 1}:
                    </h3>
                    <p className="text-base font-semibold">
                      <DisplayTime time={end_dates[index].toISOString()} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-primary-light">
              {modality === 'ONLINE' ? 'Plataforma' : 'Lugar'}
            </h3>
            <p className="text-base font-semibold capitalize">
              {parsePlatformFromDatabase(platform)}
            </p>
            {meeting_id.map((id, index) => (
              <div>
                <div className="flex gap-3">
                  <p className="font-bold">Link de la reunion</p>
                  <Link href={meeting_link[index]}>
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 text-primary-light cursor-pointer" />
                  </Link>
                </div>
                <div className="flex gap-3">
                  <p className="font-bold">Id de la reunion</p>
                  <p>{id}</p>
                </div>
                <div className="flex gap-3">
                  <p className="font-bold">Contraseña de la reunion</p>
                  <p>{meeting_password[index]}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            {description && (
              <h2 className="text-xl  font-semibold text-primary-light">Descripción:</h2>
            )}{' '}
            <p className="text-sm list-disc space-y-sm w-full">{description}</p>
          </div>
        </div>
        <div className="w-full space-y-3">
          <h2 className="text-xl font-semibold text-primary-light">
            {speaker && speaker.length && speaker.length >= 2 ? 'Facilitadores' : 'Facilitador'}
          </h2>
          <div className="flex flex-col space-y-4">
            {speaker?.map((s) => (
              <div key={s.id} className="flex items-center space-x-2">
                <div className="h-9 w-9 shrink-0">
                  <Image
                    alt={s.first_names}
                    loading="lazy"
                    src={s.image || defailProfilePic}
                    className="max-h-[72px] overflow-hidden rounded-full"
                    width="72"
                    height="72"
                  />
                </div>
                <div className="space-y-sm">
                  <div>
                    <h3 className="text-sm font-semibold">
                      {s.first_names} {s.last_names}
                    </h3>
                    <h4 className="text-xs uppercase">{s.job_company}</h4>
                    <p className="text-sm">{s.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 ">{children}</div>
    </section>
  );
};

export default ActivityPanelInfo;
