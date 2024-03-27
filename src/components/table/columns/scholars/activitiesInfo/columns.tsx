'use client';
import formatDni from '@/lib/db/utils/formatDni';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { Cell, CellValue, Column } from 'react-table';

export interface ScholarActivitiesInformationColumnsProps {
  id: string;
  first_names: string;
  last_names: string;
  profilePhoto: string | null;
  dni: string;
  doneWorkshops: number;
  doneChats: number;
  doneVolunteerHours: number;
}
const scholarActivitiesInformationColumns: Column<ScholarActivitiesInformationColumnsProps>[] = [
  {
    Header: 'Nombre',
    accessor: (row: ScholarActivitiesInformationColumnsProps) =>
      `${row.first_names} ${row.last_names}`,
    Cell: ({
      value,
      cell,
    }: {
      value: CellValue;
      cell: Cell<ScholarActivitiesInformationColumnsProps>;
    }) => (
      <Link
        href={cell.row.original.id ? `/admin/becarios/${cell.row.original.id}` : ''}
        className="w-67"
      >
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
    Header: 'Actividades formativas',
    accessor: 'doneWorkshops',
  },
  {
    Header: 'Chats Clubs de ingles',
    accessor: 'doneChats',
  },
  {
    Header: 'Horas de voluntariado',
    accessor: 'doneVolunteerHours',
  },
];

export default scholarActivitiesInformationColumns;
