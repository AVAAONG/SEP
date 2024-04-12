'use client';
import DisplayDate from '@/components/DisplayDate';
import ScholarAttendanceWidget from '@/components/ScholarAttendanceWidget';
import VolunteerStatusWidgetSpanish, {
  VolunteerStatusSpanish,
} from '@/components/charts/common/widgets/VolunteerStatusWidgetSpanish';
import { ScholarAttendance } from '@prisma/client';
import Link from 'next/link';
import { CellProps, Column } from 'react-table';

export interface IscholarVolunteerAttendanceColumns {
  id: string;
  title: string;
  kindOfVolunteer: string;
  startDate: string;
  endDate: string;
  status: VolunteerStatusSpanish;
  attendance: ScholarAttendance;
  modality: string;
  asignedHours: number;
  platform: string;
  volunteerProject: string | null | undefined;
}

const scholarVolunteerAttendanceColumns: Column<IscholarVolunteerAttendanceColumns>[] = [
  {
    Header: '#',
    Cell: ({ cell }: CellProps<IscholarVolunteerAttendanceColumns>) => {
      return <span>{cell.row.index + 1}</span>;
    },
    disableSortBy: true,
  },
  {
    Header: 'Actividad de voluntariado ',
    accessor: 'title',
    Cell: ({ value, cell }) => {
      return (
        <Link href={cell.row.original.id ? `voluntariado/${cell.row.original.id}` : ''}>
          <div className="block w-72 overflow-x-scroll">{value}</div>
        </Link>
      );
    },
  },
  {
    Header: 'Tipo de voluntariado',
    accessor: 'kindOfVolunteer',
  },
  {
    Header: 'Proyecto',
    accessor: 'volunteerProject',
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
    Cell: ({ value }) => <VolunteerStatusWidgetSpanish value={value} />,
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
    accessor: 'asignedHours',
  },
  {
    Header: 'Plataforma/Lugar',
    accessor: 'platform',
    disableSortBy: true,
  },
];

export default scholarVolunteerAttendanceColumns;
