import DisplayDate from '@/components/DisplayDate';
import DisplayTime from '@/components/DisplayTime';
import { ChatWithSpeaker, WorkshopWithSpeaker } from '@/lib/db/types';
import { Volunteer } from '@prisma/client';

const EditActivityModalContent: React.FC<{
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
      sera editada
    </p>
    <p>¿Estas seguro de querer editar esta actividad?</p>
  </div>
);

export default EditActivityModalContent;
