import Card from '@/components/admin/dashboard/Card';
import Calendar from '@/components/calendar/Calendar';
import { createDashboardCardContent, getAndFormatCalendarEvents } from '@/lib/utils';

const page = async () => {
  // const workshopCount = await getWorkshopsCount();
  // const scholarsCount = await getScholarsCount();
  // const chatsCount = await getChatsCount();
  const cardContent = createDashboardCardContent(12, 12, 0, 205);
  const events = await getAndFormatCalendarEvents();
  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <div className="flex flex-col md:flex-row gap-4 items-center ">
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
      <div className="h-full max-h-[680px] overflow-x-clip rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 bg-white dark:bg-black shadow-md p-2">
        <Calendar events={events.flat()} />
      </div>
    </div>
  );
};

export default page;