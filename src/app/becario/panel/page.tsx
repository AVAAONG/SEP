import NextEventsList from '@/components/NextEventsList';
import Calendar from '@/components/calendar/Calendar';
import PanelCard, { PanelCardProps } from '@/components/commons/PanelCard';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import {
  getActivitiesWhenScholarItsEnrolled,
  getScholarDoneActivitiesCount,
} from '@/lib/db/utils/users';
import { formatActivityEventsForBigCalendar } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { chatIcon, volunterIcon, workshopIcon } from '../../../../public/svgs/svgs';

const page = async () => {
  const actualYear = new Date().getFullYear();
  const session = await getServerSession(authOptions);
  if (!session) return redirect('accessDenied');
  const id = session?.scholarId;
  const name = session?.user?.name?.split(' ')[0];
  const [doneWorkshopsCount, doneChatsCount, doneVolunteerCount] =
    await getScholarDoneActivitiesCount(id, actualYear);
  const [enrrolledWorkshops, enrrolledCHats] = await getActivitiesWhenScholarItsEnrolled(id);
  const events = formatActivityEventsForBigCalendar(
    [...enrrolledWorkshops, ...enrrolledCHats],
    'scholar'
  );
  const cardContent: PanelCardProps[] = [
    {
      title: 'Actividades formativas realizadas',
      subtitle: 'Ver todas las actividades',
      data: doneWorkshopsCount,
      link: 'actividadesFormativas',
      icon: workshopIcon(),
      kind: 'workshop',
    },
    {
      title: 'Chat clubs de inglés realizados',
      subtitle: 'Ver todos los chats',
      data: doneChatsCount,
      link: 'chats',
      icon: chatIcon(),
      kind: 'chat',
    },
    {
      title: 'Horas de voluntariado realizadas',
      subtitle: 'Ver todas las actividades',
      data: doneVolunteerCount,
      link: 'voluntariado',
      icon: volunterIcon(),
      kind: 'volunteer',
    },
  ];

  return (
    <div>
      <div className="flex flex-col px-2 gap-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            {name ? `¡Hola, ${name}! 💚` : `¡Hola! 💚`}
          </h1>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-3 items-center">
          {cardContent.map((card, index) => (
            <React.Fragment key={index}>{PanelCard(card)}</React.Fragment>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="items-end flex flex-col gap-1 h-full max-h-[680px] text-gray-800 capitalize dark:text-gray-300 shadow-sm overflow-x-clip w-full bg-white border border-gray-200  shadow-emerald-600 dark:border-emerald-800  dark:bg-slate-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 p-2">
            <Calendar events={events} />
          </div>
          <div className="w-full lg:w-1/4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm shadow-emerald-600 dark:border-emerald-800  dark:bg-slate-950">
            <NextEventsList activities={[...enrrolledWorkshops, ...enrrolledCHats]} />{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
