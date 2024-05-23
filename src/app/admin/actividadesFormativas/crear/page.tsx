import WorkshopForm from '@/components/admin/forms/workshop/form';
import ScheduledCardsWrap from '@/components/scheduledActivitiesCard/ScheduledCardsWrap';
import { getScheduledWorkshops } from '@/lib/db/utils/Workshops';
export const dynamic = 'force-dynamic';
const Page = async ({ searchParams }: { searchParams: { activityToEdit: string | null } }) => {
  const workshopToEditId = searchParams.activityToEdit;
  const scheduledWorkshops = await getScheduledWorkshops();
  const workshop = scheduledWorkshops.find((workshop) => workshop.id === workshopToEditId);
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 p-4">
      <div className=" w-full md:w-1/2">
        <h1 className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
          Crear actividad formativa
        </h1>
        <div>
          <WorkshopForm
            key={workshop?.id} // Add this line
            valuesToUpdate={workshop}
            kind={workshop ? 'edit' : 'create'}
            showCreate={workshop ? false : true}
            showEdit={workshop ? true : false}
            showSchedule={workshop ? false : true} // Add this line
            showSend={workshop ? false : true}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 pt-0 flex flex-col items-center">
        <ScheduledCardsWrap activities={scheduledWorkshops} />
      </div>
    </div>
  );
};

export default Page;
