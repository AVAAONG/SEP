'use client';
import {
  parseModalityFromDatabase,
  parseSkillFromDatabase,
  parseWorkshopStatusFromDatabase,
} from '@/lib/utils2';
import { ActivityStatus, Modality, Skill, Workshop, WorkshopAttendance } from '@prisma/client';
import { CellProps, Column } from 'react-table';
import { Star } from '../../../../public/svgs/svgs';

const speakerWorkshopsColumn: Column<Workshop>[] = [
  {
    Header: 'Actividad formativa',
    accessor: 'title',
  },
  {
    Header: 'Fecha',
    accessor: 'start_dates',
    Cell: ({ cell }: CellProps<Workshop, Date[]>) => {
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
    Header: 'Status',
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
    Header: 'Becarios ',
    accessor: 'scholar_attendance',
    Cell: ({ cell }) => {
      const attendedScholars = cell.value.filter(
        (scholar: WorkshopAttendance) => scholar.attendance === 'ATTENDED'
      ).length;
      return (
        <span>
          {attendedScholars} / {cell.value.length}
        </span>
      );
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

export default speakerWorkshopsColumn;
