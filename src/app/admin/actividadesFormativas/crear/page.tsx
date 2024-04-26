import WorkshopForm from '@/components/admin/forms/workshop/form';
import ScheduledCardsWrap from '@/components/scheduledActivitiesCard/ScheduledCardsWrap';
import { getScheduledWorkshops } from '@/lib/db/utils/Workshops';
import { getWorkshopSpeakersWithParams } from '@/lib/db/utils/speaker';
import { Speaker } from '@prisma/client';
export const dynamic = 'force-dynamic';
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
        <WorkshopForm speakers={speakers as Speaker[]} workshopForEdit={workshop} kind="create" />
      </div>
      <div className="w-full md:w-1/2 pt-0 flex flex-col items-center">
        <ScheduledCardsWrap activities={scheduledWorkshops} />
      </div>
    </div>
  );
};

export default Page;
