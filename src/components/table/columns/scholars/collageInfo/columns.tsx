'use client';
import formatDni from '@/lib/db/utils/formatDni';
import { Avatar } from '@nextui-org/avatar';
import { Tooltip } from '@nextui-org/tooltip';
import Link from 'next/link';
import { Cell, CellValue, Column } from 'react-table';

export interface scholarCollageInformationColumnsProps {
  id: string;
  first_names: string;
  last_names: string;
  profilePhoto: string;
  dni: string;
  kindOfCollage: string;
  studyRegime: string;
  collage: string;
  completeCollage: string;
  studyArea: string;
  carrer: string;
  mention: string;
  currentAcademicPeriod: string;
  collageStartDate: string;
  grade: string;
}

const scholarCollageInformationColumns: Column<scholarCollageInformationColumnsProps>[] = [
  {
    Header: 'Nombre',
    accessor: (row: scholarCollageInformationColumnsProps) =>
      `${row.first_names} ${row.last_names}`,
    Cell: ({
      value,
      cell,
    }: {
      value: CellValue;
      cell: Cell<scholarCollageInformationColumnsProps>;
    }) => (
      <Link href={cell.row.original.id ? `/admin/becarios/${''}` : ''} className="w-67">
        <div className="flex items-center  w-full">
          <div className="flex-shrink-0 w-8 h-8">
            <Avatar
              className="w-full h-full rounded-full"
              src={cell.row.original.profilePhoto || undefined}
              alt="Foto de perfil"
            />
          </div>
          <div className="ml-4 text-start w-full">
            <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{value}</span>
          </div>
        </div>
      </Link>
    ),
  },
  {
    Header: 'Cédula',
    accessor: 'dni',
    Cell: ({ value }: { value: CellValue }) => {
      const dni = formatDni(value);
      return <span>V-{dni}</span>;
    },
  },
  {
    Header: 'Tipo de universidad',
    accessor: 'kindOfCollage',
  },
  {
    Header: 'Regimen de estudio',
    accessor: 'studyRegime',
  },
  {
    Header: 'Fecha de inicio de estudios',
    accessor: 'collageStartDate',
  },

  {
    Header: 'Universidad',
    accessor: 'collage',
  },
  {
    Header: 'Area de estudio',
    accessor: 'studyArea',
  },
  {
    Header: 'Carrera',
    accessor: 'carrer',
    Cell: ({ value, cell }) => {
      return (
        <Tooltip content={cell.row.original.completeCollage}>
          <button>{value}</button>
        </Tooltip>
      );
    },
  },
  {
    Header: 'Mención',
    accessor: 'mention',
  },
  {
    Header: 'Periodo academico actual',
    accessor: 'currentAcademicPeriod',
  },
  {
    Header: 'Nota',
    accessor: 'grade',
  },
];

export default scholarCollageInformationColumns;
