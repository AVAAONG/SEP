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
      title: 'Total de inscritos',
      value: enroledScholars,
    },
    {
      title: 'Total de asistentes',
      value: attendedScholarsCount,
    },
    {
      title: 'Total de inasistentes',
      value: unAttendedScholarsCount,
    },
    {
      title: 'Total de cancelaciones',
      value: cancelledScholarsCount,
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {STATS.map(({ title, value }) => (
        <div className="rounded-lg border text-card-foreground shadow-sm w-full overflow-hidden">
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
