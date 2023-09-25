'use client';
import { parseSkillFromDatabase } from '@/lib/utils2';
import { Workshop } from '@prisma/client';
import { CellProps, Column } from 'react-table';
import { Star } from '../../../../public/svgs/svgs';

//hora
//scholarAttendance
const speakerWorkshopsColumn: Column<Workshop>[] = [
  {
    Header: 'Actividad formativa',
    accessor: 'title',
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
  },
  {
    Header: 'Plataforma',
    accessor: 'platform',
  },
  {
    Header: 'Fecha',
    accessor: 'start_dates',
    Cell: ({ cell }: CellProps<Workshop, Date[]>) => {
      console.log(cell);
      const date = new Date(cell.value[0]);
      return (
        <span>
          {' '}
          {date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      );
    },
  },
  {
    Header: 'Competencia',
    accessor: 'asociated_skill',
    Cell: ({ cell }: CellProps<Workshop, string>) => {
      return <span>{parseSkillFromDatabase(cell.value)}</span>;
    },
  },
  {
    Header: 'Satisfacción',
    accessor: 'rating',
    Cell: ({ cell }: { cell: any }) => (
      <div className="flex gap-1 w-full h-6 text-green-600">
        {Array.from({ length: cell.value }).map((_, index) => (
          <Star key={index} />
        ))}
      </div>
    ),
  },
];

export default speakerWorkshopsColumn;
