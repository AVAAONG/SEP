import NextEventsList from '@/components/NextEventsList';
import Card from '@/components/admin/dashboard/Card';
import Calendar from '@/components/calendar/Calendar';
import { WORKSHOP_CALENDAR_EVENT_COLORS } from '@/lib/constants';
import { getWorkshopByStatus } from '@/lib/db/utils/Workshops';
import { getDoneActivities } from '@/lib/db/utils/activities';
import { getScholarsCountByCondition } from '@/lib/db/utils/users';
import { createDataCardsContent, formatEventObjectForBigCalendar } from '@/lib/utils';
import { chatIcon, userIcon, volunterIcon, workshopIcon } from 'public/svgs/svgs';

const page = async () => {
  const [workshopDoneCount, chatsDoneCount] = await getDoneActivities();
  const activeScholarsCount = await getScholarsCountByCondition('ACTIVE');

  const cardContent = createDataCardsContent([
    {
      icon: workshopIcon,
      text: 'Actividades formativas realizadas',
      number: workshopDoneCount,
      bg: 'bg-gradient-to-r from-blue-700  to-indigo-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
    },
    {
      icon: chatIcon,
      text: 'Chats Realizados',
      number: chatsDoneCount,
      bg: 'bg-gradient-to-r from-red-500  to-red-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700',
    },
    {
      icon: volunterIcon,
      text: 'Horas de voluntariado realizadas',
      number: 0,
      bg: ' from-green-600  to-emerald-800',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700',
    },
    {
      icon: userIcon,
      text: 'Becarios activos',
      number: activeScholarsCount,
      bg: 'from-yellow-500  to-yellow-700',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
    },
  ]);
  const scheduledWorkshops = await getWorkshopByStatus('SCHEDULED');
  const events = () => {
    const workshopEvents = formatEventObjectForBigCalendar(
      scheduledWorkshops,
      WORKSHOP_CALENDAR_EVENT_COLORS,
      '#3B82F6'
    );
    return workshopEvents;
  };
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex flex-col md:flex-row gap-3 items-center md:bg-white dark:bg-black rounded-lg md:p-2 shadow-md">
        {cardContent.map(({ icon, text, number, bg, cardButtonBg }) => {
          return (
            <Card
              key={text}
              stat={number}
              Icon={icon}
              text={text}
              bg={bg}
              cardButtonBg={cardButtonBg}
            />
          );
        })}
      </div>
      <div className="flex flex-col lg:flex-row gap-2 ">
        <div className="h-full max-h-[680px] w-full overflow-x-clip rounded-md backdrop-filter backdrop-blur-3xl bg-white dark:bg-black shadow-md p-2">
          <Calendar events={events()} />
        </div>
        <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md backdrop-filter backdrop-blur-3xl dark:bg-black max-h-[680px] overflow-y-scroll">
          <NextEventsList activities={scheduledWorkshops} />
        </div>
      </div>
    </div>
  );
};

export default page;
