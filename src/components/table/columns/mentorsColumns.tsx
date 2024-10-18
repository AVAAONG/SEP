'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { Mentor } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Cell, Column } from 'react-table';

interface MentorColumnsProps extends Mentor {
  age: number;
  birthDate: string;
}

const mentorColumns: Column<MentorColumnsProps>[] = [
  {
    Header: 'Nombres y Apellidos',
    accessor: (row: MentorColumnsProps) => `${row.first_name} ${row.last_name}`,
    Cell: ({ cell }: { cell: Cell<MentorColumnsProps> }) => (
      <Link
        href={cell.row.original.id ? `mentores/${cell.row.original.id}` : ''}
        className="flex items-center"
      >
        <div className="flex-shrink-0 w-8 h-8">
          <Image
            className="w-full h-full rounded-full"
            width={32}
            height={32}
            src={
              cell.row.original.photo
                ? `${cell.row.original.photo}?sp=r&st=2024-02-08T16:10:32Z&se=2034-02-09T00:10:32Z&spr=https&sv=2022-11-02&sr=c&sig=m%2B0OpD98j6ZoUyhkBCX1Zotm%2BrwC5Pt2%2FO6bvDQfCJk%3D`
                : defailProfilePic
            }
            alt="Foto de perfil"
          />
        </div>
        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {cell.row.original.first_name} {cell.row.original.last_name}
          </span>
        </div>
      </Link>
    ),
  },
  {
    Header: 'Cédula',
    accessor: 'id_number',
  },
  {
    Header: 'Fecha de nacimiento',
    accessor: 'birth_date',
    Cell: ({ value }) => <div>{new Date(value).toLocaleDateString()}</div>,
  },
  {
    Header: 'Género',
    accessor: 'gender',
  },
  {
    Header: 'Teléfono',
    accessor: 'phone',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
  {
    Header: 'Lugar de Residencia',
    accessor: 'residence',
  },
  {
    Header: 'Profesión',
    accessor: 'profession',
    Cell: ({ value }) => <div className="w-72 overflow-x-hidden">{value}</div>,
  },
  {
    Header: 'Año de ingreso en AVAA',
    accessor: 'created_at',
    Cell: ({ value }) => <div>{new Date(value).getFullYear()}</div>,
  },
];

export default mentorColumns;
