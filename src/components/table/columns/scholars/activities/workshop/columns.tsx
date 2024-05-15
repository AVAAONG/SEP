'use client';
import DisplayDate from '@/components/DisplayDate';
import DisplayTime from '@/components/DisplayTime';
import SpeakersColumnWidget from '@/components/SpeakerColumnWidget';
import ActivityStatusIndicator from '@/components/table/ActivityStatus';
import { ActivityStatus, KindOfSpeaker, Prisma } from '@prisma/client';
import Link from 'next/link';
import { Column } from 'react-table';

const workshopWithAllData = Prisma.validator<Prisma.WorkshopDefaultArgs>()({
  include: {
    speaker: true,
    scholar_attendance: true,
  },
});
export type WorkshopWithAllData = Prisma.WorkshopGetPayload<typeof workshopWithAllData>;

interface WorkshopDetails {
  id: string;
  title: string;
  speakerNames: string[];
  speakerImages: (string | undefined)[];
  speakerIds: string[];
  speakerKind: (KindOfSpeaker | null)[];
  speakerCompany: (string | null)[];
  date: string;
  parsedStatus: string;
  startHour: string;
  endHour: string;
  status: ActivityStatus;
  skill: string; // Assuming parseSkillFromDatabase returns a string
  modality: string; // Assuming parseModalityFromDatabase returns a string
  platform: string;
  year: string;
  attendedScholars: number;
  enrrolledScholars: number;
}

const WorkshopAdminColumns: Column<WorkshopDetails>[] = [
  {
    Header: 'Actividad',
    accessor: 'title',
    Cell: ({ value, cell }) => {
      return (
        <Link href={cell.row.original.id ? `actividadesFormativas/${cell.row.original.id}` : ''}>
          <div className="block w-80 overflow-x-scroll">{value}</div>
        </Link>
      );
    },
  },
  {
    Header: 'Facilitador',
    accessor: 'speakerNames',
    Cell: ({ cell }) => {
      return (
        <SpeakersColumnWidget
          speakerNames={cell.row.original.speakerNames}
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
    Cell: ({ value }) => {
      return <DisplayTime time={value} />;
    },
  },
  {
    Header: 'Cierre',
    accessor: 'endHour',
    Cell: ({ value }) => {
      return <DisplayTime time={value} />;
    },
  },
  {
    accessor: 'parsedStatus',
    Header: 'Estatus',
    Cell: ({ cell }) => <ActivityStatusIndicator status={cell.row.original.status} />,
    disableSortBy: true,
  },
  {
    Header: 'Competencia',
    accessor: 'skill',
    disableSortBy: true,
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    disableSortBy: true,
  },
  {
    Header: 'Plataforma/Lugar',
    accessor: 'platform',
    disableSortBy: true,
  },
  {
    Header: 'Año',
    accessor: 'year',
    disableSortBy: true,
  },
  {
    Header: 'Inscritos',
    accessor: 'enrrolledScholars',
  },
  {
    Header: 'Asistentes',
    accessor: 'attendedScholars',
  },
];

export default WorkshopAdminColumns;
