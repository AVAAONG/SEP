'use client';

import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Column } from 'react-table';

const CvaModulesColumns: Column<{
  modality: string;
  schedule: string;
  record: string | null;
  id: string;
  module: number;
  qualification: number;
  scholar_cva_information_id: string | null;
}>[] = [
  {
    Header: 'n°',
    accessor: 'id',
    Cell: ({ cell }) => {
      return <span className="font-semibold">{cell.row.index + 1}</span>;
    },
  },
  {
    Header: 'Modulo',
    accessor: 'module',
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    disableSortBy: true,
  },
  {
    Header: 'Nota obtenida',
    accessor: 'qualification',
  },
  {
    Header: 'Horario',
    accessor: 'schedule',
    disableSortBy: true,
  },
  {
    Header: 'Comprobante',
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

export default CvaModulesColumns;
