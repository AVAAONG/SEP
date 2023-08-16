import StatsTooltip from '../admin/StatsTooltip';
interface StatsProps {
  kindOfActivity: "workshop" | "chat" | "voluteer";
  activitiesDone: number
  first: number
  second: number

}

const defineActivity = (kindOfActivity: string) => {
  if (kindOfActivity === 'workshop') {
    return ['actividades de formación', 10];
  } else if (kindOfActivity === 'chat') {
    return ['chats', 10];
  } else if (kindOfActivity === 'volunteer') {
    return ['voluntarido', 100];
  } else {
    return ['', 0];
  }
};

const Stats = ({ activitiesDone, kindOfActivity, first, second }: StatsProps) => {
  const [activityName, number] = defineActivity(kindOfActivity);

  const pendingWorkshops = Number(number) - activitiesDone;
  const donePercentage = (activitiesDone / 20) * 100;
  const pendingPercentage = 100 - donePercentage;

  return (
    <div>
      <dl className="mt-5 md:h-28 grid grid-cols-1 rounded-lg bg-gradient-to-t from-green-600  dark:to-emerald-900 to-emerald-400 overflow-hidden shadow divide-y-2 divide-emerald-700 dark:divide-emerald-950 md:grid-cols-3 md:divide-y-0 md:divide-x-2 border border-emerald-700  dark:border-emerald-800">
        <div className="p-4 flex flex-col justify-between">
          <dt className="text-sm sm:text-xs lg:text-base font-semibold text-white">Total de {activityName} realizadas</dt>
          <dd className="flex justify-between items-baseline lg:flex">
            <div className="flex items-baseline text-5xl font-bold  text-emerald-900 dark:text-emerald-950 ">
              {activitiesDone}
            </div>
            <StatsTooltip percentage={donePercentage} text={`Has cumplido con un ${donePercentage}% de tus ${activityName}`} down={false} />
          </dd>
        </div>
        <div className="p-4 overflow-hidden flex justify-between h-28">
          <div className="flex items-start text-5xl font-bold  text-emerald-900 dark:text-emerald-950  h-min">
            <span className='-mt-1'>{first}</span>
            <span className='text-xs ml-2 text-white'>{activityName} {kindOfActivity === "voluteer" ? "internas" : 'presenciales'}</span>
          </div>
          <div className='w-0'>
            <hr className='border-2 w-20 translate-y-10  -translate-x-12 -skew-y-[65deg] border-emerald-700 dark:border-emerald-950 ' />
          </div>
          <div className="flex items-end text-5xl font-bold  text-emerald-900 dark:text-emerald-950">
            <span className=''>{second}</span>
            <span className='text-xs  ml-2 text-white'>{activityName} {kindOfActivity === "voluteer" ? "externas" : 'virtuales'}</span>
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between">
          <dt className="text-base sm:text-xs lg:text-base font-semibold text-white">Total de {activityName} faltantes</dt>
          <dd className="flex justify-between items-baseline lg:flex">
            <div className="flex items-baseline text-5xl font-bold  text-emerald-900 dark:text-emerald-950 ">
              {pendingWorkshops}
            </div>
            <StatsTooltip percentage={pendingPercentage} text={`Te falta cumplir un ${pendingPercentage}% de tus ${activityName}`} down={true} />
          </dd>
        </div>
      </dl >
    </div >
  );
};

export default Stats;
