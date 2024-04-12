'use client';
import { IScholarForAttendanceTable } from '@/app/admin/chats/[chatId]/page';
import { changeScholarAttendance, changeScholarAttendanceChat } from '@/lib/db/utils/Workshops';
import formatDni from '@/lib/db/utils/formatDni';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { Avatar, Chip } from '@nextui-org/react';
import { ScholarAttendance } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import { Cell, CellValue, Column } from 'react-table';
import { toast } from 'react-toastify';

const ScholarActivityAttendance: Column<IScholarForAttendanceTable>[] = [
  {
    Header: '#',
    accessor: 'id',
    Cell: ({ cell }) => {
      return <span className="font-semibold">{cell.row.index + 1}</span>;
    },
  },
  {
    Header: 'Nombre',
    accessor: (row: IScholarForAttendanceTable) => `${row.first_names} ${row.last_names}`,
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<IScholarForAttendanceTable> }) => {
      const id = cell.row.original.id;
      const career = '';
      return (
        <Link href={cell.row.original.id ? `/admin/becarios/${id}` : ''} className="w-67">
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
              <span className="block text-xs font-medium text-gray-400 dark:text-slate-400">
                {career}
              </span>
              <div className="ml-4 text-start"></div>
            </div>
          </div>
        </Link>
      );
    },
  },
  {
    Header: 'Asistencia',
    accessor: 'attendance',
    Cell: ({ value, cell }) => {
      const [attendace, setAttendance] = useState(value);
      const handleAttendance = async (attendance: ScholarAttendance) => {
        if (cell.row.original.kindOfActivity === 'workshop') {
          await changeScholarAttendance(cell.row.original.attendanceId, attendance);
        } else if (cell.row.original.kindOfActivity === 'chat') {
          await changeScholarAttendanceChat(cell.row.original.attendanceId, attendance);
        }
        await revalidateSpecificPath('becario/chats/[chatId]');
        return setAttendance(attendance);
      };
      if (attendace === 'CANCELLED') {
        return <Chip color="danger">Canceló</Chip>;
      } else {
        return (
          <select
            className={`border-0 cursor-pointer rounded-full font-medium w-24 text-xs  p-0 outline-transparent ${
              attendace === 'ATTENDED'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : attendace === 'NOT_ATTENDED'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  : attendace === 'ENROLLED'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    : ''
            }`}
            value={attendace}
            onChange={async (event) => {
              const attendance = event.target.value as ScholarAttendance;
              toast.promise(handleAttendance(attendance), {
                pending: 'Colocando asistencia...',
                success: 'Asistencia colocada exitosamente',
                error: 'Error al colocar asistencia',
              });
            }}
          >
            <option value="ATTENDED">Asistió</option>
            <option value="NOT_ATTENDED">No asistió</option>
            <option value="ENROLLED">Inscrito</option>
            <option value="JUSTIFY">Justificó</option>
          </select>
        );
      }
    },
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
    Header: 'Whatsapp',
    accessor: 'whatsAppNumber',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
];

export default ScholarActivityAttendance;
