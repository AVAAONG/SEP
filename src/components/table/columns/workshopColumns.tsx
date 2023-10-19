'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import {
  parseModalityFromDatabase,
  parseSkillFromDatabase,
  parseWorkshopStatusFromDatabase,
} from '@/lib/utils2';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { Column } from 'react-table';

const workshopWithAllData = Prisma.validator<Prisma.WorkshopDefaultArgs>()({
  include: {
    speaker: true,
    temp_data: true,
    scholar_attendance: true,
  },
});
type WorkshopWithAllData = Prisma.WorkshopGetPayload<typeof workshopWithAllData>;

const WorkshopColumns: Column<WorkshopWithAllData>[] = [
  {
    Header: 'Taller',
    accessor: 'title',
  },
  {
    Header: 'Facilitador',
    accessor: 'speaker',
    Cell: ({ value }) => {
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
              {value[0].first_names} {value[0].last_names}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: 'date',
    Header: 'Fecha',
    accessor: 'start_dates',
    Cell: ({ value }) => {
      const date = new Date(value[0]).toLocaleString('es-ES', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      return <span>{date}</span>;
    },
  },
  {
    id: 'startHour',
    Header: 'Inicio',
    accessor: 'end_dates',
    Cell: ({ value }) => {
      const date = new Date(value[0]).toLocaleString('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
      });
      return <span>{date}</span>;
    },
  },
  {
    accessor: 'activity_status',
    Header: 'Estatus',
    Cell: ({ value }) => {
      const workshopStatus = parseWorkshopStatusFromDatabase(value);
      if (value === 'SUSPENDED') {
        return (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            {workshopStatus}
          </span>
        );
      } else if (value === 'DONE') {
        return (
          <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            {workshopStatus}
          </span>
        );
      } else if (value === 'ATTENDANCE_CHECKED') {
        return (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
            {workshopStatus}
          </span>
        );
      } else if (value === 'SCHEDULED' || value === 'SENT') {
        return (
          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
            Programado
          </span>
        );
      } else if (value === 'IN_PROGRESS')
        return (
          <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
            Error
          </span>
        );
      else {
        return (
          <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
            Error
          </span>
        );
      }
    },
  },
  {
    Header: 'Competencia',
    accessor: 'asociated_skill',
    Cell: ({ value }) => {
      const skill = parseSkillFromDatabase(value);
      return <span>{skill}</span>;
    },
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
    Cell: ({ value }) => {
      const modality = parseModalityFromDatabase(value);
      return <span>{modality}</span>;
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
    Header: 'Inscritos',
    id: 'inscritos',
    accessor: 'scholar_attendance',
    Cell: ({ value }) => {
      const attendance = value.filter((a) => a.attendance === 'ENROLLED' || 'ATTENDED');

      return <span>{attendance.length}</span>;
    },
  },
  {
    Header: 'Asistentes',
    id: 'asistentes',
    accessor: 'scholar_attendance',
    Cell: ({ value }) => {
      const attendance = value.filter((a) => a.attendance === 'ATTENDED');

      return <span>{attendance.length}</span>;
    },
  },
];

export default WorkshopColumns;
