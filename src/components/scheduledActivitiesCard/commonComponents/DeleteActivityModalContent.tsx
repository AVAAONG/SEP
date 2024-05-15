import DisplayDate from '@/components/DisplayDate';
import DisplayTime from '@/components/DisplayTime';
import { ChatWithSpeaker, WorkshopWithSpeaker } from '@/lib/db/types';
import { Volunteer } from '@prisma/client';

const DeleteActivityModalContent: React.FC<{
  activity: ChatWithSpeaker | WorkshopWithSpeaker | Volunteer;
}> = ({ activity }) => (
  <div className="flex flex-col gap-4 items-center justify-center w-full">
    <p>
      La actividad <span className="font-medium italic">{activity.title}</span> pautada para el dia{' '}
      <span className="font-medium ">
        <DisplayDate date={new Date(activity.start_dates[0]).toISOString()} />
      </span>{' '}
      a las{' '}
      <span className="font-medium ">
        <DisplayTime time={new Date(activity.start_dates[0]).toISOString()} />
      </span>{' '}
      sera eliminada de forma permanente
    </p>
    <p>
      En el caso de querer agendar una actividad con los mismos datos deberas crearla nuevamente
    </p>
  </div>
);

export default DeleteActivityModalContent;
