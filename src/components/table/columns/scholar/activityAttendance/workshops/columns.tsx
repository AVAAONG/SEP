'use client';
import DisplayDate from '@/components/DisplayDate';
import DisplayTime from '@/components/DisplayTime';
import SpeakersColumnWidget from '@/components/SpeakerColumnWidget';
import ActivityStatusWidgetSpanish from '@/components/charts/common/widgets/ActivityStatusWidgetSpanish';
import ScholarAttendanceWidgetSpanish, {
  ScholarAttendanceSpanish,
} from '@/components/charts/common/widgets/ScholarAttendanceWidgetSpanish';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { KindOfSpeaker } from '@prisma/client';
import Link from 'next/link';
import { CellProps, Column } from 'react-table';

export interface IScholarWorkshopAttendanceColumns {
  id: string;
  title: string;
  speakerNames: string[];
  speakerIds: string[];
  speakerCompany: (string | null)[];
  speakerImages: (string | undefined)[];
  speakerKind: (KindOfSpeaker | null)[];
  date: string;
  startHour: string;
  activityStatus: 'Realizado' | 'Programado' | 'Enviado' | 'Suspendido';
  attendance: ScholarAttendanceSpanish;
  modality: string;
  platform: string;
  skill: string;
  year: string;
  satisfactionFormFilled: boolean | null;
}

const scholarWorkshopAttendanceColumns: Column<IScholarWorkshopAttendanceColumns>[] = [
  {
    Header: '#',
    Cell: ({ cell }: CellProps<IScholarWorkshopAttendanceColumns>) => {
      return <span>{cell.row.index + 1}</span>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Actividad formativa',
    accessor: 'title',
    Cell: ({ value, cell }) => (
      <Link href={cell.row.original.id ? `actividadesFormativas/${cell.row.original.id}` : ''}>
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
    accessor: 'date',
    Cell: ({ value }) => {
      return <DisplayDate date={value} kind="short" />;
    },
  },
  {
    Header: 'Inicio',
    accessor: 'startHour',
    Cell: ({ value }) => <DisplayTime time={value} />,
    disableSortBy: true,
  },
  {
    Header: 'Estatus',
    accessor: 'activityStatus',
    Cell: ({ value }) => <ActivityStatusWidgetSpanish value={value} />,
    disableSortBy: true,
    filter: 'equals',
  },
  {
    Header: 'Asistencia',
    accessor: 'attendance',
    Cell: ({ value }) => <ScholarAttendanceWidgetSpanish value={value} />,
    disableSortBy: true,
    filter: 'equals',
  },
  {
    Header: 'Competencia',
    accessor: 'skill',
    disableSortBy: true,
    filter: 'equals',
  },
  {
    Header: 'Año',
    accessor: 'year',
    disableSortBy: true,
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    disableSortBy: true,
    filter: 'equals',
  },
  {
    Header: 'Plataforma',
    accessor: 'platform',
    Cell: ({ value }) => {
      return <div className="block overflow-x-scroll w-28">{value}</div>;
    },
    disableSortBy: true,
  },
  {
    Header: '¿Encuesta llena?',
    accessor: 'satisfactionFormFilled',
    Cell: ({ value }) => {
      if (value) return <CheckCircleIcon className="h-5 w-5 text-primary-light" />;
      else return <XMarkIcon className="h-5 w-5 text-red-500" />;
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

export default scholarWorkshopAttendanceColumns;
