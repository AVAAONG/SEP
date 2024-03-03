'use client';
import DisplayDate from '@/components/DisplayDate';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import VolunteerStatusWidget from '@/components/VolunteerStatus';
import { ScholarAttendance, VolunteerStatus } from '@prisma/client';
import { Column } from 'react-table';

interface VolunteerTableDetails {
  id: string;
  title: string;
  endDate: string;
  startDate: string;
  status: VolunteerStatus;
  modality: string;
  platform: string;
  kindOfVolunteer: string;
  attendedHours: number;
  attendance: ScholarAttendance;
}

const VolunteerColumns: Column<VolunteerTableDetails>[] = [
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
    Header: 'Tipo de voluntariado',
    accessor: 'kindOfVolunteer',
  },
  {
    Header: 'Fecha de inicio',
    accessor: 'startDate',
    Cell: ({ value }) => {
      return <DisplayDate date={value} />;
    },
  },
  {
    Header: 'Fecha de cierre',
    accessor: 'endDate',
    Cell: ({ value }) => {
      return <DisplayDate date={value} />;
    },
  },
  {
    Header: 'Estatus',
    accessor: 'status',
    Cell: ({ value }) => <VolunteerStatusWidget value={value} />,
  },
  {
    Header: 'Asistencia',
    accessor: 'attendance',
    Cell: ({ value }) => <ScholarAttendanceWidget value={value} />,
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    disableSortBy: true,
  },
  {
    Header: 'Horas asignadas',
    accessor: 'attendedHours',
  },
  {
    Header: 'Plataforma/Lugar',
    accessor: 'platform',
    disableSortBy: true,
  },
];

export default VolunteerColumns;
