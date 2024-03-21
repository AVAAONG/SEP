'use client';
import { Button } from '@nextui-org/react';
import { WorkshopSafisfactionForm } from '@prisma/client';
import StatusUpdateButton from './activityActions/StatusUpdate/StatusUpdate';
import SatisfactionFormResults from './activityActions/satisfactionForm/satisfactionFormResults';

const AdminActivityActions = ({
  kindOfActivity,
  activityId,
  scholarsEmails,
  formResponses,
}: {
  kindOfActivity: 'workshop' | 'chat';
  scholarsEmails: (string | null)[];
  activityId: string;
  formResponses: WorkshopSafisfactionForm[];
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-full">
        <Button className="w-full">Editar Actividad</Button>
        <StatusUpdateButton
          kindOfActivity={kindOfActivity}
          activityForChangeId={activityId}
          scholarsEmails={scholarsEmails}
        />
        <SatisfactionFormResults formResponses={formResponses} />
      </div>
    </>
  );
};

export default AdminActivityActions;
