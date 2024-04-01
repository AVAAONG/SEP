'use client';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { Cell, CellValue, Column } from 'react-table';

export interface ScholarActivitiesInformationColumnsProps {
  id: string;
  first_names: string;
  last_names: string;
  profilePhoto: string | null;
  whatsAppNumber: string | null;
  email: string | null;
  doneWorkshops: number | undefined;
  doneChats: number | undefined;
  doneVolunteerHours: number | undefined;
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
    Header: 'Numero WhatsApp',
    accessor: 'whatsAppNumber',
  },
  {
    Header: 'Correo electronico',
    accessor: 'email',
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
