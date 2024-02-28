'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { IScholarForAttendanceTable } from '@/app/admin/chats/[chatId]/page';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import { ScholarAttendance } from '@prisma/client';
import Image from 'next/image';
import { Cell, CellValue, Column } from 'react-table';

const ScholarActivityAttendanceForScholarTemp: Column<IScholarForAttendanceTable>[] = [
  {
    Header: '#',
    accessor: 'id',
    Cell: ({ cell }) => {
      return <span className="block font-semibold w-8">{cell.row.index + 1}</span>;
    },
  },
  {
    Header: 'Nombre',
    accessor: (row: IScholarForAttendanceTable) => `${row.first_names} ${row.last_names}`,
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<IScholarForAttendanceTable> }) => {
      const id = cell.row.original.id;
      const career = '';
      return (
        <div className="flex items-center w-fit">
          <div className="flex-shrink-0 w-8 h-8">
            <Image
              className="w-full h-full rounded-full"
              src={defailProfilePic}
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
    Header: 'Numero de WhatsApp',
    accessor: 'whatsAppNumber',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
  {
    Header: 'Asistencia',
    accessor: 'attendance',
    Cell: ({ value }) => {
      return <ScholarAttendanceWidget value={value as ScholarAttendance} />;
    },
  },
];

export default ScholarActivityAttendanceForScholarTemp;
