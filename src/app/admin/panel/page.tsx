import Card from '@/components/admin/dashboard/Card';
import Calendar from '@/components/calendar/Calendar';
import { getWorkshopsCountByStatus } from '@/lib/db/utils/Workshops';
import { getScholarsCountByCondition } from '@/lib/db/utils/users';
import { createDataCardsContent, getAndFormatCalendarEvents } from '@/lib/utils';
import { chatIcon, userIcon, volunterIcon, workshopIcon } from 'public/svgs/svgs';

const page = async () => {
  const workshopWithAttendanceCheckedCount = await getWorkshopsCountByStatus('ATTENDANCE_CHECKED');
  const workshopDoneCount = await getWorkshopsCountByStatus('DONE');
  const activeScholarsCount = await getScholarsCountByCondition('ACTIVE');
  const cardContent = createDataCardsContent([
    {
      icon: workshopIcon,
      text: 'Actividades formativas realizadas',
      number: workshopDoneCount + workshopWithAttendanceCheckedCount,
      bg: 'bg-gradient-to-r from-blue-700  to-indigo-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
    },
    {
      icon: chatIcon,
      text: 'Chats Realizados',
      number: 10,
      bg: 'bg-gradient-to-r from-red-500  to-red-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700',
    },
    {
      icon: volunterIcon,
      text: 'Horas de voluntariado realizadas',
      number: 10,
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

  const events = await getAndFormatCalendarEvents();
  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <div className="flex flex-col md:flex-row gap-4 items-center">
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
      <div className="h-full max-h-[680px] w-full overflow-x-clip rounded-md backdrop-filter backdrop-blur-3xl bg-opacity-40 bg-white dark:bg-black shadow-md p-2">
        <Calendar events={events.flat()} />
      </div>
    </div>
  );
};

export default page;
