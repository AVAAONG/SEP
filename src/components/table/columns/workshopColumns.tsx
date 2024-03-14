'use client';
import DisplayDate from '@/components/DisplayDate';
import DisplayTime from '@/components/DisplayTime';
import SpeakersColumnWidget from '@/components/SpeakerColumnWidget';
import { ActivityStatus, Modality, Prisma, Skill, WorkshopYear } from '@prisma/client';
import Link from 'next/link';
import { Column } from 'react-table';
import ActivityStatusIndicator from '../ActivityStatus';

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
  speakerIds: string;
  speakerNames: string;
  speakerCompany: string;
  speakerKind: string;
  speakerImages: string;
  date: Date;
  startHour: Date;
  endHour: Date;
  status: ActivityStatus;
  skill: Skill;
  modality: Modality;
  platform: string;
  year: WorkshopYear;
  enrrolledScholars: number;
  attendedScholars: number;
}

const WorkshopColumns: Column<WorkshopDetails>[] = [
  {
    Header: 'Taller',
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
    accessor: 'status',
    Header: 'Estatus',
    Cell: ({ value }) => <ActivityStatusIndicator status={value} />,
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

export default WorkshopColumns;
