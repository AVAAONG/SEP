'use client';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import { Avatar } from "@heroui/react";
import { ScholarAttendance } from '@prisma/client';
import { Cell, CellValue, Column } from 'react-table';

// NoPriv = No Privilege (This show data without allow scholars to pass attendance)

export interface IScholarAttendanceInfoNoPriv {
  id: string;
  name: string;
  photo: string | null;
  email: string | null;
  whatsAppNumber: string | null;
  attendance?: ScholarAttendance;
}

const ScholarAttendanceInfoNoPriv: Column<IScholarAttendanceInfoNoPriv>[] = [
  {
    Header: '#',
    accessor: 'id',
    Cell: ({ cell }) => {
      return <span className="block font-semibold w-8">{cell.row.index + 1}</span>;
    },
  },
  {
    Header: 'Nombre',
    accessor: 'name',
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<IScholarAttendanceInfoNoPriv> }) => {
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
    Header: 'Asistencia',
    accessor: 'attendance',
    Cell: ({ value }) => {
      return <ScholarAttendanceWidget value={value as ScholarAttendance} />;
    },
  },
  {
    Header: 'Número de WhatsApp',
    accessor: 'whatsAppNumber',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
];

export default ScholarAttendanceInfoNoPriv;
