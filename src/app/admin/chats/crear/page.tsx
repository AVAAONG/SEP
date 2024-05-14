import ChatForm from '@/components/admin/forms/chat/form';
import ScheduledCardsWrap from '@/components/scheduledActivitiesCard/ScheduledCardsWrap';
import { getScheduleChats } from '@/lib/db/utils/chats';
export const dynamic = 'force-dynamic';
const Page = async ({ searchParams }: { searchParams: { activityToEdit: string | null } }) => {
  const scheduledChats = await getScheduleChats();

  const chat = scheduledChats.find((chat) => chat.id === searchParams.activityToEdit);
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 p-4">
      <div className=" w-full md:w-1/2">
        <h1 className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
          Crear actividad chat club
        </h1>
        <div>
          <ChatForm valuesToUpdate={chat} kind={chat ? 'edit' : 'create'} key={chat?.id} // Add this line
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 pt-0 flex flex-col items-center ">
        <ScheduledCardsWrap activities={scheduledChats} />
      </div>
    </div>
  );
};

export default Page;
