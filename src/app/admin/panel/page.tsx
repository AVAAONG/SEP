import NextEventsList from '@/components/NextEventsList';
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
  const activeScholarsCount = await getScholarsCountByCondition('ACTIVE', chapter);
  const [workshops, chats, volunteer] = await getActivitiesByYear(actualYear);
  const events = formatActivitiesForCalendarPanel([...workshops, ...chats, ...volunteer], 'admin');
  const volunteerMapped = volunteer.map((volunteer) => {
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
    (workshop) => workshop.activity_status === 'ATTENDANCE_CHECKED'
  ).length;
  const chatsDoneCount = chats.filter(
    (chat) => chat.activity_status === 'ATTENDANCE_CHECKED'
  ).length;

  const volunteerHours = volunteer.reduce((acc, volunteer) => {
    if (volunteer.status === 'APPROVED') {
      return (
        acc +
        volunteer.volunteer_attendance.reduce(
          (acc, attendance) => acc + attendance.asigned_hours,
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
      title: 'Total de becarios activos',
      subtitle: 'Ver base de datos de becarios',
      data: activeScholarsCount,
      link: 'becarios',
      icon: userIcon(),
      kind: 'scholar',
    },
  ];
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="w-full flex flex-col md:flex-row gap-3 items-center">
        {cardContent.map((card) => PanelCard(card))}
      </div>
      <div className="grid grid-cols-12 gap-2 ">
        <div className="col-span-12 lg:col-span-9  h-full max-h-[680px] w-full overflow-x-clip rounded-md backdrop-filter backdrop-blur-3xl bg-white dark:bg-black shadow-md p-2">
          <Calendar events={events} />
        </div>
        <div className="col-span-12 lg:col-span-3 w-full p-4 bg-white rounded-lg shadow-md backdrop-filter backdrop-blur-3xl dark:bg-black max-h-[680px] overflow-y-scroll">
          <NextEventsList activities={sentActivities as (Workshop | Chat)[]} />
        </div>
      </div>
    </div>
  );
};

export default page;
