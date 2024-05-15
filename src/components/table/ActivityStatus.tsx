import { parseWorkshopStatusFromDatabase } from '@/lib/utils2';
import { ActivityStatus as IActivityStatus } from '@prisma/client';

interface ActivityStatusProps {
  status: IActivityStatus;
  startDate?: string[];
  endDate?: string[];
}

const ActivityStatusIndicator: React.FC<ActivityStatusProps> = ({ status, startDate, endDate }) => {
  const workshopStatus = parseWorkshopStatusFromDatabase(status);
  if (status === 'SUSPENDED') {
    return (
      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
        {workshopStatus}
      </span>
    );
  } else if (status === 'ATTENDANCE_CHECKED') {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
        {workshopStatus}
      </span>
    );
  } else if (status === 'SCHEDULED') {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
        {workshopStatus}
      </span>
    );
  } else if (status === 'SENT') {
    return (
      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
        {workshopStatus}
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
        Error
      </span>
    );
  }
};

export default ActivityStatusIndicator;
