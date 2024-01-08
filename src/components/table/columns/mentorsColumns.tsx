'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { Mentor } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Cell, Column } from 'react-table';
import { CurriculumIcon } from '../../../../public/svgs/svgs';

interface MentorColumnsProps extends Mentor, Omit<Mentor, 'birthdate'> {
  age: number;
  birthDate: string;
}

const mentorColumns: Column<MentorColumnsProps>[] = [
  {
    Header: 'Nombre',
    accessor: (row: MentorColumnsProps) => `${row.first_name} ${row.last_name} ${row.company}`,
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
            src={cell.row.original.image ? cell.row.original.image : defailProfilePic}
            alt="Foto de perfil"
          />
        </div>

        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {cell.row.original.first_name} {cell.row.original.last_name}
          </span>
          {cell.row.original.company && (
            <span className="block text-xs font-medium text-gray-400 dark:text-slate-400 w-72 overflow-x-hidden">
              {cell.row.original.company} | {cell.row.original.company_position}
            </span>
          )}
        </div>
      </Link>
    ),
  },
  {
    Header: 'Telefono',
    accessor: 'cell_phone',
  },
  {
    Header: 'Profesion',
    accessor: 'profession',
    Cell: ({ value }) => <div className="w-72  overflow-x-hidden">{value}</div>,
  },
  {
    Header: 'Edad',
    accessor: 'age',
  },
  {
    Header: 'Redes Sociales',
    Cell: ({ cell }: { cell: any }) => (
      <div className="flex gap-2 justify-center">
        {cell.row.original.socialNetworks.map((socialNetwork: any) => (
          <Link
            target="_blank"
            href={socialNetwork.url ? socialNetwork.url : ''}
            className="w-8 text-primary-light dark:text-primary-light rounded-full bg-gray-100 dark:bg-slate-600 p-2"
          >
            {socialNetwork.icon}
          </Link>
        ))}
      </div>
    ),
  },
  {
    Header: 'Curriculum',
    accessor: 'curriculum',
    Cell: ({ value }) => (
      <div className="m-auto w-6">
        <Link
          target="_blank"
          href={value ? value : ''}
          className="w-6 text-primary-light dark:text-primary-light"
        >
          <CurriculumIcon />
        </Link>
      </div>
    ),
  },
];

export default mentorColumns;
