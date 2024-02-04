'use client';
import { IScholarWorkshopColumns } from '@/app/becario/actividadesFormativas/page';
import DisplayTime from '@/components/DisplayTime';
import SpeakersColumnWidget from '@/components/SpeakerColumnWidget';
import {
  parseModalityFromDatabase,
  parseSkillFromDatabase,
  parseWorkshopStatusFromDatabase,
} from '@/lib/utils2';
import Link from 'next/link';

import { CellProps, Column } from 'react-table';

const scholarWorkshopAttendanceColumns: Column<IScholarWorkshopColumns>[] = [
  {
    Header: '#',
    Cell: ({ cell }: CellProps<IScholarWorkshopColumns>) => {
      return <span>{cell.row.index + 1}</span>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Actividad formativa',
    accessor: 'title',
    Cell: ({ value, cell }) => (
      <Link href={cell.row.original.id ? `actividadesFormativas/${cell.row.original.id}` : ''}>
        <div className="block text-center overflow-x-scroll">{value}</div>
      </Link>
    ),
  },

  {
    Header: 'Facilitador',
    accessor: 'speakerNames',
    Cell: ({ cell, value }) => {
      return (
        <SpeakersColumnWidget
          speakerNames={cell.row.original.speakerNames}
          speakerIds={cell.row.original.speakerIds}
          speakersCompany={cell.row.original.speakerCompany}
          speakerImages={cell.row.original.speakerImages}
        />
      );
    },
    disableSortBy: true,
  },
  {
    Header: 'Fecha',
    accessor: 'start_dates',
    Cell: ({ value }) => {
      return (
        <DisplayTime time={value[0].toISOString()} />
      )
    },
  },
  {
    Header: 'Estatus',
    accessor: 'activity_status',
    Cell: ({ value }) => {
      const workshopStatus = parseWorkshopStatusFromDatabase(value);
      if (value === 'SUSPENDED') {
        return (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            {workshopStatus}
          </span>
        );
      } else if (value === 'DONE') {
        return (
          <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            {workshopStatus}
          </span>
        );
      } else if (value === 'ATTENDANCE_CHECKED') {
        return (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
            {workshopStatus}
          </span>
        );
      } else if (value === 'SCHEDULED' || value === 'SENT' || value === 'IN_PROGRESS') {
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

      } else if (value === 'ENROLLED') {
        return (
          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
            Inscrito
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
    Cell: ({ value }) => {
      return <span>{parseModalityFromDatabase(value)}</span>;
    },
  },
  {
    Header: 'Plataforma',
    accessor: 'platform',
  },
  {
    Header: 'Competencia',
    accessor: 'skill',
    Cell: ({ value }) => {
      return <span>{parseSkillFromDatabase(value)}</span>;
    },
  },
  //   {
  //     Header: 'Satisfacción',
  //     accessor: 'rating',
  //     Cell: ({ cell }: { cell: any }) => (
  //       <div className="flex gap-1 w-full h-6 text-green-600">
  //         {Array.from({ length: cell.value }).map((_, index) => (
  //           <Star key={index} />
  //         ))}
  //       </div>
  //     ),
  //   },
];

export default scholarWorkshopAttendanceColumns;
