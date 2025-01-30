import TogleTab from '@/components/TogleTab';

import { prisma } from '@/lib/db/utils/prisma';

import formatActivitiesForScholarEnrollementPage from '@/components/scholar/activities/enrollment/lib/format';
import AcvititiesView from '@/components/scholar/activitiesToEnrollView';
import { getServerSession } from '@/lib/auth/authOptions';
import { getSentActivitiesWhereScholarIsNotEnrolled } from '@/lib/db/utils/Workshops';
import { redirect } from 'next/navigation';
/**
 * Renders a page component with the calendar of activities
 * @remarks this page is willing to show the calendar of activities that proexcelencia will offer to the students. All of them, no matter if the scholar is enrrolled or not in activities.
 */
const page = async ({
  searchParams,
}: {
  searchParams?: { selectedKey: 'calendar' | 'activities' };
}) => {
  const selectedKey = searchParams?.selectedKey || null;
  const sesion = await getServerSession();
  const scholar = await prisma.scholar.findUnique({
    where: {
      id: sesion?.id!,
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
  const scholarCondition = scholar?.program_information?.scholar_condition;

  if (
    !sesion ||
    // scholarCondition === 'ALUMNI' ||
    scholarCondition === 'RESIGNATION' ||
    scholarCondition === 'WITHDRAWAL'
  ) {
    redirect('/accessDenied');
  } else {
    const scholarNames = `${scholar?.first_names.split(' ')[0]}`;
    const activities = await getSentActivitiesWhereScholarIsNotEnrolled(sesion?.id);
    const {
      activitiesForCalendar,
      workshopFormatedActivities,
      chatFormatedActivities,
      volunteerFormatedActivities,
    } = formatActivitiesForScholarEnrollementPage(activities);
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
        <AcvititiesView
          selectedKey={selectedKey}
          calendarEvents={activitiesForCalendar}
          chatsToEnroll={chatFormatedActivities}
          volunteerToEnroll={volunteerFormatedActivities}
          workshopsToEnroll={workshopFormatedActivities}
          scholar={{
            id: sesion?.id!,
            name: scholarNames,
            email: sesion?.email!,
          }}
        />
      </div>
    );
  }
};

export default page;
