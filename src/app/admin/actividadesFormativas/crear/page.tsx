import ScheduledWorkshopsList from '@/components/ScheduleActivityCard';
import WorkshopCreationForm from '@/components/admin/WorkshopCreationForm';
import { getScheduledWorkshops } from '@/lib/db/utils/Workshops';
import { getWorkshopSpeakersWithParams } from '@/lib/db/utils/speaker';
import workshopCreationFormSchema from '@/lib/schemas/workshopCreationFormSchema';
import { Speaker } from '@prisma/client';
import moment from 'moment';
import { z } from 'zod';

const Page = async ({ searchParams }: { searchParams: { editWorkshopId: string | null } }) => {
  const scheduledWorkshops = await getScheduledWorkshops();
  const speakers = await getWorkshopSpeakersWithParams({
    id: true,
    first_names: true,
    last_names: true,
    email: true,
    image: true,
  });

  const getWorkshopForEdit = (): z.infer<typeof workshopCreationFormSchema> | null => {
    if (searchParams.editWorkshopId) {
      const workshopForEdit = scheduledWorkshops.find(
        (workshop) => workshop.id === searchParams.editWorkshopId
      );
      return {
        title: workshopForEdit?.title ?? '',
        dates: [{
          date: moment(workshopForEdit?.start_dates[0]).format('YYYY-MM-DD'),
          startHour: moment(workshopForEdit?.start_dates[0]).format('HH:mm'),
          endHour: moment(workshopForEdit?.end_dates[0]).format('HH:mm'),
        }],
        asociated_skill: workshopForEdit?.asociated_skill!, // replace DEFAULT_VALUE with an actual default value
        modality: workshopForEdit?.modality!, // replace DEFAULT_VALUE with an actual default value
        kindOfWorkshop: workshopForEdit?.kindOfWorkshop ?? '',
        speakersId: workshopForEdit?.speaker.map((speaker) => speaker.id).toString()!,
        year: workshopForEdit?.year ?? [],
        platformInPerson: workshopForEdit?.platform ?? '',
        description: workshopForEdit?.description ?? null,
        avalible_spots: workshopForEdit?.avalible_spots ?? 0,
      };
    } else {
      return null;
    }
  };
  const workshop = getWorkshopForEdit();
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-8 p-4">
      <div className=" w-full md:w-1/2">
        <WorkshopCreationForm speakers={speakers as Speaker[]} workshopForEdit={workshop} />
      </div>
      <div className="w-full md:w-1/2 pt-0 flex flex-col items-center">
        <ScheduledWorkshopsList workshops={scheduledWorkshops} />
      </div>
    </div>
  );
};

export default Page;
