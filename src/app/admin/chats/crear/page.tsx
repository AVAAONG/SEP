import ScheduleChatCard from '@/components/ScheduleChatCard';
import ChatCreationForm from '@/components/admin/ChatCreationForm';
import { getChatSpeakerWithParams, getScheduleChats } from '@/lib/db/utils/chats';
import { Speaker } from '@prisma/client';
export const dynamic = 'force-dynamic';
const Page = async ({ searchParams }: { searchParams: { activityToEdit: string | null } }) => {
  const scheduledChats = await getScheduleChats();
  const speakers = await getChatSpeakerWithParams({
    id: true,
    first_names: true,
    last_names: true,
    email: true,
    image: true,
  });
  const chat = scheduledChats.find((chat) => chat.id === searchParams.activityToEdit);
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 p-4">
      <div className=" w-full md:w-1/2">
        <ChatCreationForm speakers={speakers as Speaker[]} chatForEdit={chat} />
      </div>
      <div className="w-full md:w-1/2 pt-0 flex flex-col items-center ">
        <ScheduleChatCard activities={scheduledChats} />
      </div>
    </div>
  );
};

export default Page;
