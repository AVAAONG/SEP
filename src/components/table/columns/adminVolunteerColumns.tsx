'use client';
import DisplayDate from '@/components/DisplayDate';
import { changeScholarVolunteerStatus } from '@/lib/db/utils/volunteer';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@nextui-org/react';
import { VolunteerStatus } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import { Column } from 'react-table';
import { toast } from 'react-toastify';
let timeout: NodeJS.Timeout;
const debaunceTest = () => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    await revalidateSpecificPath('admin/voluntariado/externo');
  }, 1000);
};

interface VolunteerTableDetails {
  scholarNames: string;
  id: string;
  title: string;
  endDate: string;
  startDate: string;
  status: VolunteerStatus;
  modality: string;
  platform: string;
  kindOfVolunteer: string;
  asignedHours: number;
  proof: string | null;
}

const ExternalVolunteerAdminColumns: Column<VolunteerTableDetails>[] = [
  {
    Header: 'Actividad ',
    accessor: 'title',
    Cell: ({ value, cell }) => {
      return (
        // <Link href={cell.row.original.id ? `actividadesFormativas/${cell.row.original.id}` : ''}>
        <div className="block w-72 overflow-x-scroll">{value}</div>
        // </Link>
      );
    },
  },
  {
    Header: 'Becario',
    accessor: 'scholarNames',
  },
  {
    Header: 'Fecha de inicio',
    accessor: 'startDate',
    Cell: ({ value }) => {
      return <DisplayDate date={value} kind="short" />;
    },
  },
  {
    Header: 'Fecha de cierre',
    accessor: 'endDate',
    Cell: ({ value }) => {
      return <DisplayDate date={value} kind="short" />;
    },
  },
  {
    Header: 'Estatus',
    accessor: 'status',
    Cell: ({ value, cell }) => {
      const [attendace, setAttendance] = useState(value);
      const handleStatusChange = async (status: VolunteerStatus) => {
        await changeScholarVolunteerStatus(cell.row.original.id, status);
        setAttendance(status);
        await debaunceTest();
      };
      return (
        <select
          className={`border-0 cursor-pointer rounded-full font-medium w-24 text-xs  p-0 outline-transparent ${
            attendace === 'APPROVED'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : attendace === 'REJECTED'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                : attendace === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  : ''
          }`}
          value={attendace}
          onChange={async (event) => {
            const attendance = event.target.value as VolunteerStatus;
            toast.promise(handleStatusChange(attendance), {
              pending: 'Colocando asistencia...',
              success: 'Asistencia colocada exitosamente',
              error: 'Error al colocar asistencia',
            });
          }}
        >
          <option value="APPROVED">Aprovado</option>
          <option value="REJECTED">No aprovado</option>
          <option value="PENDING">Pendiente por aprobar</option>
        </select>
      );
    },
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    disableSortBy: true,
  },
  {
    Header: 'Horas asignadas',
    accessor: 'asignedHours',
  },
  {
    Header: 'Plataforma/Lugar',
    accessor: 'platform',
    disableSortBy: true,
    Cell: ({ value }) => {
      return (
        <Tooltip
          content={value}
          classNames={{
            content: 'bg-light dark:bg-dark text-dark dark:text-light',
          }}
        >
          <div className="block w-72 overflow-x-scroll">{value}</div>
        </Tooltip>
      );
    },
  },
  {
    Header: 'Constancia',
    accessor: 'proof',
    disableSortBy: true,
    Cell: ({ value }) => {
      return (
        <div className="m-auto w-6 ">
          <Link
            target="_blank"
            href={value ? value : ''}
            className="w-6 text-primary-light dark:text-primary-light"
          >
            <DocumentTextIcon className="w-6 h-6" />
          </Link>
        </div>
      );
    },
  },
];

export default ExternalVolunteerAdminColumns;
