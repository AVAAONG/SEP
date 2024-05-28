'use client';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { Cell, CellValue, Column } from 'react-table';

const probationScholarColumns: Column<any>[] = [
  {
    Header: 'Nombre',
    accessor: (row: any) => `${row.first_names} ${row.last_names}`,
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<any> }) => (
      <Link href={`${cell.row.original.id}`} className="flex items-center">
        <div className="flex-shrink-0 w-8 h-8">
          <Avatar
            className="w-full h-full rounded-full"
            src={cell.row.original.profileImage}
            alt="Foto de perfil"
          />
        </div>
        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{value}</span>
        </div>
      </Link>
    ),
  },
  {
    Header: 'Telefono celular',
    accessor: 'cell_phone_Number',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
  {
    Header: 'Tipo de probatorio',
    accessor: 'prbationKind',
  },
  {
    Header: 'Universidad',
    accessor: 'collage',
    id: 'collage',
    Cell: ({ value }: { value: CellValue }) => {
      return <span>{value}</span>;
    },
  },
  {
    Header: 'Carerra',
    accessor: 'career',
  },
  {
    Header: 'Promedio',
    accessor: 'probation_average',
  },
  {
    Header: 'Fecha de inicio de probatorio',
    accessor: 'probation_starting_date',
  },
  {
    Header: 'Voluntariado interno realizado',
    accessor: 'd',
  },
  {
    Header: 'Voluntariado externo realizado',
    accessor: 'f',
  },
  {
    Header: 'Actividades formativas realizadas',
    accessor: 'atendedWorkshops',
  },
  {
    Header: 'Chats realizados',
    accessor: 'atendedChats',
  },
  {
    Header: 'Status en el CVA',
    accessor: 'jhjkk',
  },
];

export default probationScholarColumns;
