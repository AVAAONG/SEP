import { VolunteerWithAllData } from '@/lib/db/types';
import { getWorkshopSpeakersWithParams } from '@/lib/db/utils/speaker';
import StatusUpdateButton from './activityActions/StatusUpdate/StatusUpdate';
import ActivityEditFormModal from './activityActions/editActivity/ActivityEditFormModal';
import GenerateWhatsAppMessageButton from './activityActions/generateWhatsAppMessage/generateWhatsAppMessageButton';
import SatisfactionFormResults from './activityActions/satisfactionForm/satisfactionFormResults';
import {
  SatisfactionFormResponses,
  transformFormResponses,
} from './activityActions/satisfactionForm/utils';
import { ChatsWithAllData } from './table/columns/chatsColumns';
import { WorkshopWithAllData } from './table/columns/workshopColumns';

const AdminActivityActions = async ({
  kindOfActivity,
  activityId,
  scholarsEmails,
  formResponses,
  activity,
}: {
  kindOfActivity: 'workshop' | 'chat';
  scholarsEmails: (string | null)[];
  activityId: string;
  activity: WorkshopWithAllData | ChatsWithAllData | VolunteerWithAllData;
  formResponses: SatisfactionFormResponses[];
}) => {
  const satisfactionFormChartData = transformFormResponses(formResponses);
  const speakers = await getWorkshopSpeakersWithParams({
    id: true,
    first_names: true,
    last_names: true,
    email: true,
    image: true,
  });
  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-full">
        <StatusUpdateButton
          kindOfActivity={kindOfActivity}
          activityForChangeId={activityId}
          scholarsEmails={scholarsEmails}
        />
        <SatisfactionFormResults satisfactionFormChartData={satisfactionFormChartData} />
        <GenerateWhatsAppMessageButton activity={activity} />
        <ActivityEditFormModal activity={activity} />
      </div>
    </>
  );
};

export default AdminActivityActions;
