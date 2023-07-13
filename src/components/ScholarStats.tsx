
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Stats = () => {
    const stats = [
        { name: 'Total de chats inscritos', stat: '4', previousStat: '48 chats realizados', change: '12%', changeType: 'increase' },
        { name: 'Total de chats realizados', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
        { name: 'Chats Faltantes ', stat: '6', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
    ]

    return (
        <div>
            <dl className="mt-5 grid grid-cols-1 rounded-lg bg-gradient-to-t from-green-600  dark:to-emerald-900  to-emerald-400 overflow-hidden shadow divide-y divide-emerald-600 dark:divide-emerald-950 md:grid-cols-3 md:divide-y-0 md:divide-x border border-emerald-600 dark:border-emerald-950">
                {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 sm:p-6  ">
                        <dt className="text-base font-semibold text-white">{item.name}</dt>
                        <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div className="flex items-baseline text-5xl font-bold dark:text-slate-950 text-white">
                                {item.stat}
                                <span className="ml-2 text-sm font-medium text-gray-200">de {item.previousStat}</span>
                            </div>

                            <div
                                className={classNames(
                                    item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
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

                                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                                {item.change}
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}

export default Stats;