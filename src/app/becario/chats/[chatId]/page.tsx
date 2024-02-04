import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import ActivityScholarActions from '@/components/ActivityScholarActions';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { ChatWithSpeaker } from '@/lib/db/types';
import { getChatWithSpecificScholarAttendance } from '@/lib/db/utils/Workshops';
import { getNotEnrolledScholarsInChat } from '@/lib/db/utils/users';
import { getServerSession } from 'next-auth';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { chatId: shortUUID.SUUID } }) => {
  const se = await getServerSession(authOptions);
  const chatId = params.chatId || ('null' as shortUUID.SUUID);
  const attendance = await getChatWithSpecificScholarAttendance(chatId, se?.scholarId);
  const scholars = await getNotEnrolledScholarsInChat(chatId)
  const { chat } = attendance || {};
  const isDisabled = () => {
    if (attendance?.attendance! !== 'ENROLLED') return true
    else if (new Date(chat?.start_dates![0]!) <= new Date()) return true
    else if (chat?.activity_status !== 'SENT') return true
    else return false
  }

  return (
    <div className="min-h-screen">
      <ActivityPanelInfo activity={chat as ChatWithSpeaker}  >
        <div className='w-full flex  items-center justify-end'>
          Estatus de asistencia = {attendance?.attendance!}
          <ActivityScholarActions activityId={chatId} attendanceId={attendance?.id!} kindOfActivity='chat' scholars={scholars} isButtonDisabled={isDisabled()} />
        </div>
      </ActivityPanelInfo>
    </div>
  );
};

export default page;
