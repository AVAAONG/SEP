'use client';
import DisplayTime from '@/components/DisplayTime';
import SpeakersColumnWidget from '@/components/SpeakerColumnWidget';
import { Level, Prisma } from '@prisma/client';
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

type ChatDataForTable = {
  id: string;
  title: string;
  speakerId: string;
  speakerName: string;
  speakerCompany: string | null;
  speakerImage: string | null;
  date: string;
  startHour: string;
  status: string;
  modality: any;
  platform: string;
  level: Level;
  scholarsEnrroled: number;
  attendedScholars: number;
};

const ChatColumns: Column<ChatDataForTable>[] = [
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
    accessor: 'speakerNames',
    Cell: ({ cell, value }) => {
      console.log(cell.row.original);
      return (
        <SpeakersColumnWidget
          speakerNames={cell.row.original.speakerNames}
          speakerIds={cell.row.original.speakerIds}
          speakersCompany={cell.row.original.speakerCompany}
          speakerImages={cell.row.original.speakerImages}
        />
      );
    },
    disableSortBy: true,
  },
  {
    Header: 'Fecha',
    accessor: 'date',
  },
  {
    Header: 'Inicio',
    accessor: 'startHour',
    Cell: ({ value }) => {
      return <DisplayTime time={value} />;
    },
  },
  {
    accessor: 'status',
    Header: 'Estatus',
    Cell: ({ value }) => {
      if (value === 'Suspendido') {
        return (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            {value}
          </span>
        );
      } else if (value === 'Asistencia no pasada') {
        return (
          <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            {value}
          </span>
        );
      } else if (value === 'Realizado') {
        return (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
            {value}
          </span>
        );
      } else if (value === 'Programado' || value === 'Enviado') {
        return (
          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
            Programado
          </span>
        );
      } else if (value === 'En progreso')
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
  },
  {
    Header: 'Plataforma/Lugar',
    accessor: 'platform',
  },
  {
    Header: 'Inscritos',
    id: 'inscritos',
    accessor: 'scholarsEnrroled',
  },
  {
    Header: 'Asistentes',
    accessor: 'attendedScholars',
  },
];

export default ChatColumns;
