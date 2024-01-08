import Calendar from '@/components/calendar/Calendar';
import PanelCard, { PanelCardProps } from '@/components/commons/PanelCard';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getScholarWithAllData, getUser } from '@/lib/db/utils/users';
import { getServerSession } from 'next-auth';
import { chatIcon, workshopIcon } from '../../../../public/svgs/svgs';

const page = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id.id;
  const user = await getUser(id);
  const scholar = await getScholarWithAllData(user?.scholarId);

  const cardContent: PanelCardProps[] = [
    {
      title: 'Actividades formativas realizadas',
      subtitle: 'Ver todas las actividades',
      data: 1,
      link: 'actividadesFormativas/lista',
      icon: workshopIcon(),
      kind: 'workshop',
    },
    {
      title: 'Chat clubs de inglés realizados',
      subtitle: 'Ver todos los chats',
      data: 1,
      link: 'chats/lista',
      icon: chatIcon(),
      kind: 'chat',
    },
    {
      title: 'Horas de voluntariado realizadas',
      subtitle: 'Ver todas las actividades',
      data: 1,
      link: 'actividadesFormativas/lista',
      icon: workshopIcon(),
      kind: 'volunteer',
    },
  ];

  return (
    <div>
      <div className="flex flex-col px-2 gap-4">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          ¡Hola, {session?.user?.name?.split(' ')[0]}! 💚
        </h1>
        <div className="w-full flex flex-col md:flex-row gap-3 items-center">
          {cardContent.map((card) => PanelCard(card))}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 ">
          <div className="h-full max-h-[680px] min-h-screen text-gray-800 capitalize dark:text-gray-300 shadow-sm overflow-x-clip w-full bg-white border border-gray-200  shadow-emerald-600 dark:border-emerald-800  dark:bg-slate-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 p-2">
            <Calendar events={[{}]} />
          </div>
          <div className="w-full lg:w-1/4 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm shadow-emerald-600 dark:border-emerald-800  dark:bg-slate-950">
            {/* <NextEventsList activities={scheduledAndSentActivities as (Workshop | Chat)[]} />{' '} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
