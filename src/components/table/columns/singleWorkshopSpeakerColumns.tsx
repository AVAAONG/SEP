'use client';
import { Star } from '@/assets/svgs';
import { Workshop } from '@prisma/client';
import { Column } from 'react-table';

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
  },
  {
    Header: 'Competencia',
    accessor: 'asociated_skill',
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
