import { Tooltip } from '@nextui-org/react';

const AdminStats = ({ stats }) => (
  <div>
    <dl
      className={`grid grid-cols-1 rounded-lg bg-white dark:bg-black shadow-md overflow-hidden  divide-y divide-gray-200 dark:divide-gray-700 md:grid-cols-4  justify-center md:divide-y-0 md:divide-x`}
    >
      {stats.map((item) => (
        <div key={item.name} className="p-5 overflow-hidden">
          <dt className="text-base font-medium ">{item.name}</dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex items-baseline text-4xl font-semibold text-primary-light">
              {item.stat}
              <span className="ml-2 text-sm truncate font-medium text-gray-500">
                {item.comparationText}
              </span>
            </div>
            {item.comparation && (
              <Tooltip content={item.tooltipText}>
                <div
                  className={
                    ' cursor-pointer bg-light dark:bg-dark text-dark inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                  }
                >
                  <span className="sr-only">
                    {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                  {item.comparation}%
                </div>
              </Tooltip>
            )}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default AdminStats;
