'use client';

import { useState } from 'react';
const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

const StatsTooltip = ({
  percentage,
  text,
  down,
}: {
  percentage: number;
  text: string;
  down: boolean;
}) => {
  const [show, setShow] = useState(false);
  const color = down ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';

  return (
    <div className="w-1/6 flex justify-end">
      <div
        className="absolute bg-gray-100 dark:text-gray-100 dark:bg-gray-700 text-slate-800 text-xs rounded py-1 px-4 -translate-y-7 z-10"
        style={{
          visibility: show ? 'visible' : 'hidden',
          transform: show ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {text}
      </div>
      <div
        className={classNames(
          color,
          'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
        )}
        style={{ touchAction: 'none', cursor: 'default' }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default StatsTooltip;
