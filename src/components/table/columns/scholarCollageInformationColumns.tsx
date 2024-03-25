'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import formatDni from '@/lib/db/utils/formatDni';
import { Gender } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Cell, CellValue, Column } from 'react-table';

interface ScholarTableData {
  id: string;
  first_names: string;
  last_names: string;
  dni: string;
  birthdate: string;
  years: number;
  gender: Gender;
  local_phone_number: string;
  cell_phone_Number: string;
  whatsapp_number: string;
  email: string;
  collage: string;
  career: string;
  avaaStarteYear: Date;
  yearsInAvaa: number;
  studyArea: string;
  socialMedia: any[]; // Replace any with the actual type
  atendedChats: number;
  atendedWorkshops: number;
}
[];

const scholarAllInformationCollumn: Column<ScholarTableData>[] = [
  {
    Header: 'Nombre',
    accessor: (row: ScholarTableData) => `${row.first_names} ${row.last_names}`,
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<ScholarTableData> }) => (
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
    accessor: 'email',
  },
  {
    Header: 'Universidad',
    accessor: 'collage',
    id: 'collage',
    Cell: ({ value }: { value: CellValue }) => {
      return <span>{value}</span>;
    },
  },
  {
    Header: 'Area de estudio',
    accessor: 'studyArea',
  },
  {
    Header: 'Carrera',
    accessor: 'career',
  },
  {
    Header: 'Fecha de ingreso a AVAA',
    accessor: 'avaaStarteYear',
  },
  {
    Header: 'Año actual en AVAA',
    accessor: 'yearsInAvaa',
  },
  {
    Header: 'Redes Sociales',
    accessor: 'socialMedia',
    Cell: ({ value }) => (
      <div className="flex gap-2 justify-center">
        {value.map((socialNetwork: any, index: number) => (
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
    Header: 'Actividades formativas realizadas',
    accessor: 'atendedWorkshops',
  },
  {
    Header: 'Chat clubs  realizadas',
    accessor: 'atendedChats',
  },
];

export default scholarAllInformationCollumn;
