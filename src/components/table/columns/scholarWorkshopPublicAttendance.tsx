'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import { Modality, Skill, Speaker } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { CellProps, Column } from 'react-table';

type WorkshopTableObject = {
  id: string;
  title: string;
  duration: number;
  modality: Modality;
  category: Skill;
  speaker: Speaker[];
};

const scholarPublicWorkshopAttendanceColumns: Column<WorkshopTableObject>[] = [
  {
    Header: '#',
    Cell: ({ cell }: CellProps<WorkshopTableObject>) => {
      return <span>{cell.row.index + 1}</span>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Actividad formativa',
    accessor: 'title',
    Cell: ({ value }) => <div className="block w-80 overflow-x-scroll">{value}</div>,
  },
  {
    Header: 'Facilitador',
    accessor: 'speaker',
    Cell: ({ value, cell }) => {
      return (
        <Link
          href={cell.row.original.id ? `chats/${cell.row.original.id}` : ''}
          className="flex items-center"
        >
          <div className="flex-shrink-0 w-8 h-8">
            <Image
              className="w-full h-full rounded-full"
              src={value[0].image ? value[0].image : defailProfilePic}
              alt="Foto de perfil"
            />
          </div>
          <div className="ml-4 text-start">
            <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
              {value[0].first_names} {value[0].last_names}
            </span>
            <span className="block w-32 overflow-x-hidden text-xs font-medium text-gray-400 dark:text-slate-400">
              {value[0].job_company}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    Header: 'Duracion',
    accessor: 'duration',
    Cell: ({ value }) => {
      return <span>{value} horas</span>;
    },
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    Cell: ({ value }) => {
      return <span>{parseModalityFromDatabase(value)}</span>;
    },
    disableSortBy: true,
  },

  {
    Header: 'Competencia',
    accessor: 'category',
    Cell: ({ value }) => {
      return <span>{parseSkillFromDatabase(value)}</span>;
    },
    disableSortBy: true,
  },
];

export default scholarPublicWorkshopAttendanceColumns;
