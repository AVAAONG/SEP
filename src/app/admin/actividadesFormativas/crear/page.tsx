import ScheduledWorkshopsList from '@/components/ScheduleActivityCard';
import WorkshopCreationForm from '@/components/admin/WorkshopCreationForm';
import { getWorkshopSpeakersWithParams } from '@/lib/db/utils/speaker';
import { Workshop } from '@/types/Workshop';

interface WorkshopForm extends Workshop {
  subject?: string;
  group?: string;
}

const Page = async () => {
  // const editEntry = (inputId: shortUUID.SUUID) => {
  //   const workshops = workshopResponse.data.filter((workshop: Workshop) => workshop.id === inputId);
  //   const {
  //     title,
  //     pensum,
  //     date,
  //     startHour,
  //     endHour,
  //     speaker,
  //     spots,
  //     modality,
  //     platform,
  //     workshopYear,
  //     description,
  //   } = workshops[0];
  //   reset({
  //     title,
  //     pensum,
  //     date,
  //     startHour,
  //     endHour,
  //     speaker,
  //     spots,
  //     modality,
  //     platform,
  //     workshopYear,
  //     description,
  //   });
  //   deleteEntry(inputId);
  // };

  // const sendWorkshops = async (data: any, event: BaseSyntheticEvent) => {
  //   event.preventDefault();
  //   const payload = {
  //     group: data.group,
  //     workshops: workshopResponse.data,
  //   };
  //   const respin = await fetch('/api/google/form', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(payload),
  //   });
  // };
  const speakers = await getWorkshopSpeakersWithParams({
    id: true,
    first_names: true,
    last_names: true,
    email: true,
    image: true,
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 p-4">
      <div className=" w-full md:w-1/2">
        <WorkshopCreationForm speakers={speakers} />
      </div>
      <div className="w-full md:w-1/2 pt-0 flex flex-col items-center">
        {/* {workshopResponse.isLoading || workshopResponse.data.length === 0 ? (
          <></>
        ) : ( */}
        <ScheduledWorkshopsList workshops={[]} />
        {/* )} */}
      </div>
    </div>
  );
};

export default Page;
