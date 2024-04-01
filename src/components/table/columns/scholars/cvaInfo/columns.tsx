'use client';
import DisplayDate from '@/components/DisplayDate';
import formatDni from '@/lib/db/utils/formatDni';
import { Avatar, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { Cell, CellValue, Column } from 'react-table';

export interface ScholarCvaInformationColumnsProps {
  id: string;
  first_names: string;
  last_names: string;
  profilePhoto: string | null;
  dni: string;
  isInCva: string;
  cvaLocation: string;
  actualModule: number | undefined;
  moduleModality: string;
  qualification: number | undefined;
  schedule: string;
  cvaFinished: string;
  cvaStartDate: string | null;
  cvaEndDate: string | null;
  notStartedReason: string | null | undefined;
}

const scholarCvaInformationColumns: Column<ScholarCvaInformationColumnsProps>[] = [
  {
    Header: 'Nombre',
    accessor: (row: ScholarCvaInformationColumnsProps) => `${row.first_names} ${row.last_names}`,
    Cell: ({
      value,
      cell,
    }: {
      value: CellValue;
      cell: Cell<ScholarCvaInformationColumnsProps>;
    }) => (
      <Link href={cell.row.original.id ? `/admin/becarios/${''}` : ''} className="w-67">
        <div className="flex items-center  w-full">
          <div className="flex-shrink-0 w-8 h-8">
            <Avatar
              className="w-full h-full rounded-full"
              src={cell.row.original.profilePhoto || undefined}
              alt="Foto de perfil"
            />
          </div>
          <div className="ml-4 text-start w-full">
            <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{value}</span>
          </div>
        </div>
      </Link>
    ),
  },
  {
    Header: 'Cédula',
    accessor: 'dni',
    disableSortBy: true,
    Cell: ({ value }: { value: CellValue }) => {
      const dni = formatDni(value);
      return <span>V-{dni}</span>;
    },
  },
  {
    Header: '¿Cursando CVA?',
    accessor: 'isInCva',
    disableSortBy: true,
  },
  {
    Header: '¿Finalizo el CVA?',
    accessor: 'cvaFinished',
    disableSortBy: true,
  },
  {
    Header: 'Ubicación',
    accessor: 'cvaLocation',
    disableSortBy: true,
  },
  {
    Header: 'Ultimo módulo cursado',
    accessor: 'actualModule',
    disableSortBy: true,
  },
  {
    Header: 'Modalidad',
    accessor: 'moduleModality',
    disableSortBy: true,
  },
  {
    Header: 'Horario',
    accessor: 'schedule',
    disableSortBy: true,
  },
  {
    Header: 'Nota',
    accessor: 'qualification',
    disableSortBy: true,
  },
  {
    Header: 'Fecha de inicio',
    accessor: 'cvaStartDate',
    disableSortBy: true,
    Cell: ({ value }: { value: CellValue }) => {
      if (value === null) return <span>No hay dato</span>;
      else return <DisplayDate date={value} kind="short" />;
    },
  },
  {
    Header: 'Fecha de finalización',
    accessor: 'cvaEndDate',
    disableSortBy: true,
    Cell: ({ value }: { value: CellValue }) => {
      if (value === null) return <span>No hay dato</span>;
      else return <DisplayDate date={value} kind="short" />;
    },
  },
  {
    Header: 'Razón de no inicio',
    accessor: 'notStartedReason',
    disableSortBy: true,
    Cell: ({ value }: { value: CellValue }) => (
      <Tooltip content={value} classNames={{
        base: 'w-96'
      }}>
        <div className="max-w-sm overflow-hidden">{value || 'No aplica'}</div>
      </Tooltip>
    ),
  },
];

export default scholarCvaInformationColumns;
