'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { changeMentorMenteeBol, changeMentorStatus } from '@/lib/db/utils/mentors';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { Mentor, MentorStatus } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Cell, CellValue, Column } from 'react-table';
import { toast } from 'react-toastify';
let timeout: NodeJS.Timeout;

const debaunceTest = () => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    await revalidateSpecificPath('admin/mentoria/captacion');
  }, 1000);
};

const ActiveMentorsColumns: Column<Mentor>[] = [
  {
    Header: 'Nombres y Apellidos',
    accessor: (row: Mentor) => `${row.first_name} ${row.last_name}`,
    Cell: ({ cell }: { cell: Cell<Mentor> }) => (
      <Link
        href={cell.row.original.id ? `mentores/${cell.row.original.id}` : ''}
        className="flex items-center"
      >
        <div className="flex-shrink-0 w-8 h-8">
          <Image
            className="w-full h-full rounded-full"
            width={32}
            height={32}
            src={
              cell.row.original.photo
                ? `${cell.row.original.photo}?sp=r&st=2024-02-08T16:10:32Z&se=2034-02-09T00:10:32Z&spr=https&sv=2022-11-02&sr=c&sig=m%2B0OpD98j6ZoUyhkBCX1Zotm%2BrwC5Pt2%2FO6bvDQfCJk%3D`
                : defailProfilePic
            }
            alt="Foto de perfil"
          />
        </div>
        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {cell.row.original.first_name} {cell.row.original.last_name}
          </span>
        </div>
      </Link>
    ),
  },
  {
    Header: 'Cédula',
    accessor: 'id_number',
  },
  {
    Header: 'Fecha de nacimiento',
    accessor: 'birth_date',
    Cell: ({ value }) => <div>{new Date(value).toLocaleDateString()}</div>,
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
    Header: 'Teléfono',
    accessor: 'phone',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
  {
    Header: 'Lugar de Residencia',
    accessor: 'residence',
  },
  {
    Header: 'Profesión',
    accessor: 'profession',
    Cell: ({ value }) => <div className="w-72 overflow-x-hidden">{value}</div>,
  },
  {
    Header: 'Año de ingreso en AVAA',
    accessor: 'created_at',
    Cell: ({ value }) => <div>{new Date(value).toLocaleDateString()}</div>,
  },
  {
    Header: 'Estatus',
    accessor: 'status',
    Cell: ({ value, cell }) => {
      const [attendace, setAttendance] = useState(value);
      const handleStatusChange = async (status: MentorStatus) => {
        await changeMentorStatus(cell.row.original.id, status);
        setAttendance(status);
        await debaunceTest();
      };
      return (
        <select
          className={`border-0 cursor-pointer rounded-full font-medium w-24 text-xs  p-0 outline-transparent ${
            attendace === 'AVAILABLE'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : attendace === 'UNAVAILABLE'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                : attendace === 'ASSIGNED'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  : attendace === 'RETIRED'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    : ''
          }`}
          value={attendace}
          onChange={async (event) => {
            const attendance = event.target.value as MentorStatus;
            toast.promise(handleStatusChange(attendance), {
              pending: 'Cambiando estatus...',
              success: 'Estatus actualizado exitosamente',
              error: 'Error al cambiar estatus',
            });
          }}
        >
          <option value="AVAILABLE">Disponible</option>
          <option value="UNAVAILABLE">No disponible</option>
          <option value="ASSIGNED">Asignado</option>
          <option value="RETIRED">Retirado</option>
        </select>
      );
    },
  },
  {
    Header: '¿Nuevo mentee?',
    accessor: 'newMentee',
    Cell: ({ value, cell }) => {
      const [attendace, setAttendance] = useState(value);
      const handleStatusChange = async (status: boolean) => {
        await changeMentorMenteeBol(cell.row.original.id, status);
        setAttendance(status);
        await debaunceTest();
      };
      return (
        <select
          className={`border-0 cursor-pointer rounded-full font-medium w-24 text-xs  p-0 outline-transparent ${
            attendace === true
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          }`}
          value={attendace.toString()}
          onChange={async (event) => {
            const attendance = event.target.value === 'true';
            toast.promise(handleStatusChange(attendance), {
              pending: 'Cambiando estatus...',
              success: 'Estatus actualizado exitosamente',
              error: 'Error al cambiar estatus',
            });
          }}
        >
          <option value="true">Si</option>
          <option value="false">No</option>
        </select>
      );
    },
  },
  {
    Header: 'Mentees actuales',
    accessor: 'mentees',
    // Cell: ({ value }) => <div>{new Date(value).toLocaleDateString()}</div>,
  },
];
export default ActiveMentorsColumns;
