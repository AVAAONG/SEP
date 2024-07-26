import { Tooltip } from '@nextui-org/tooltip';
import { Chat, Volunteer, Workshop } from '@prisma/client';
import Link from 'next/link';
import DisplayDate from './DisplayDate';
import DisplayTime from './DisplayTime';
import ActivityListIcon from './scholar/dashboard/ActivityListIcon';

const NextEventsList = ({ activities }: { activities: (Workshop | Chat | Volunteer)[] }) => {
  const kindOfActivity = (activity: Workshop | Chat | Volunteer) => {
    if ('year' in activity) {
      return 'workshop';
    } else if ('level' in activity) {
      return 'chat';
    } else {
      return 'volunteer';
    }
  };
  return (
    <>
      <h3 className="flex items-center mb-2 text-lg font-medium ">Próximas actividades</h3>
      <div className="border-t border-gray-200 dark:border-gray-600">
        <div className="">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {activities?.map((activity, index: number) => {
              let link: string = '';
              if ('year' in activity) {
                link = `actividadesFormativas/${activity.id}`;
              } else if ('level' in activity) {
                link = `chats/${activity.id}`;
              } else if ('kind_of_volunteer' in activity) {
                link = `voluntariado/${activity.id}`;
              }

              return (
                <li className="py-2.5 overflow-hidden" key={index}>
                  <Link href={link} target="_self">
                    <div className="flex items-center w-full">
                      <ActivityListIcon kindOfActivity={kindOfActivity(activity)} />
                      <div className="flex flex-col ml-2">
                        <Tooltip content={activity.title}>
                          <p className="font-medium truncate text-sm">{activity.title}</p>
                        </Tooltip>

                        <div className="flex items-center justify-start text-sm text-green-500 dark:text-green-400 font-medium">
                          <svg
                            fill="none"
                            className="w-4 h-4"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>
                          <span className="ml-1 text-gray-500 dark:text-gray-400">
                            <DisplayDate
                              date={activity.start_dates[0]?.toISOString()}
                              kind="short"
                            />
                          </span>
                          <span className="ml-1 text-gray-500 dark:text-gray-400">
                            <DisplayTime time={activity.start_dates[0].toISOString()} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NextEventsList;
