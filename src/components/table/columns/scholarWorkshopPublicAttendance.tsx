'use client';
import { IScholarWorkshopColumn } from '@/app/admin/becarios/[scholarId]/page';
import { parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import { CellProps, Column } from 'react-table';

const scholarPublicWorkshopAttendanceColumns: Column<IScholarWorkshopColumn>[] = [
  {
    Header: '#',
    Cell: ({ cell }: CellProps<IScholarWorkshopColumn>) => {
      return <span>{cell.row.index + 1}</span>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Actividad formativa',
    accessor: 'title',
    Cell: ({ value, cell }) => (
      <div>
        <div className="block w-96 text-center overflow-x-scroll">{value}</div>
      </div>
    ),
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
    accessor: 'skill',
    Cell: ({ value }) => {
      return <span>{parseSkillFromDatabase(value)}</span>;
    },
    disableSortBy: true,
  },
];

export default scholarPublicWorkshopAttendanceColumns;
