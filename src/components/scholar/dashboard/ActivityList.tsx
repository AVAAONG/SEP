import React from 'react';
import ActivityListIcon from './ActivityListIcon';

const ActivityList = ({ activityList }) => {
  return (
    <>
      <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Actividades
        {/* <button data-popover-target="popover-description" data-popover-placement="bottom-end" type="button"><svg className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg><span className="sr-only">Show information</span></button> */}
      </h3>
      <div className="border-t border-gray-200 dark:border-gray-600">
        <div className=" pt-4" role="tabpanel" aria-labelledby="faq-tab">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {activityList.map((activity, index: number) => (
              <li className="py-3 sm:py-4" key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <ActivityListIcon kindOfActivity={activity.kindOfActivity} />
                    <div className="flex flex-col ml-3">
                      <p className="font-medium text-gray-900 truncate dark:text-white">
                        {activity.title}
                      </p>
                      <div className="flex items-center justify-start flex-1 text-sm text-green-500 dark:text-green-400 font-semibold">
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
                          {activity.date}
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                          {activity.startHour}
                        </span>
                        <span className="ml-2 text-emerald-700 dark:text-emerald-500 ">
                          {activity.speaker}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ActivityList;
