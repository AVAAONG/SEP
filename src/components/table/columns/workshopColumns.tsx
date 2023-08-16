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
        <div className="flex items-center">
          <div className="flex w-8">
            <Image
              className="w-8 h-8 rounded-full hover:z-50"
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
    }
  },
  {
    Header: 'Competencia',
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
    Header: 'Año',
    accessor: 'year',
  },
  {
    Header: 'Asistencia',
    accesor: 'attendance',
    Cell: ({ cell }) => {
      if (cell.row.original.scholarAttendance == "No asistio") {
        return (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            {/* <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span> */}
            No asistio
          </span>
        )
      }
      else if (cell.row.original.scholarAttendance == "a") {
        return (
          <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
            En espera
          </span>
        )
      }
      else {
        return (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
            {/* <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span> */}
            Asistio
          </span>
        )
      }

    }
  }
];

export default WorkshopColumns;
