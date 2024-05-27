import ChatForm from '@/components/admin/forms/chat/form';
import ScheduledCardsWrap from '@/components/scheduledActivitiesCard/ScheduledCardsWrap';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getScheduleChatsByScholar } from '@/lib/db/utils/chats';
import { getServerSession } from 'next-auth';
export const dynamic = 'force-dynamic';
const Page = async ({ searchParams }: { searchParams: { activityToEdit: string | null } }) => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const scheduledChats = await getScheduleChatsByScholar(session?.scholarId);

  const chat = scheduledChats.find((chat) => chat.id === searchParams.activityToEdit);
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 p-4 bg-gray-100 dark:bg-zinc-950 rounded-lg">
      <div className=" w-full md:w-1/2">
        <h1 className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
          Crear actividad chat club
        </h1>
        <div>
          <ChatForm
            valuesToUpdate={chat}
            kind={chat ? 'edit' : 'create'}
            key={chat?.id}
            showCreate={false}
            showSend={false}
            showEdit={chat ? true : false}
            showSchedule={chat ? false : true}
            defaultSpeakerId={session?.scholarId}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 pt-0 flex flex-col items-center ">
        <ScheduledCardsWrap activities={scheduledChats} canSend={false} />
      </div>
    </div>
  );
};

export default Page;
