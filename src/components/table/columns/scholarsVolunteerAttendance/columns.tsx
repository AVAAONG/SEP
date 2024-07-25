'use client';
import { asignVolunteerHours, changeScholarVolunteerAttendance } from '@/lib/db/utils/volunteer';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { Chip, Input } from '@nextui-org/react';
import { ScholarAttendance } from '@prisma/client';
import { useState } from 'react';
import { Cell, CellValue, Column } from 'react-table';
import { toast } from 'react-toastify';
import ScholarColumnWidget from '../scholars/commons/ScholarWidget';

// NoPriv = No Privilege (This show data without allow scholars to pass attendance)

export interface IScholarVolunteerAtendance {
  id: string;
  names: string;
  photo: string | null;
  email: string | null;
  asignedHours: number | undefined;
  whatsAppNumber: string | null;
  attendance?: ScholarAttendance;
  attendanceId: string
}

const ScholarVolunteerAttendance: Column<IScholarVolunteerAtendance>[] = [
  {
    Header: '#',
    accessor: 'id',
    Cell: ({ cell }) => {
      return <span className="block font-semibold w-8">{cell.row.index + 1}</span>;
    },
  },
  {
    Header: 'Nombre',
    accessor: 'names',
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<IScholarVolunteerAtendance> }) => {
      return (
        <ScholarColumnWidget
          scholarId={cell.row.original.id}
          scholarName={value}
          scholarPhoto={cell.row.original.photo}
        />
      );
    },
  },
  {
    Header: 'Horas asignadas',
    accessor: 'asignedHours',
    Cell: ({ value, cell }) => {
      const [asignedHous, setAsignedHours] = useState(value);
      const handle = async (hours: number) => {
        await asignVolunteerHours(cell.row.original.attendanceId, hours);
      };
      return (
        <div className="w-24 m-auto">
          <Input
            type="number"
            radius="sm"
            classNames={{
              input: '!appearance-none',
            }}
            className="w-24"
            value={asignedHous?.toString()}
            onValueChange={async (value) => {
              setAsignedHours(Number(value));
              await handle(Number(value));
            }}
          />
        </div>
      );
    },
  },
  {
    Header: 'Asistencia',
    accessor: 'attendance',
    Cell: ({ value, cell }) => {
      const [attendace, setAttendance] = useState(value);
      const handleAttendance = async (attendance: ScholarAttendance) => {
        await changeScholarVolunteerAttendance(cell.row.original.attendanceId, attendance);
        await revalidateSpecificPath('/admin/voluntariado/[volunteerId]');
        return setAttendance(attendance);
      };
      if (attendace === 'CANCELLED') {
        return <Chip color="danger">Canceló</Chip>;
      } else {
        return (
          <select
            className={`border-0 cursor-pointer rounded-full font-medium w-24 text-xs  p-0 outline-transparent ${attendace === 'ATTENDED'
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
    Header: 'Numero de WhatsApp',
    accessor: 'whatsAppNumber',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
];

export default ScholarVolunteerAttendance;
