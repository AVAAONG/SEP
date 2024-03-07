'use client';

import DisplayDate from '@/components/DisplayDate';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Column } from 'react-table';

const CollageAcademicPeriodsColumns: Column<{
  id: string;
  current_academic_period: number;
  startDate: string;
  endDate: string;
  grade: number;
  modality: string;
  record: string | null;
}>[] = [
  {
    Header: 'n°',
    accessor: 'id',
    Cell: ({ cell }) => {
      return <span className="font-semibold">{cell.row.index + 1}</span>;
    },
  },
  {
    Header: 'Periodo academico cursado',
    accessor: 'current_academic_period',
  },
  {
    Header: 'Nota obtenida',
    accessor: 'grade',
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    disableSortBy: true,
  },
  {
    Header: 'Fecha de inicio',
    accessor: 'startDate',
    Cell: ({ value }) => {
      return <DisplayDate date={value} kind="short" />;
    },
  },
  {
    Header: 'Fecha de finalización',
    accessor: 'endDate',
    Cell: ({ value }) => {
      return <DisplayDate date={value} kind="short" />;
    },
  },
  {
    Header: 'Record academico',
    disableSortBy: true,
    accessor: 'record',
    Cell: ({ value }) => {
      return (
        <div className="m-auto w-6 ">
          <Link
            target="_blank"
            href={value ? value : ''}
            className="w-6 text-primary-light dark:text-primary-light"
          >
            <DocumentTextIcon className="w-6 h-6" />
          </Link>
        </div>
      );
    },
  },
];

export default CollageAcademicPeriodsColumns;
