'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { CurriculumIcon } from '@/assets/svgs';
import { WorkshopSpeaker } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Cell, Column } from 'react-table';

const workshopSpeakerColumns: Column<WorkshopSpeaker>[] = [
  {
    Header: 'Nombre',
    accessor: (row: WorkshopSpeaker) => `${row.first_names} ${row.last_names} ${row.job_company}`,
    Cell: ({ cell }: { cell: Cell<WorkshopSpeaker> }) => (
      <Link href={`talleres/${cell.row.original.id}`} className="flex items-center">
        <div className="flex-shrink-0 w-8 h-8">
          <Image
            className="w-full h-full rounded-full"
            src={cell.row.original.image ? cell.row.original.image : defailProfilePic}
            alt="Foto de perfil"
          />
        </div>
        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {cell.row.original.first_names} {cell.row.original.last_names}
          </span>
          <span className="block text-xs font-medium text-gray-400 dark:text-slate-400">
            {cell.row.original.job_company}
          </span>
        </div>
      </Link>
    ),
  },
  {
    Header: 'Telefono',
    accessor: 'phone_number',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
  {
    Header: 'Redes Sociales',
    Cell: ({ cell }: { cell: any }) => (
      <div className="flex gap-2 justify-center">
        {cell.row.original.socialNetworks.map((socialNetwork: any) => (
          <Link
            target="_blank"
            href={socialNetwork.url}
            className="w-8 text-green-700 dark:text-green-400 rounded-full bg-gray-100 dark:bg-slate-600 p-2"
          >
            {socialNetwork.icon}
          </Link>
        ))}
      </div>
    ),
  },
  {
    Header: 'Curriculum',
    Cell: ({ cell }: { cell: Cell<WorkshopSpeaker> }) => (
      <div className="m-auto w-6">
        <Link
          target="_blank"
          href={cell.row.original.curriculum ? cell.row.original.curriculum : ''}
          className="w-6 text-green-700 dark:text-green-500"
        >
          <CurriculumIcon />
        </Link>
      </div>
    ),
  },
  {
    Header: 'Actividades realizadas',
    Cell: ({ cell }: { cell: Cell<WorkshopSpeaker> }) => (
      <div className="m-auto divide-x-2 dark:divide-slate-600">
        <span className="text center px-4 py-1 text-xs bg-green-500 dark:bg-green-600 text-white dark:text-slate-200 rounded-full rounded-r-none font-semibold">
          4
        </span>
        <span className="text center px-4 py-1 text-xs bg-green-500 dark:bg-green-600 text-white dark:text-slate-200 rounded-full rounded-l-none font-semibold">
          10
        </span>
      </div>
    ),
  },
];

export default workshopSpeakerColumns;
