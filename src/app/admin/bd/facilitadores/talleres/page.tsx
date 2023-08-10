
import ChatTable from '@/components/table/Table2';
import { getWorkshopSpeakersWithParams } from '@/lib/database/speaker';

const page = async () => {
  const toSelect = {
    id: true,
    first_names: true,
    last_names: true,
    email: true,
    phone_number: true,
    gender: true,
    job_company: true,
  };
  const workshopSpeakers = await getWorkshopSpeakersWithParams(toSelect);
  return (
    <div className="flex flex-col items-center">
      {/* <h1 className="font-semibold text-3xl text-green-500 mb-6 text-center">
        Listado de talleres
      </h1> */}
      <div className="w-full h-full">
        <ChatTable tableData={workshopSpeakers} />/
      </div>
    </div>
  );
};

export default page;
