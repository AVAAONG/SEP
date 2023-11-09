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
    Header: 'Fecha',
    accessor: 'start_dates',
    Cell: ({ cell }) => {
      const date = new Date(cell.value[0]);
      return (
        <span>
          {' '}
          {date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </span>
      );
    },
  },
  {
    Header: 'Hora de inicio',
    id: 'startHour',
    accessor: 'start_dates',
    Cell: ({ cell }) => {
      const date = new Date(cell.value[0]);
      return <span> {date.toLocaleTimeString('es-ES')}</span>;
    },
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    Cell: ({ value }) => {
      return <span>{parseModalityFromDatabase(value)}</span>;
    },
  },
  {
    Header: 'Plataforma',
    accessor: 'platform',
  },
  {
    Header: 'Competencia',
    accessor: 'skill',
    Cell: ({ value }) => {
      return <span>{parseSkillFromDatabase(value)}</span>;
    },
  },
  //   {
  //     Header: 'Satisfacción',
  //     accessor: 'rating',
  //     Cell: ({ cell }: { cell: any }) => (
  //       <div className="flex gap-1 w-full h-6 text-green-600">
  //         {Array.from({ length: cell.value }).map((_, index) => (
  //           <Star key={index} />
  //         ))}
  //       </div>
  //     ),
  //   },
];

export default scholarPublicWorkshopAttendanceColumns;
