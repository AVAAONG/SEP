'use client';
import { IScholarChatColumns } from '@/app/becario/chats/page';
import DisplayDate from '@/components/DisplayDate';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import SpeakersColumnWidget from '@/components/SpeakerColumnWidget';
import { ScholarAttendance } from '@prisma/client';
import Link from 'next/link';
import { CellProps, Column } from 'react-table';
import ActivityStatusIndicator from '../ActivityStatus';

const scholarChatAttendaceColumns: Column<IScholarChatColumns>[] = [
  {
    Header: '#',
    Cell: ({ cell }: CellProps<IScholarChatColumns>) => {
      return <span>{cell.row.index + 1}</span>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Chat Club',
    accessor: 'title',
    Cell: ({ value, cell }) => (
      <Link href={cell.row.original.id ? `chats/${cell.row.original.id}` : ''}>
        <div className="block w-80 text-center overflow-x-scroll">{value}</div>
      </Link>
    ),
  },

  {
    Header: 'Facilitador',
    accessor: 'speakerNames',
    Cell: ({ cell, value }) => {
      return (
        <SpeakersColumnWidget
          speakerNames={value}
          speakerIds={cell.row.original.speakerIds}
          speakersCompany={cell.row.original.speakerCompany}
          speakerImages={cell.row.original.speakerImages}
          speakerKind={cell.row.original.speakerKind}
        />
      );
    },
    disableSortBy: true,
  },
  {
    Header: 'Fecha',
    accessor: 'start_dates',
    Cell: ({ value }) => {
      return <DisplayDate date={value[0].toISOString()} kind="short" />;
    },
  },
  {
    id: 'startHour',
    Header: 'Inicio',
    accessor: 'start_dates',
    Cell: ({ value }) => {
      const date = new Date(value[0]).toLocaleTimeString('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
      });
      return <div suppressHydrationWarning>{date.toUpperCase()}</div>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Estatus',
    accessor: 'activity_status',
    Cell: ({ value }) => <ActivityStatusIndicator status={value} />,
    disableSortBy: true,
  },
  {
    Header: 'Asistencia',
    accessor: 'attendance',
    Cell: ({ value }) => <ScholarAttendanceWidget value={value as ScholarAttendance} />,
    disableSortBy: true,
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    disableSortBy: true,
  },
  {
    Header: 'Plataforma',
    accessor: 'platform',
    Cell: ({ value }) => {
      return <div className='block overflow-x-scroll w-28'>{value}</div>;
    },
    disableSortBy: true,
  },
  // {
  //   Header: 'Satisfacción',
  //   accessor: 'rating',
  //   Cell: ({ cell }: { cell: any }) => (
  //     <div className="flex gap-1 w-full h-6 text-green-600">
  //       {Array.from({ length: cell.value }).map((_, index) => (
  //         <Star key={index} />
  //       ))}
  //     </div>
  //   ),
  // },
];

export default scholarChatAttendaceColumns;
