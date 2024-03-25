import NextEventsList from '@/components/NextEventsList';
import Calendar from '@/components/calendar/Calendar';
import PanelCard, { PanelCardProps } from '@/components/commons/PanelCard';
import { getActivitiesByYear } from '@/lib/db/utils/Workshops';
import { getScholarsCountByCondition } from '@/lib/db/utils/users';
import { formatActivityEventsForBigCalendar } from '@/lib/utils';
import { Chat, Workshop } from '@prisma/client';
import { chatIcon, userIcon, workshopIcon } from 'public/svgs/svgs';

const page = async () => {
  const actualYear = new Date().getFullYear();
  const activeScholarsCount = await getScholarsCountByCondition('ACTIVE', 'Rokk6_XCAJAg45heOEzYb');
  const [workshops, chats] = await getActivitiesByYear(actualYear);
  const events = formatActivityEventsForBigCalendar([...workshops, ...chats], 'admin');
  const sentActivities: (Workshop | Chat)[] = [...workshops, ...chats]
    .filter((activity) => activity.activity_status === 'SENT')
    .sort((a, b) => new Date(a.start_dates[0]).getTime() - new Date(b.start_dates[0]).getTime());

  const workshopDoneCount = workshops.filter(
    (workshop) => workshop.activity_status === 'ATTENDANCE_CHECKED'
  ).length;
  const chatsDoneCount = chats.filter(
    (chat) => chat.activity_status === 'ATTENDANCE_CHECKED'
  ).length;

  const cardContent: PanelCardProps[] = [
    {
      title: 'Actividades formativas realizadas',
      subtitle: 'Ver todas las actividades',
      data: workshopDoneCount,
      link: 'actividadesFormativas',
      icon: workshopIcon(),
      kind: 'workshop',
    },
    {
      title: 'Chat clubs de inglés realizados',
      subtitle: 'Ver todos los chats',
      data: chatsDoneCount,
      link: 'chats',
      icon: chatIcon(),
      kind: 'chat',
    },
    {
      title: 'Horas de voluntariado realizadas',
      subtitle: 'Ver todas las actividades',
      data: 0,
      link: 'voluntariado',
      icon: workshopIcon(),
      kind: 'volunteer',
    },
    {
      title: 'Total de becarios activos',
      subtitle: 'Ver base de datos de becarios',
      data: activeScholarsCount,
      link: 'becarios',
      icon: userIcon(),
      kind: 'scholar',
    },
  ];
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="w-full flex flex-col md:flex-row gap-3 items-center">
        {cardContent.map((card) => PanelCard(card))}
      </div>
      <div className="flex flex-col lg:flex-row gap-2 ">
        <div className="h-full max-h-[680px] w-full overflow-x-clip rounded-md backdrop-filter backdrop-blur-3xl bg-white dark:bg-black shadow-md p-2">
          <Calendar events={events} />
        </div>
        <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md backdrop-filter backdrop-blur-3xl dark:bg-black max-h-[680px] overflow-y-scroll">
          <NextEventsList activities={sentActivities as (Workshop | Chat)[]} />
        </div>
      </div>
    </div>
  );
};

export default page;
