import { ClockIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/card';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-VE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('es-VE', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const DateCards = ({ startDates, endDates }: { startDates: Date[]; endDates: Date[] }) => {
  return (
    <>
      {startDates.map((startDate, index) => (
        <Card radius="sm" key={index}>
          <CardBody className="flex flex-row items-center justify-between">
            <div className="flex items-center ">
              <div className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                <span className="font-medium text-xs md:text-base ">{index + 1}</span>
              </div>
              <span className="font-medium capitalize text-xs md:text-base ">
                {formatDate(startDate)}
              </span>
            </div>
            <div className="flex items-center  ml-11 sm:ml-0">
              <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground text-xs md:text-base">
                {formatTime(startDate)} - {formatTime(endDates[index])}
              </span>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
};
