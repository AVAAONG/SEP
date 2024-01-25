import { ScholarStatus as ScholarStatusI } from '@prisma/client';
import Link from 'next/link';

type ScholarStatusProps = {
  status: ScholarStatusI;
  scholarId: string;
};

const ScholarStatus: React.FC<ScholarStatusProps> = ({ status, scholarId }) => {
  if (status === 'NORMAL') {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 animate-pulse">
        <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
        Normal
      </span>
    );
  } else if (status === 'PROBATION_I') {
    return (
      <Link
        href={`/admin/probatorio/${scholarId}`}
        className="inline-flex items-center bg-yellow-100 text-yellow-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 animate-pulse"
      >
        <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
        Probatorio I
      </Link>
    );
  } else if (status === 'PROBATION_II') {
    return (
      <Link
        href={`/admin/probatorio/${scholarId}`}
        className="inline-flex items-center bg-red-100 text-red-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 animate-pulse"
      >
        <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
        Probatorio II
      </Link>
    );
  } else return <></>;
};

export default ScholarStatus;
