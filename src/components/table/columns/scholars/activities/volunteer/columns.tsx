'use client';
import DisplayDate from '@/components/DisplayDate';
import VolunteerStatusWidgetSpanish, {
  VolunteerStatusSpanish,
} from '@/components/charts/common/widgets/VolunteerStatusWidgetSpanish';
import { Tooltip } from '@nextui-org/tooltip';
import Link from 'next/link';
import { CellProps, Column } from 'react-table';

export interface IAdminVolunteerActivityColumns {
  id: string;
  title: string;
  kindOfVolunteer: string;
  startDate: string;
  endDate: string;
  status: VolunteerStatusSpanish;
  modality: string;
  hours: number;
  platform: string;
  volunteerProject: string | null | undefined;
}

const AdminVolunteerActivityColumns: Column<IAdminVolunteerActivityColumns>[] = [
  {
    Header: '#',
    Cell: ({ cell }: CellProps<IAdminVolunteerActivityColumns>) => {
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
    Header: 'Modalidad',
    accessor: 'modality',
    disableSortBy: true,
  },
  {
    Header: 'Horas hombre',
    accessor: 'hours',
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
];

export default AdminVolunteerActivityColumns;
