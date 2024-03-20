'use client';
import { Button } from '@nextui-org/react';
import StatusUpdateButton from './activityActions/changeStatus';

const AdminActivityActions = ({
  kindOfActivity,
  activityId,
  scholarsEmails,
}: {
  kindOfActivity: 'workshop' | 'chat';
  scholarsEmails: (string | null)[];
  activityId: string;
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
        <Button className="w-full">Resultados de la encuesta</Button>
      </div>
    </>
  );
};

export default AdminActivityActions;
