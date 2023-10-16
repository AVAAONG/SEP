'use client';
import {
  parseModalityFromDatabase,
  parseSkillFromDatabase,
  parseWorkshopStatusFromDatabase,
} from '@/lib/utils2';
import { ActivityStatus, Modality, Skill, Workshop, WorkshopAttendance } from '@prisma/client';
import Link from 'next/link';
import { CellProps, Column } from 'react-table';
import { Star } from '../../../../public/svgs/svgs';

const singleScholarWorkshopsColumns: Column<WorkshopAttendance & Workshop>[] = [
  {
    Header: 'Actividad formativa',
    accessor: 'title',
    Cell: ({ cell }) => (
      <Link
        href={cell.row.original.id ? `/admin/actividadesFormativas/${cell.row.original.id}` : ''}
        className="flex items-center"
      >
        {cell.value}
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
    Header: 'Estatus',
    accessor: 'activity_status',
    Cell: ({ cell }: CellProps<Workshop, ActivityStatus>) => {
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
  },
  {
    Header: 'Asistencia',
    accessor: 'scholar_attendance',
    Cell: ({ cell }) => {
      return <div>{cell.value.attendance}</div>;
      //     const workshopStatus = parseWorkshopStatusFromDatabase(cell.value);
      //     if (cell.value === 'SUSPENDED') {
      //       return (
      //         <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
      //           {workshopStatus}
      //         </span>
      //       );
      //     } else if (cell.value === 'DONE') {
      //       return (
      //         <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
      //           {workshopStatus}
      //         </span>
      //       );
      //     } else if (cell.value === 'ATTENDANCE_CHECKED') {
      //       return (
      //         <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
      //           {workshopStatus}
      //         </span>
      //       );
      //     } else if (
      //       cell.value === 'SCHEDULED' ||
      //       cell.value === 'SENT' ||
      //       cell.value === 'IN_PROGRESS'
      //     ) {
      //       return (
      //         <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
      //           Programado
      //         </span>
      //       );
      //     } else {
      //       return (
      //         <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
      //           Error
      //         </span>
      //       );
      //     }
    },
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    Cell: ({ cell }: CellProps<Workshop, Modality>) => {
      return <span>{parseModalityFromDatabase(cell.value)}</span>;
    },
  },
  {
    Header: 'Plataforma',
    accessor: 'platform',
  },
  {
    Header: 'Competencia',
    accessor: 'asociated_skill',
    Cell: ({ cell }: CellProps<Workshop, Skill>) => {
      return <span>{parseSkillFromDatabase(cell.value)}</span>;
    },
  },
  {
    Header: 'Satisfacción',
    accessor: 'rating',
    Cell: ({ cell }: { cell: any }) => (
      <div className="flex gap-1 w-full h-6 text-green-600">
        {Array.from({ length: cell.value }).map((_, index) => (
          <Star key={index} />
        ))}
      </div>
    ),
  },
];

export default singleScholarWorkshopsColumns;
