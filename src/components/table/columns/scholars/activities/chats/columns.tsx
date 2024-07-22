'use client';
import DisplayDate from '@/components/DisplayDate';
import DisplayTime from '@/components/DisplayTime';
import SpeakersColumnWidget from '@/components/SpeakerColumnWidget';
import ActivityStatusWidgetSpanish, {
  ActivityStatusSpanish,
} from '@/components/charts/common/widgets/ActivityStatusWidgetSpanish';
import { KindOfSpeaker } from '@prisma/client';
import Link from 'next/link';
import { Column } from 'react-table';

export type IAdminChatColumns = {
  id: string;
  title: string;
  date: string;
  startHour: string;
  level: 'Avanzado' | 'Básico' | 'Intermedio';
  enrrolledScholars: number;
  speakerNames: string[];
  speakerImages: (string | undefined)[];
  speakerIds: string[];
  speakerKind: (KindOfSpeaker | null)[];
  speakerCompany: (string | null)[];
  status: ActivityStatusSpanish;
  modality: string; // Assuming parseModalityFromDatabase returns a string
  platform: string;
  attendedScholars: number;
  spots: number;
};

const AdminChatColumns: Column<IAdminChatColumns>[] = [
  {
    Header: 'Chat',
    accessor: 'title',
    Cell: ({ value, cell }) => {
      return (
        <Link href={cell.row.original.id ? `chats/${cell.row.original.id}` : ''}>
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
    accessor: 'status',
    Header: 'Estatus',
    Cell: ({ value }) => <ActivityStatusWidgetSpanish value={value} />,
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
    accessor: 'enrrolledScholars',
  },
  {
    Header: 'Asistentes',
    accessor: 'attendedScholars',
  },
  {
    Header: 'Cupos',
    accessor: 'spots',
  },
];

export default AdminChatColumns;
