import { Button } from '@nextui-org/react';
import StatusUpdateButton from './activityActions/StatusUpdate/StatusUpdate';
import SatisfactionFormResults from './activityActions/satisfactionForm/satisfactionFormResults';
import {
  SatisfactionFormResponses,
  transformFormResponses,
} from './activityActions/satisfactionForm/utils';

const AdminActivityActions = ({
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
  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-full">
        <Button className="w-full">Editar Actividad</Button>
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
