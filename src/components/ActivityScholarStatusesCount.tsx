import { countScholarStatusesInActivity } from '@/lib/move';

const ActivityScholarStatusesCount = ({ scholarAttendance }) => {
  const {
    attendedScholarsCount,
    unAttendedScholarsCount,
    cancelledScholarsCount,
    enroledScholars,
  } = countScholarStatusesInActivity(scholarAttendance);

  const STATS = [
    {
      title: 'Inscritos',
      value: enroledScholars,
    },
    {
      title: 'Asistentes',
      value: attendedScholarsCount,
    },
    {
      title: 'Inasistentes',
      value: unAttendedScholarsCount,
    },
    {
      title: 'Cancelaciones',
      value: cancelledScholarsCount,
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {STATS.map(({ title, value }, index) => (
        <div
          key={index}
          className="rounded-lg border text-card-foreground shadow-sm w-full overflow-hidden"
        >
          <div className="flex flex-col space-y-1.5 p-6 ">
            <h3 className="text-lg font-semibold whitespace-nowrap leading-none tracking-tight truncate">
              {title}
            </h3>
          </div>
          <p className="text-4xl font-semibold whitespace-nowrap leading-none tracking-tight p-6">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ActivityScholarStatusesCount;
