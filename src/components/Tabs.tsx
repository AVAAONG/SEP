'use client';
import { classNames } from '@/lib/scholar/utils';
import Link from 'next/link';
import { useState } from 'react';

const Tabs = ({ tab }) => {
  const [dataTabs, setTab] = useState(tab);
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
          defaultValue={dataTabs.find((tab) => tab.current).name}
        >
          {dataTabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {dataTabs.map((tab) => (
            <Link
              key={tab.name}
              href={`?${tab.href}`}
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
    </div>
  );
};

export default Tabs;
