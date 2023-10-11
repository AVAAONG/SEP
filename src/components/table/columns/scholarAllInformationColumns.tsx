'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { Scholar, ScholarProgramInformation, User, WorkshopSpeaker } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Cell, CellProps, Column } from 'react-table';

const scholarAllInformationCollumn: Column<Scholar> = [
  {
    Header: 'Nombre',
    accessor: (row: WorkshopSpeaker) => `${row.first_names} ${row.last_names}`,
    Cell: ({ cell }: { cell: Cell<Scholar> }) => (
      <Link
        href={cell.row.original.id ? `becarios/${cell.row.original.id}` : ''}
        className="flex items-center"
      >
        <div className="flex-shrink-0 w-8 h-8">
          <Image
            className="w-full h-full rounded-full"
            src={cell.row.original.image ? cell.row.original.image : defailProfilePic}
            alt="Foto de perfil"
          />
        </div>
        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {cell.row.original.first_names} {cell.row.original.last_names}
          </span>
          <span className="block text-xs font-medium text-gray-400 dark:text-slate-400">
            {cell.row.original.job_company}
          </span>
        </div>
      </Link>
    ),
  },
  {
    Header: 'Cédula',
    accessor: 'dni',
  },
  {
    Header: 'Fecha de nacimiento',
    accessor: 'birthdate',
    Cell: ({ cell }: CellProps<User>) => {
      const date = new Date(cell.value);
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
  // {
  //   Header: 'Edad',
  //   Cell: ({ cell }: { cell: Cell<User> }) => {
  //     const birthdate = new Date(cell.value).getFullYear();
  //     const age = new Date().getFullYear() - birthdate;
  //     return <span>{age}</span>;
  //   },
  // },
  {
    Header: 'Género',
    accessor: 'gender',
    Cell: ({ cell }: CellProps<User>) => {
      if (cell.value === 'M') {
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
    Header: 'Dirección',
    accessor: 'address',
  },
  {
    Header: 'Universidad',
    accessor: 'collage',
  },
  {
    Header: 'Area de estudio',
    accessor: 'study_area',
  },
  {
    Header: 'Carrera',
    accessor: 'career',
  },
  {
    Header: 'Fecha de ingreso a AVAA',
    accessor: 'program_information',
    Cell: ({ cell }: CellProps<ScholarProgramInformation>) => {
      const date = new Date(cell.value.avaa_admission_year);
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
  // {
  //   Header: 'Año actual en AVAA',
  //   Cell: ({ cell }: { cell: Cell<User> }) => {
  //     const avaaEntryDate = new Date(cell.row.original.avaa_entry_date);
  //     const ageDifMs = Date.now() - avaaEntryDate.getTime();
  //     const ageDate = new Date(ageDifMs);
  //     return <span>{Math.abs(ageDate.getUTCFullYear())}</span>;
  //   },
  // },
  {
    Header: 'Redes Sociales',
    Cell: ({ cell }: { cell: any }) => (
      <div className="flex gap-2 justify-center">
        {cell.row.original.socialNetworks.map((socialNetwork: any, index: number) => (
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
  // {
  //   Header: 'Actividades realizadas',
  //   Cell: ({ cell }: { cell: Cell<WorkshopSpeaker> }) => (
  //     <div className="m-auto divide-x-2 dark:divide-slate-600">
  //       <span className="text center px-4 py-1 text-xs bg-primary-light dark:bg-primary-light text-white dark:text-slate-200 rounded-full rounded-r-none font-semibold">
  //         4
  //       </span>
  //       <span className="text center px-4 py-1 text-xs bg-primary-light dark:bg-primary-light text-white dark:text-slate-200 rounded-full rounded-l-none font-semibold">
  //         10
  //       </span>
  //     </div>
  //   ),
  // },
];

export default scholarAllInformationCollumn;
