import ScheduleChatCard from '@/components/ScheduleChatCard';
import WorkshopCreationForm from '@/components/admin/WorkshopCreationForm';
import { getScheduledWorkshops } from '@/lib/db/utils/Workshops';
import { getWorkshopSpeakersWithParams } from '@/lib/db/utils/speaker';
import { Speaker } from '@prisma/client';

const Page = async ({ searchParams }: { searchParams: { activityToEdit: string | null } }) => {
  const scheduledWorkshops = await getScheduledWorkshops();
  const speakers = await getWorkshopSpeakersWithParams({
    id: true,
    first_names: true,
    last_names: true,
    email: true,
    image: true,
  });

  const workshop = scheduledWorkshops.find((chat) => chat.id === searchParams.activityToEdit);

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 p-4">
      <div className=" w-full md:w-1/2">
        <WorkshopCreationForm speakers={speakers as Speaker[]} workshopForEdit={workshop} />
      </div>
      <div className="w-full md:w-1/2 pt-0 flex flex-col items-center">
        <ScheduleChatCard activities={scheduledWorkshops} />
      </div>
    </div>
  );
};

export default Page;
