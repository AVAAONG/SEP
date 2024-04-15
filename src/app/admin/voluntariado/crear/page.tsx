import VolunteerForm from '@/components/admin/forms/volunteer/form';

export const dynamic = 'force-dynamic';
const Page = async ({ searchParams }: { searchParams: { activityToEdit: string | null } }) => {
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
        {/* <ScheduleChatCard activities={scheduledChats} /> */}
      </div>
    </div>
  );
};

export default Page;
