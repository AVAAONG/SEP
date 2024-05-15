'use client';
import formatDni from '@/lib/db/utils/formatDni';
import { Tooltip } from '@nextui-org/react';
import { Cell, CellValue, Column } from 'react-table';
import ScholarColumnWidget from '../commons/ScholarWidget';

export interface scholarCollageInformationColumnsProps {
  id: string;
  name: string;
  profilePhoto: string | null;
  dni: string;
  kindOfCollage: string;
  collageStartDate: string;
  studyRegime: string;
  collage: string;
  collageCompleteName: string;
  studyArea: string;
  carrer: string;
  mention: string;
  currentAcademicPeriod: number;
  grade: number;
}

const scholarCollageInformationColumns: Column<scholarCollageInformationColumnsProps>[] = [
  {
    Header: 'Nombre',
    accessor: 'name',
    Cell: ({
      value,
      cell,
    }: {
      value: CellValue;
      cell: Cell<scholarCollageInformationColumnsProps>;
    }) => (
      <ScholarColumnWidget
        scholarId={cell.row.original.id}
        scholarName={value}
        scholarPhoto={cell.row.original.profilePhoto}
      />
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
    Cell: ({ value, cell }) => {
      return (
        <Tooltip content={cell.row.original.collageCompleteName}>
          <div>{value}</div>
        </Tooltip>
      );
    },
  },
  {
    Header: 'Area de estudio',
    accessor: 'studyArea',
  },
  {
    Header: 'Carrera',
    accessor: 'carrer',
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
