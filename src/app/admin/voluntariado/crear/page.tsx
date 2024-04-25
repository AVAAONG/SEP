import VolunteerForm from '@/components/admin/forms/volunteer/form';
import MainScheduledCard from '@/components/scheduledActivitiesCard/ScheduledCard';
import ScheduledCardsWrap from '@/components/scheduledActivitiesCard/ScheduledCardsWrap';
import { getScheduledVolunteers } from '@/lib/db/utils/volunteer';

export const dynamic = 'force-dynamic';
const Page = async ({ searchParams }: { searchParams: { activityToEdit: string | null } }) => {
  const scheduledVolunteer = await getScheduledVolunteers();
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 p-4">
      <div className=" w-full md:w-1/2">
        <h1 className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
          Crear actividad de voluntariado
        </h1>
        <div>
          <VolunteerForm kind="create" />
        </div>
      </div>
      <div className="w-full md:w-1/2 pt-0 flex flex-col items-center ">
        <ScheduledCardsWrap activities={scheduledVolunteer} />
      </div>
    </div>
  );
};

export default Page;
