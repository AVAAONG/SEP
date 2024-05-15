'use client';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import { asignVolunteerHours } from '@/lib/db/utils/volunteer';
import { Avatar, Input } from '@nextui-org/react';
import { ScholarAttendance } from '@prisma/client';
import { useState } from 'react';
import { Cell, CellValue, Column } from 'react-table';

// NoPriv = No Privilege (This show data without allow scholars to pass attendance)

export interface IScholarVolunteerAtendance {
  id: string;
  first_names: string;
  last_names: string;
  photo: string | null;
  email: string | null;
  asignedHours: number;
  whatsAppNumber: string | null;
  attendance?: ScholarAttendance;
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
    accessor: (row: IScholarVolunteerAtendance) => `${row.first_names} ${row.last_names}`,
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<IScholarVolunteerAtendance> }) => {
      return (
        <div className="flex items-center w-fit">
          <div className="flex-shrink-0 w-8 h-8">
            <Avatar
              className="w-full h-full rounded-full"
              src={cell.row.original.photo || undefined}
              alt="Foto de perfil"
            />
          </div>
          <p className="block ml-4 text-start w-64 text-sm font-medium text-gray-900 dark:text-slate-100 ">
            {value}
          </p>
        </div>
      );
    },
  },
  {
    Header: 'Horas asignadas',
    accessor: 'asignedHours',
    Cell: ({ value, cell }) => {
      const [asignedHous, setAsignedHours] = useState(value);
      const handle = async (hours: number) => {
        await asignVolunteerHours(cell.row.original.id, hours);
      };
      return (
        <div>
          <Input
            type="number"
            radius="sm"
            className="w-24"
            value={asignedHous.toString()}
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
    Cell: ({ value }) => {
      return <ScholarAttendanceWidget value={value as ScholarAttendance} />;
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
