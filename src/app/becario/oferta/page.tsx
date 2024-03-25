import EnrrollActivitiCard from '@/components/EnrrollActivitiCard';
import TogleTab from '@/components/TogleTab';
import CalendarForEnrrolling from '@/components/calendar/CalendarForEnrolling';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getSentActivitiesWhereScholarIsNotEnrroled } from '@/lib/db/utils/Workshops';
import { prisma } from '@/lib/db/utils/prisma';
import { formatActivitiesForEnrollement } from '@/lib/utils';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
/**
 * Renders a page component with the calendar of activities
 * @remarks this page is willing to show the calendar of activities that proexcelencia will offer to the students. All of them, no matter if the scholar is enrrolled or not in activities.
 */
const page = async ({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const selectedKey = searchParams?.selectedKey || null;
  const sesion = await getServerSession(authOptions);
  const scholar = await prisma.scholar.findUnique({
    where: {
      id: sesion?.scholarId!,
    },
    select: {
      first_names: true,
      last_names: true,
      program_information: {
        select: {
          scholar_condition: true,
        },
      },
    },
  });

  if (!sesion || scholar?.program_information?.scholar_condition === 'ALUMNI')
    redirect('/accessDenied');
  else {
    const [workshops, chats] = await getSentActivitiesWhereScholarIsNotEnrroled(sesion?.scholarId);

    const scholarNames = `${scholar?.first_names.split(' ')[0]}`;
    const events = formatActivitiesForEnrollement([...workshops, ...chats]);

    return (
      <div className="flex flex-col justify-center items-center w-full text-center gap-2 sm:gap-0">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-2">
          ¡Oferta de actividades{' '}
          <span className="highlight bg-gradient-to-r from-emerald-800 to-emerald-600 dark:from-green-100 dark:to-emerald-600 bg-clip-text text-transparent font-bold">
            ProExcelencia!
          </span>
        </h1>
        <h2 className="text-xs font-semibold text-gray-900 sm:text-base dark:text-gray-400 italic">
          En esta página podrás ver todas las actividades a las cuales puedes inscribirte
        </h2>
        <h3 className="text-xs font-semibold text-emerald-700 sm:text-sm dark:text-emerald-500">
          {' '}
          Ten en cuenta que las fechas y horarios de estas actividades estan sujetos a cambios
        </h3>
        <div className="my-4">
          <TogleTab
            options={[
              { key: 'calendar', title: 'Calendario' },
              { key: 'activities', title: 'Actividades' },
            ]}
          />
        </div>
        {selectedKey === 'calendar' || selectedKey === null ? (
          <div className="w-full">
            <div className="h-full min-h-[600px] text-gray-800 capitalize dark:text-gray-300 shadow-sm overflow-x-clip w-full bg-white border border-gray-200  shadow-emerald-600 dark:border-emerald-800  dark:bg-slate-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 p-2">
              <CalendarForEnrrolling
                events={events}
                scholar={{
                  id: sesion?.scholarId!,
                  name: scholarNames,
                  email: sesion?.user?.email!,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-4 w-full flex-wrap items-center justify-center">
            {events.map((event) => {
              return (
                <EnrrollActivitiCard
                  activity={event}
                  scholar={{
                    id: sesion?.scholarId!,
                    name: scholarNames,
                    email: sesion?.user?.email!,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
};

export default page;
