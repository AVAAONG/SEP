'use client';
import { classNames } from '@/lib/scholar/utils';
import Link from 'next/link';
import { useState } from 'react';

const MonthTab = ({ month, year }) => {
  const [monthDataTabs, setMonth] = useState(month);
  const [yearDataTab, setYear] = useState(year);

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={monthDataTabs.find((tab) => tab.current).name}
        >
          {monthDataTabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col space-y-2 items-center">
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {yearDataTab.map((tab) => (
              <Link
                replace={false}
                key={tab.name}
                href={`?year=${tab.href}`}
                className={classNames(
                  tab.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4 bg-gray-100 rounded-md py-1 " aria-label="Tabs">
            {monthDataTabs.map((tab) => (
              <Link
                key={tab.name}
                replace={false}
                href={`&month=${tab.href}`}
                className={classNames(
                  tab.current ? 'bg-white text-gray-700' : 'text-gray-500 hover:text-gray-700',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MonthTab;
