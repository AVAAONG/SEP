"use client"
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { Workshop, WorkshopSpeaker, WorkshopTempData } from '@prisma/client';
import Image from 'next/image';
import { TableOptions } from 'react-table';

interface WorkshopTableProps {
  workshopData: (Workshop & {
    speaker: WorkshopSpeaker[];
    tempData: WorkshopTempData | null;
  })[];
}
const WorkshopColumns: TableOptions<WorkshopTableProps> = [
  {
    Header: 'Taller',
    accessor: 'title',
  },
  {
    Header: 'Facilitador',
    accessor: 'first_names',
    Cell: ({ cell }) => {
      return (
        <div className="flex items-center w-full">
          <div className="flex-shrink-0 w-8 h-8">
            <Image
              className="w-full h-full rounded-full"
              src={defailProfilePic}
              alt="Foto de perfil"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm text-gray-900 dark:text-slate-100">
              {cell.row.original.first_names} {' '}
              {cell.row.original.last_names}
            </div>
          </div>
        </div>

      )
    },
  },
  {
    id: 'date',
    Header: 'Fecha',
    accessor: 'dates[0].start_date',
    Cell: ({ value }: { value: string }) => {
      return new Date(value).toLocaleString('es-ES', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
    },
  },
  {
    id: 'startHour',
    Header: 'Inicio',
    accessor: 'dates[0].start_date',
    Cell: ({ value }: { value: string }) => {
      return new Date(value).toLocaleString('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
      });
    },
  },
  {
    id: 'endHour',
    Header: 'Cierre',
    accessor: 'dates[0].end_date',
    Cell: ({ value }: { value: string }) => {
      return new Date(value).toLocaleString('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
      });
    },
  },
  {
    Header: 'Pensum',
    accessor: 'pensum',
    Cell: ({ value }: { value: string }) => {
      return value.toLowerCase().replaceAll('_', ' ');
    },
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    Cell: ({ value }: { value: string }) => {
      return value.toLowerCase();
    },
  },
  {
    Header: 'Plataforma/Lugar',
    accessor: 'platform',
  },
  {
    Header: 'Cupos',
    accessor: 'spots',
  },
  {
    Header: 'Año',
    accessor: 'year',
  },
];

export default WorkshopColumns;