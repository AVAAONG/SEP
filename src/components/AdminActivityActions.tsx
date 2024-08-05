import { determineActivityKindByTipe } from '@/lib/activities/utils';
import { VolunteerWithAllData } from '@/lib/db/types';
import StatusUpdateButton from './activityActions/StatusUpdate/StatusUpdate';
import DeleteActivityButton from './activityActions/deleteActivity/DeleteActivityButton';
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
  scholarsEmails,
  formResponses,
  activity,
}: {
  scholarsEmails: (string | null)[];
  activity: WorkshopWithAllData | ChatsWithAllData | VolunteerWithAllData;
  formResponses: SatisfactionFormResponses[];
}) => {
  const satisfactionFormChartData = transformFormResponses(formResponses);
  return (
    <>
      <div className="grid grid-cols-3 gap-4 w-full">
        <StatusUpdateButton
          kindOfActivity={determineActivityKindByTipe(activity)}
          activityForChangeId={activity.id}
          scholarsEmails={scholarsEmails}
        />
        <SatisfactionFormResults satisfactionFormChartData={satisfactionFormChartData} />
        <GenerateWhatsAppMessageButton activity={activity} />
        <ActivityEditFormModal activity={activity} />
        <DeleteActivityButton
          kindOfActivity={determineActivityKindByTipe(activity)}
          activityId={activity.id}
        />
      </div>
    </>
  );
};

export default AdminActivityActions;
