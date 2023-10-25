'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import formatDni from '@/lib/db/utils/formatDni';
import { Prisma, ScholarAttendance } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Cell, CellValue, Column } from 'react-table';

const scholarWithActivities = Prisma.validator<Prisma.WorkshopAttendanceDefaultArgs>()({
  include: {
    scholar: {
      include: {
        Scholar: {
          include: {
            collage_information: true,
          },
        },
      },
    },
  },
});
type ScholarWithActivities = Prisma.WorkshopAttendanceGetPayload<typeof scholarWithActivities>;

const ScholarActivityAttendance: Column<ScholarWithActivities>[] = [
  {
    Header: '#',
    accessor: 'id',
    Cell: ({ cell }: { cell: Cell<ScholarWithActivities> }) => {
      return <span className="font-semibold">{cell.row.index + 1}</span>;
    },
  },
  {
    Header: 'Nombre',
    accessor: 'scholar',
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<ScholarWithActivities> }) => {
      const name = `${value.Scholar[0].first_names} ${value.Scholar[0].last_names}`;
      const id = value.Scholar[0].id;
      const career = value.Scholar[0].collage_information.career;
      return (
        <Link
          href={cell.row.original.id ? `/admin/becarios/${id}` : ''}
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
            <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{name}</span>
            <span className="block text-xs font-medium text-gray-400 dark:text-slate-400">
              {career}
            </span>
            <div className="ml-4 text-start"></div>
          </div>
        </Link>
      );
    },
  },
  {
    Header: 'Cédula',
    accessor: 'scholar',
    id: 'dni',
    Cell: ({ value }: { value: CellValue }) => {
      const dni = formatDni(value.Scholar[0].dni);
      return <span>V-{dni}</span>;
    },
  },
  {
    Header: 'Género',
    accessor: 'scholar',
    id: 'gender',
    Cell: ({ value }: { value: CellValue }) => {
      if (value.Scholar[0].gender === 'M') {
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
    Header: 'Edad',
    accessor: 'scholar',
    id: 'years',
    Cell: ({ value }) => {
      const birthdate = new Date(value.Scholar[0].birthdate).getFullYear();
      const age = new Date().getFullYear() - birthdate;
      return <span>{age}</span>;
    },
  },
  {
    Header: 'Asistencia',
    accessor: 'attendance',
    Cell: ({ value }) => {
      const [attendace, setAttendance] = useState(value);
      return (
        <select
          name=""
          id=""
          className={`border-0 cursor-pointer rounded-full font-medium w-24 text-xs  p-0 ${
            attendace === 'ATTENDED'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : attendace === 'NOT_ATTENDED'
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              : attendace === 'WAITING_LIST'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
              : attendace === 'ENROLLED'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
              : ''
          }`}
          value={attendace}
          onChange={(event) => setAttendance(event.target.value as ScholarAttendance)}
        >
          <option value="ATTENDED">Asistió</option>
          <option value="NOT_ATTENDED">No asistió</option>
          <option value="WAITING_LIST">Lista de espera</option>
          <option value="ENROLLED">Inscrito</option>
        </select>
      );
    },
  },
  {
    Header: 'Telefono celular',
    accessor: 'scholar',
    id: 'cellphoneNumber',
    Cell: ({ value }) => {
      const number = value.Scholar[0].cell_phone_Number;
      return <span>{number}</span>;
    },
  },
  {
    Header: 'Whatsapp',
    accessor: 'scholar',
    id: 'whatsAppNumber',
    Cell: ({ value }) => {
      const number = value.Scholar[0].whatsapp_number;

      return <span>{number}</span>;
    },
  },
  {
    Header: 'Correo',
    accessor: 'scholar',
    id: 'email',
    Cell: ({ value }) => {
      const email = value.Scholar[0].allowedEmail;
      return <span>{email}</span>;
    },
  },
  //   {
  //     Header: 'Universidad',
  //     accessor: 'collage_information',
  //     id: 'collage',
  //     Cell: ({ value }: { value: CellValue }) => {
  //       return <span>{value.collage}</span>;
  //     },
  //   },
  //   {
  //     Header: 'Area de estudio',
  //     accessor: 'collage_information',
  //     id: 'study_area',
  //     Cell: ({ value }: { value: CellValue }) => {
  //       return <span>{parseStudyAreaFromDatabase(value.study_area)}</span>;
  //     },
  //   },
  //   {
  //     Header: 'Carrera',
  //     accessor: 'collage_information',
  //     id: 'career',
  //     Cell: ({ value }: { value: CellValue }) => {
  //       return <span>{value.career}</span>;
  //     },
  //   },
  //   {
  //     Header: 'Fecha de ingreso a AVAA',
  //     accessor: 'program_information',
  //     id: 'avaa_admission_year',

  //     Cell: ({ value }: { value: CellValue }) => {
  //       const date = new Date(value.avaa_admission_year);
  //       return (
  //         <span>
  //           {' '}
  //           {date.toLocaleDateString('es-ES', {
  //             year: 'numeric',
  //             month: 'numeric',
  //             day: 'numeric',
  //           })}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     Header: 'Año actual en AVAA',
  //     Cell: ({ cell }: { cell: Cell<ScholarWithActivities> }) => {
  //       const avaaEntryDate = cell.row.original.program_information?.avaa_admission_year
  //         ? new Date(cell.row.original.program_information.avaa_admission_year).getFullYear()
  //         : null;
  //       const age = avaaEntryDate ? new Date().getFullYear() - avaaEntryDate : null;
  //       return <span>{parseAvaaAdmisionYear(age!)}</span>;
  //     },
  //   },
];

export default ScholarActivityAttendance;
