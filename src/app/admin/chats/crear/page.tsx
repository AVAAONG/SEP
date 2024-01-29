import ScheduleChatCard from '@/components/ScheduleChatCard';
import ChatCreationForm from '@/components/admin/ChatCreationForm';
import { getChatSpeakerWithParams, getScheduleChats } from '@/lib/db/utils/chats';
import chatCreationFormSchema from '@/lib/schemas/chatCreationFormSchema';
import { Speaker } from '@prisma/client';
import moment from 'moment';
import { z } from 'zod';

const Page = async ({ searchParams }: { searchParams: { editChatId: string | null } }) => {
  const scheduledChats = await getScheduleChats();
  const speakers = await getChatSpeakerWithParams({
    id: true,
    first_names: true,
    last_names: true,
    email: true,
    image: true,
  });

  const getChatsForEdit = (): z.infer<typeof chatCreationFormSchema> | null => {
    if (searchParams.editChatId) {
      const chatForEdit = scheduledChats.find(
        (chat) => chat.id === searchParams.editChatId
      );
      return {
        title: chatForEdit?.title ?? '',
        dates: [
          {
            date: moment(chatForEdit?.start_dates[0]).format('YYYY-MM-DD'),
            startHour: moment(chatForEdit?.start_dates[0]).format('HH:mm'),
            endHour: moment(chatForEdit?.end_dates[0]).format('HH:mm'),
          },
        ],
        modality: chatForEdit?.modality!,
        speakersId: chatForEdit?.speaker.map((speaker) => speaker.id).toString()!,
        platformInPerson: chatForEdit?.platform ?? '',
        platformOnline: chatForEdit?.platform ?? '',
        description: chatForEdit?.description ?? undefined,
        avalible_spots: chatForEdit?.avalible_spots ?? 0,
        level: chatForEdit?.level!,
      };
    } else {
      return null;
    }
  };
  const chat = getChatsForEdit();
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 p-4">
      <div className=" w-full md:w-1/2">
        <ChatCreationForm speakers={speakers as Speaker[]} chatForEdit={chat} chatForEditId={searchParams.editChatId || undefined} />
      </div>
      <div className='w-full md:w-1/2 pt-0 flex flex-col items-center '>
        <ScheduleChatCard activities={scheduledChats} />
      </div>
    </div>
  );
};

export default Page;
