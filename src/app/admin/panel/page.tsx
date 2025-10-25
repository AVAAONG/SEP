import ActivityOverviewList from '@/components/ActivityOverviewList';
import Calendar from '@/components/calendar/Calendar';
import formatActivitiesForCalendarPanel from '@/components/calendar/utils';
import PanelCard, { PanelCardProps } from '@/components/commons/PanelCard';
import { getServerSession } from '@/lib/auth/authOptions';
import { getActivitiesByYear } from '@/lib/db/utils/Workshops';
import { getScholarsCountByCondition } from '@/lib/db/utils/users';
import { Chat, Volunteer, Workshop } from '@prisma/client';
import { redirect } from 'next/navigation';
import { chatIcon, userIcon, volunterIcon, workshopIcon } from 'public/svgs/svgs';

const page = async () => {
  const actualYear = new Date().getFullYear();
  const session = await getServerSession();
  if (!session) return redirect('/signin');
  const chapter = session?.chapterId;
  const [
    activeScholarsCount,
    activities
  ] = await Promise.all([
    getScholarsCountByCondition('ACTIVE', chapter),
    getActivitiesByYear(actualYear)
  ]);
  const [workshops, chats, volunteer] = activities;

  const events = formatActivitiesForCalendarPanel([...workshops, ...chats, ...volunteer] as any, 'admin');
  const volunteerMapped = volunteer.map((volunteer: any) => {
    return {
      ...volunteer,
      activity_status: volunteer.status,
    };
  });
  const sentActivities: (Workshop | Chat | Volunteer)[] = [
    ...workshops,
    ...chats,
    ...volunteerMapped,
  ]
    .filter((activity) => activity.activity_status === 'SENT')

    .sort((a, b) => new Date(a.start_dates[0]).getTime() - new Date(b.start_dates[0]).getTime());

  const workshopDoneCount = workshops.filter(
    (workshop: any) => workshop.activity_status === 'ATTENDANCE_CHECKED'
  ).length;
  const chatsDoneCount = chats.filter(
    (chat: any) => chat.activity_status === 'ATTENDANCE_CHECKED'
  ).length;

  const volunteerHours = volunteer.reduce((acc: any, volunteer: any) => {
    if (volunteer.status === 'APPROVED') {
      return (
        acc +
        volunteer.volunteer_attendance.reduce(
          (acc: any, attendance: any) => acc + attendance.asigned_hours,
          0
        )
      );
    }
    return acc;
  }, 0);

  const cardContent: PanelCardProps[] = [
    {
      title: 'Actividades formativas realizadas',
      subtitle: 'Ver todas las actividades',
      data: workshopDoneCount,
      link: 'actividadesFormativas',
      icon: workshopIcon(),
      kind: 'workshop',
    },
    {
      title: 'Chat clubs de inglés realizados',
      subtitle: 'Ver todos los chats',
      data: chatsDoneCount,
      link: 'chats',
      icon: chatIcon(),
      kind: 'chat',
    },
    {
      title: 'Horas de voluntariado realizadas',
      subtitle: 'Ver todas las actividades',
      data: Number(volunteerHours.toFixed(1)),
      link: 'voluntariado',
      icon: volunterIcon(),
      kind: 'volunteer',
    },
    {
      title: 'Becarios activos',
      subtitle: 'Ver base de datos de becarios',
      data: activeScholarsCount,
      link: 'becarios',
      icon: userIcon(),
      kind: 'scholar',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cardContent.map((card) => <PanelCard key={card.link} {...card} />)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 ">
        <div className="md:col-span-3">
          <Calendar events={events} height={650} />
        </div>
        <ActivityOverviewList activities={sentActivities as (Workshop | Chat)[]} height={650} />
      </div>
    </div>
  );
};

export default page;
