import Calendar from '@/components/calendar/Calendar';
import { getAllActivities } from '@/lib/db/utils/Workshops';
import { getDoneActivities } from '@/lib/db/utils/activities';
import { getScholarsCountByCondition } from '@/lib/db/utils/users';
import { formatActivityEventsForBigCalendar } from '@/lib/utils';
import { Link } from '@nextui-org/react';
import { chatIcon, userIcon, workshopIcon } from 'public/svgs/svgs';

const page = async () => {
  const [workshopDoneCount, chatsDoneCount] = await getDoneActivities();
  const activeScholarsCount = await getScholarsCountByCondition('ACTIVE', 'Rokk6_XCAJAg45heOEzYb');
  const [workshops, chats, volunteer] = await getAllActivities();

  const events = formatActivityEventsForBigCalendar([...workshops, ...chats]);

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="w-full flex flex-col md:flex-row gap-3 items-center">
        <div className="w-full md:w-1/4 relative bg-white dark:bg-black pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-gradient-to-br from-blue-700  to-indigo-900 rounded-md p-3">
              <div className="w-6 h-6 text-white">{workshopIcon()}</div>
            </div>
            <p className="ml-16 font-medium text-blue-700  truncate">
              Actividades formativas realizadas
            </p>
          </dt>
          <dd className="ml-16 pb-3 flex items-baseline ">
            <p className="text-3xl font-semibold">{workshopDoneCount}</p>

            <div className="absolute bottom-0 inset-x-0 bg-blue-50 dark:bg-black px-4 py-3">
              <Link
                href="actividadesFormativas/lista"
                className="font-medium text-sm text-blue-600 hover:text-blue-500"
              >
                Ver todas las actividades
              </Link>
            </div>
          </dd>
        </div>
        <div className="w-full md:w-1/4 relative bg-white dark:bg-black pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-gradient-to-r from-red-500  to-red-900 rounded-md p-3">
              <div className="w-6 h-6 text-white">{chatIcon()}</div>
            </div>
            <p className="ml-16 font-medium text-red-500 truncate">
              Chat clubs de inglés realizados
            </p>
          </dt>
          <dd className="ml-16 pb-3 flex items-baseline">
            <p className="text-3xl font-semibold ">{chatsDoneCount}</p>

            <div className="absolute bottom-0 inset-x-0 bg-red-50 dark:bg-black px-4 py-3">
              <Link
                color="foreground"
                href="chats/lista"
                className="font-medium text-sm text-red-600 hover:text-red-500"
              >
                Ver todos los chats
              </Link>
            </div>
          </dd>
        </div>
        <div className="w-full md:w-1/4  relative bg-white dark:bg-black pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-md p-3">
              <div className="w-6 h-6 text-white">{userIcon()}</div>
            </div>
            <p className="ml-16 font-medium text-yellow-500 truncate">Total de becarios activos</p>
          </dt>
          <dd className="ml-16 pb-3  flex items-baseline  ">
            <p className="text-3xl font-semibold ">{activeScholarsCount}</p>

            <div className="absolute bottom-0 inset-x-0 bg-yellow-50 dark:bg-black px-4 py-3">
              <Link
                href="becarios"
                className="font-medium text-sm text-yellow-600 hover:text-yellow-500"
              >
                Ver base de datos de becarios
              </Link>
            </div>
          </dd>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 ">
        <div className="h-full max-h-[680px] w-full overflow-x-clip rounded-md backdrop-filter backdrop-blur-3xl bg-white dark:bg-black shadow-md p-2">
          <Calendar events={events} />
        </div>
        {/* <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md backdrop-filter backdrop-blur-3xl dark:bg-black max-h-[680px] overflow-y-scroll">
          <NextEventsList activities={[...scheduledWorkshops, ...sentWorkshops]} />
        </div> */}
      </div>
    </div>
  );
};

export default page;
