'use client';
import formatDni from '@/lib/db/utils/formatDni';
import { Tooltip } from '@nextui-org/react';
import { Gender } from '@prisma/client';
import { Cell, CellValue, Column } from 'react-table';
import ScholarColumnWidget from '../commons/ScholarWidget';

export interface ScholarAllInformationColumnProps {
  id: string;
  name: string;
  profilePhoto: string | null;
  dni: string;
  birthdate: string;
  years: number;
  gender: Gender;
  whatsapp_number: string;
  email: string | null;
  avaaStarteYear: string;
  yearsInAvaa: string;
  programStatus: string;
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

const scholarAllInformationColumns: Column<ScholarAllInformationColumnProps>[] = [
  {
    Header: 'Nombre',
    accessor: 'name',
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<ScholarAllInformationColumnProps> }) => (
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
    disableSortBy: true,
    Cell: ({ value }: { value: CellValue }) => {
      const dni = formatDni(value);
      return <span>V-{dni}</span>;
    },
  },
  {
    Header: 'Fecha de nacimiento',
    accessor: 'birthdate',
  },
  {
    Header: 'Edad',
    accessor: 'years',
  },
  {
    Header: 'Género',
    accessor: 'gender',
    Cell: ({ value }: { value: CellValue }) => {
      if (value === 'M') {
        return (
          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
            Masculino
          </span>
        );
      } else {
        return (
          <span className="inline-flex items-center bg-rose-100 text-rose-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-rose-900 dark:text-rose-300">
            Femenino
          </span>
        );
      }
    },
    disableSortBy: true,
  },
  {
    Header: 'Celular whatsapp',
    accessor: 'whatsapp_number',
    disableSortBy: true,
  },
  {
    Header: 'Correo electrónico',
    accessor: 'email',
    disableSortBy: true,
  },
  {
    Header: 'Fecha de ingreso a AVAA',
    accessor: 'avaaStarteYear',
  },
  {
    Header: 'Año en AVAA',
    accessor: 'yearsInAvaa',
    filter: 'equals', // filter the exact value
  },
  {
    Header: 'Status',
    accessor: 'programStatus',
    Cell: ({ value }: { value: CellValue }) => {
      if (value === 'Normal') {
        return (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            Regular
          </span>
        );
      } else if (value === 'Probatorio 1') {
        return (
          <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            Probatorio 1
          </span>
        );
      } else if (value === 'Probatorio 2') {
        return (
          <span className="inline-flex items-center bg-rose-100 text-rose-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-rose-900 dark:text-rose-300">
            Probatorio 2
          </span>
        );
      } else {
        return (
          <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300">
            ERROR
          </span>
        );
      }
    },
    disableSortBy: true,
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

export default scholarAllInformationColumns;
