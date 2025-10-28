import ActivityOverviewList from '@/components/ActivityOverviewList';
import Calendar from '@/components/calendar/Calendar';
import formatActivitiesForCalendarPanel from '@/components/calendar/utils';
import PanelCard, { PanelCardProps } from '@/components/commons/PanelCard';
import Greeting from '@/components/Greeting';
import { getServerSession } from '@/lib/auth/authOptions';
import {
  getActivitiesWhenScholarItsEnrolled,
  getScholarDoneActivitiesCount,
} from '@/lib/db/utils/users';
import { chatIcon, volunterIcon, workshopIcon } from 'public/svgs/svgs';

const page = async () => {
  const actualYear = new Date().getFullYear();
  const session = await getServerSession();
  const name = session?.name?.split(' ')[0];
  const [doneWorkshopsCount, doneChatsCount, doneVolunteerCount] =
    await getScholarDoneActivitiesCount(session.id, actualYear);

  const enrolledActivities = await getActivitiesWhenScholarItsEnrolled(session.id);

  const events = formatActivitiesForCalendarPanel(enrolledActivities);
  const cardContent: PanelCardProps[] = [
    {
      title: 'Actividades formativas realizadas',
      subtitle: 'Ver todas las actividades',
      data: doneWorkshopsCount,
      link: 'actividadesFormativas',
      icon: workshopIcon(),
      kind: 'workshop',
    },
    {
      title: 'Chat clubs de inglés realizados',
      subtitle: 'Ver todos los chats',
      data: doneChatsCount,
      link: 'chats',
      icon: chatIcon(),
      kind: 'chat',
    },
    {
      title: 'Horas de voluntariado realizadas',
      subtitle: 'Ver todas las actividades',
      data: doneVolunteerCount,
      link: 'voluntariado',
      icon: volunterIcon(),
      kind: 'volunteer',
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Greeting name={name} />
        </div>
        <div className="w-full grid grid-cols-3 gap-3 items-center">
          {cardContent.map((card, index) => (
            <PanelCard showIconOnMobile={false} key={index} {...card} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 ">
          <div className="md:col-span-3">
            <Calendar events={events} height={650} />
          </div>
          <ActivityOverviewList activities={enrolledActivities} height={650} />
        </div>
      </div>
    </div>
  );
};

export default page;
