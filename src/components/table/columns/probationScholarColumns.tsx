'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import Image from 'next/image';
import Link from 'next/link';
import { Cell, CellValue, Column } from 'react-table';

const scholarAllInformationCollumn: Column<any>[] = [
  {
    Header: 'Nombre',
    accessor: (row: any) => `${row.first_names} ${row.last_names}`,
    Cell: ({ value, cell }: { value: CellValue; cell: Cell<any> }) => (
      <Link
        href={cell.row.original.id ? `becarios/${cell.row.original.id}` : ''}
        className="flex items-center"
      >
        <div className="flex-shrink-0 w-8 h-8">
          <Image
            className="w-full h-full rounded-full"
            src={defailProfilePic}
            alt="Foto de perfil"
          />
        </div>
        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{value}</span>
        </div>
      </Link>
    ),
  },

  {
    Header: 'Telefono local',
    accessor: 'local_phone_number',
  },
  {
    Header: 'Telefono celular',
    accessor: 'cell_phone_Number',
  },
  {
    Header: 'Whatsapp',
    accessor: 'whatsapp_number',
  },
  {
    Header: 'Correo',
    accessor: 'allowedEmail',
  },
  {
    Header: 'Universidad',
    accessor: 'collage',
    id: 'collage',
    Cell: ({ value }: { value: CellValue }) => {
      return <span>{value}</span>;
    },
  },
  {
    Header: 'Tipo de probatorio',
    accessor: '',
  },
  {
    Header: 'Fecha de inicio de probatorio',
    accessor: '',
  },
  {
    Header: 'Horas de voluntariado internas realizadas',
    accessor: 'career',
  },
  {
    Header: 'Horas de voluntariado externas realizadas',
    accessor: 'career',
  },
  {
    Header: 'Carrera',
    accessor: 'career',
  },
  {
    Header: 'Actividades formativas realizadas',
    accessor: 'atendedWorkshops',
  },
  {
    Header: 'Chat clubs  realizadas',
    accessor: 'atendedChats',
  },
];

export default scholarAllInformationCollumn;
