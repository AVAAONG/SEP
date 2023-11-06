'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { parseModalityFromDatabase, parseWorkshopStatusFromDatabase } from '@/lib/utils2';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Column } from 'react-table';

const ChatsWithAllData = Prisma.validator<Prisma.ChatDefaultArgs>()({
  include: {
    speaker: true,
    temp_data: true,
    scholar_attendance: true,
  },
});
export type ChatsWithAllData = Prisma.ChatGetPayload<typeof ChatsWithAllData>;

const ChatColumns: Column<ChatsWithAllData>[] = [
  {
    Header: 'Chat',
    accessor: 'title',
    Cell: ({ value, cell }) => {
      return (
        <Link href={cell.row.original.id ? `/admin/chats/${cell.row.original.id}` : ''}>
          <div className="block w-80 overflow-x-scroll">{value}</div>
        </Link>
      );
    },
  },
  {
    Header: 'Facilitador',
    accessor: 'speaker',
    Cell: ({ cell, value }) => {
      return (
        <Link
          href={cell.row.original.id ? `actividadesFormativas/${cell.row.original.id}` : ''}
          className="flex items-center"
        >
          <div className="flex-shrink-0 w-8 h-8">
            <Image
              className="w-full h-full rounded-full"
              src={value[0].image ? value[0].image : defailProfilePic}
              alt="Foto de perfil"
            />
          </div>
          <div className="ml-4 text-start">
            <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
              {value[0].first_names} {value[0].last_names}
            </span>
            <div className="w-32 overflow-x-scroll text-xs font-medium text-gray-400 dark:text-slate-400">
              {value[0].job_company}
            </div>
          </div>
        </Link>
      );
    },
  },
  {
    id: 'date',
    Header: 'Fecha',
    accessor: 'start_dates',
    Cell: ({ value }) => {
      const date = new Date(value[0]).toLocaleString('es-ES', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      return <time suppressHydrationWarning>{date}</time>;
    },
  },
  {
    id: 'startHour',
    Header: 'Inicio',
    accessor: 'start_dates',
    Cell: ({ value }) => {
      const date = new Date(value[0]).toLocaleTimeString('es-VE', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
      });
      return <div suppressHydrationWarning>{date.toUpperCase()}</div>;
    },
  },
  {
    accessor: 'activity_status',
    Header: 'Estatus',
    Cell: ({ value }) => {
      const workshopStatus = parseWorkshopStatusFromDatabase(value);
      if (value === 'SUSPENDED') {
        return (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            {workshopStatus}
          </span>
        );
      } else if (value === 'DONE') {
        return (
          <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            {workshopStatus}
          </span>
        );
      } else if (value === 'ATTENDANCE_CHECKED') {
        return (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
            {workshopStatus}
          </span>
        );
      } else if (value === 'SCHEDULED' || value === 'SENT') {
        return (
          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
            Programado
          </span>
        );
      } else if (value === 'IN_PROGRESS')
        return (
          <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
            Error
          </span>
        );
      else {
        return (
          <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
            Error
          </span>
        );
      }
    },
  },
  {
    Header: 'Nivel',
    accessor: 'level',
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    Cell: ({ value }) => {
      const modality = parseModalityFromDatabase(value);
      return <span>{modality}</span>;
    },
  },
  {
    Header: 'Plataforma/Lugar',
    accessor: 'platform',
  },
  {
    Header: 'Inscritos',
    id: 'inscritos',
    accessor: 'scholar_attendance',
    Cell: ({ value }) => {
      const attendance = value.filter((a) => a.attendance === 'ENROLLED' || 'ATTENDED');

      return <span>{attendance.length}</span>;
    },
  },
  {
    Header: 'Asistentes',
    id: 'asistentes',
    accessor: 'scholar_attendance',
    Cell: ({ value }) => {
      const attendance = value.filter((a) => a.attendance === 'ATTENDED');

      return <span>{attendance.length}</span>;
    },
  },
];

export default ChatColumns;
