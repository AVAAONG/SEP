import { getWorkshopSpeakersWithParams } from '@/lib/db/utils/speaker';
import StatusUpdateButton from './activityActions/StatusUpdate/StatusUpdate';
import EditActivity from './activityActions/editActivity/EditActivity';
import SatisfactionFormResults from './activityActions/satisfactionForm/satisfactionFormResults';
import {
  SatisfactionFormResponses,
  transformFormResponses,
} from './activityActions/satisfactionForm/utils';

const AdminActivityActions = async ({
  kindOfActivity,
  activityId,
  scholarsEmails,
  formResponses,
}: {
  kindOfActivity: 'workshop' | 'chat';
  scholarsEmails: (string | null)[];
  activityId: string;
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
        <EditActivity activityId={activityId} speakers={speakers} />
        <StatusUpdateButton
          kindOfActivity={kindOfActivity}
          activityForChangeId={activityId}
          scholarsEmails={scholarsEmails}
        />
        <SatisfactionFormResults satisfactionFormChartData={satisfactionFormChartData} />
      </div>
    </>
  );
};

export default AdminActivityActions;
