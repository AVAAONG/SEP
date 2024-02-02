'use client';
import { ScholarChatColumnT } from '@/app/admin/becarios/[scholarId]/page';
import { parseModalityFromDatabase, parseWorkshopStatusFromDatabase } from '@/lib/utils2';
import Link from 'next/link';
import { CellProps, Column } from 'react-table';

const scholarChatAttendaceColumns: Column<ScholarChatColumnT>[] = [
  {
    Header: '#',
    Cell: ({ cell }: CellProps<ScholarChatColumnT>) => {
      return <span>{cell.row.index + 1}</span>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Chat Club',
    accessor: 'title',
    Cell: ({ value, cell }) => (
      <Link href={cell.row.original.id ? `chats/${cell.row.original.id}` : ''}>
        <div className="block text-center overflow-x-scroll">{value}</div>
      </Link>
    ),
  },
  {
    Header: 'Fecha',
    accessor: 'start_dates',
    Cell: ({ cell }) => {
      const date = new Date(cell.value[0]);
      return (
        <span>
          {' '}
          {date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </span>
      );
    },
  },
  {
    id: 'startHour',
    Header: 'Inicio',
    accessor: 'start_dates',
    Cell: ({ value }) => {
      const date = new Date(value[0]).toLocaleTimeString('es-VE', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
      });
      return <div suppressHydrationWarning>{date.toUpperCase()}</div>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Estatus',
    accessor: 'activity_status',
    Cell: ({ cell }: CellProps<ScholarChatColumnT>) => {
      const workshopStatus = parseWorkshopStatusFromDatabase(cell.value);
      if (cell.value === 'SUSPENDED') {
        return (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            {workshopStatus}
          </span>
        );
      } else if (cell.value === 'DONE') {
        return (
          <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            {workshopStatus}
          </span>
        );
      } else if (cell.value === 'ATTENDANCE_CHECKED') {
        return (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
            {workshopStatus}
          </span>
        );
      } else if (
        cell.value === 'SCHEDULED' ||
        cell.value === 'SENT' ||
        cell.value === 'IN_PROGRESS'
      ) {
        return (
          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
            Programado
          </span>
        );
      } else {
        return (
          <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
            Error
          </span>
        );
      }
    },
    disableSortBy: true,
  },
  {
    Header: 'Asistencia',
    accessor: 'attendance',
    Cell: ({ value }) => {
      if (value === 'NOT_ATTENDED') {
        return (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            No asistió
          </span>
        );
      } else if (value === 'ATTENDED') {
        return (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
            Asistió
          </span>
        );
      } else if (value === 'SPEAKER') {
        return (
          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
            Facilitador
          </span>
        );
      } else {
        return (
          <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
            Error
          </span>
        );
      }
    },
    disableSortBy: true,
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    Cell: ({ cell }: CellProps<ScholarChatColumnT>) => {
      return <span>{parseModalityFromDatabase(cell.value)}</span>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Plataforma',
    accessor: 'platform',
    disableSortBy: true,
  },
  // {
  //   Header: 'Satisfacción',
  //   accessor: 'rating',
  //   Cell: ({ cell }: { cell: any }) => (
  //     <div className="flex gap-1 w-full h-6 text-green-600">
  //       {Array.from({ length: cell.value }).map((_, index) => (
  //         <Star key={index} />
  //       ))}
  //     </div>
  //   ),
  // },
];

export default scholarChatAttendaceColumns;
