'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import formatDni from '@/lib/db/utils/formatDni';
import { parseAvaaAdmisionYear, parseStudyAreaFromDatabase } from '@/lib/parseFromDatabase';
import { Prisma, Scholar } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Cell, CellValue, Column } from 'react-table';

const scholarWithActivities = Prisma.validator<Prisma.ScholarDefaultArgs>()({
  include: {
    program_information: {
      include: {
        attended_chats: true,
        attended_workshops: true,
      },
    },
    collage_information: true,
  },
});
type ScholarWithActivities = Prisma.ScholarGetPayload<typeof scholarWithActivities>;

const scholarAllInformationCollumn: Column<ScholarWithActivities>[] = [
  {
    Header: 'Nombre',
    accessor: (row: Scholar) => `${row.first_names} ${row.last_names}`,
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<ScholarWithActivities> }) => (
      <Link
        href={cell.row.original.id ? `becarios/${cell.row.original.id}` : ''}
        className="flex items-center"
      >
        <div className="flex-shrink-0 w-8 h-8">
          <Image
            className="w-full h-full rounded-full"
            src={defailProfilePic}
            alt="Foto de perfil"
          />
        </div>
        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{value}</span>
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
    Header: 'Fecha de nacimiento',
    accessor: 'birthdate',
    Cell: ({ value }: { value: CellValue }) => {
      const date = new Date(value);
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
    Header: 'Edad',
    Cell: ({ cell }: { cell: Cell<ScholarWithActivities> }) => {
      const birthdate = new Date(cell.row.original.birthdate).getFullYear();
      const age = new Date().getFullYear() - birthdate;
      return <span>{age}</span>;
    },
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
  },
  {
    Header: 'Telefono local',
    accessor: 'local_phone_number',
  },
  {
    Header: 'Telefono celular',
    accessor: 'cell_phone_Number',
  },
  {
    Header: 'Whatsapp',
    accessor: 'whatsapp_number',
  },
  {
    Header: 'Correo',
    accessor: 'allowedEmail',
  },
  {
    Header: 'Universidad',
    accessor: 'collage_information',
    id: 'collage',
    Cell: ({ value }: { value: CellValue }) => {
      return <span>{value.collage}</span>;
    },
  },
  {
    Header: 'Area de estudio',
    accessor: 'collage_information',
    id: 'study_area',
    Cell: ({ value }: { value: CellValue }) => {
      return <span>{parseStudyAreaFromDatabase(value.study_area)}</span>;
    },
  },
  {
    Header: 'Carrera',
    accessor: 'collage_information',
    id: 'career',
    Cell: ({ value }: { value: CellValue }) => {
      return <span>{value.career}</span>;
    },
  },
  {
    Header: 'Fecha de ingreso a AVAA',
    accessor: 'program_information',
    id: 'avaa_admission_year',

    Cell: ({ value }: { value: CellValue }) => {
      const date = new Date(value.avaa_admission_year);
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
    Header: 'Año actual en AVAA',
    Cell: ({ cell }: { cell: Cell<ScholarWithActivities> }) => {
      const avaaEntryDate = cell.row.original.program_information?.avaa_admission_year
        ? new Date(cell.row.original.program_information.avaa_admission_year).getFullYear()
        : null;
      const age = avaaEntryDate ? new Date().getFullYear() - avaaEntryDate : null;
      return <span>{parseAvaaAdmisionYear(age!)}</span>;
    },
  },
  {
    Header: 'Redes Sociales',
    Cell: ({ cell }: { cell: any }) => (
      <div className="flex gap-2 justify-center">
        {cell.row.original.socialMedia.map((socialNetwork: any, index: number) => (
          <Link
            key={index}
            target="_blank"
            href={socialNetwork.url ? socialNetwork.url : ''}
            className="w-8 text-primary-light dark:text-primary-light rounded-full bg-gray-100 dark:bg-slate-600 p-2"
          >
            {socialNetwork.icon}
          </Link>
        ))}
      </div>
    ),
  },
  {
    Header: 'Actividades realizadas',
    accessor: 'program_information',
    Cell: ({ value }: { value: CellValue }) => (
      <div className="m-auto divide-x-2 dark:divide-slate-600">
        <span className="text center px-4 py-1 text-xs bg-blue-600 dark:bg-blue-500 text-white dark:text-slate-200 rounded-full rounded-r-none font-semibold">
          {value.attended_workshops.length}
        </span>
        <span className="text center px-4 py-1 text-xs bg-red-600 dark:bg-red-500 text-white dark:text-slate-200 rounded-full rounded-l-none font-semibold">
          {value.attended_chats.length}
        </span>
      </div>
    ),
  },
];

export default scholarAllInformationCollumn;
