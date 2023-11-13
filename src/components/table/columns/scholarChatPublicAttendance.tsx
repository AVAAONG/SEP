'use client';
import { parseModalityFromDatabase } from '@/lib/utils2';
import { Modality, Skill } from '@prisma/client';
import { CellProps, Column } from 'react-table';

type ChatDataTable = {
  id: string;
  title: string;
  duration: number;
  modality: Modality;
  category: Skill;
  condition: string;
};

const scholarPublicChatAttendanceColumns: Column<ChatDataTable>[] = [
  {
    Header: '#',
    Cell: ({ cell }: CellProps<ChatDataTable>) => {
      return <span>{cell.row.index + 1}</span>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Chat club',
    accessor: 'title',
    Cell: ({ value }) => <div className="block w-80 overflow-x-scroll">{value}</div>,
  },
  {
    Header: 'Condición',
    accessor: 'condition',
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
    Header: 'Nivel',
    accessor: 'category',
    Cell: ({ value }) => {
      return <span>{value}</span>;
    },
    disableSortBy: true,
  },
];

export default scholarPublicChatAttendanceColumns;
