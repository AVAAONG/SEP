/* This example requires Tailwind CSS v2.0+ */

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type StatsCardProps = {
  stats: {
    name: string;
    stat: number;
    previousStat: number;
    change: number;
    changeType: string;
  }[];
};

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => (
  <div>
    <dl
      className={`grid grid-cols-1 rounded-lg bg-white dark:bg-black shadow-md overflow-hidden  divide-y divide-gray-200 dark:divide-gray-700 md:grid-cols-${stats.length} md:divide-y-0 md:divide-x`}
    >
      {stats.map((item) => (
        <div key={item.name} className="px-4 py-5 sm:p-6">
          <dt className="text-base font-medium ">{item.name}</dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex items-baseline text-4xl font-semibold text-primary-light">
              {item.stat}
              <span className="ml-2 text-sm font-medium text-gray-500">
                de <span className="text-primary-light">{item.previousStat}</span> en el anterior
                trimestre
              </span>
            </div>

            <div
              className={classNames(
                item.changeType === 'increase'
                  ? 'bg-green-100 dark:bg-secondary-dark text-primary-1'
                  : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300',
                'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
              )}
            >
              {/* {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )} */}

              <span className="sr-only">
                {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
              </span>
              {item.change}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default StatsCard;
