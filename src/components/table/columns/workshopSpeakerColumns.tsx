'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import Image from 'next/image';

const workshopSpeakerColumns = [
  {
    Header: 'Nombre completo',
    Cell: ({ cell }: { cell: any }) => (
      <div className="flex items-center w-8">
        <div className="flex-shrink-0 w-8 h-8">
          <Image
            className="w-full h-full rounded-full"
            src={defailProfilePic}
            alt="Foto de perfil"
          />
        </div>
        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {cell.row.original.first_names} {cell.row.original.last_names}
          </span>{' '}
        </div>
      </div>
    ),
  },
  {
    Header: 'Telefono',
    accessor: 'phone_number',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
  {
    Header: 'Redes Sociales',
    Cell: ({ cell }: { cell: any }) => (
      <div className="flex items-center w-8">
        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {cell.row.original.facebook_user}
          </span>{' '}
        </div>
      </div>
    ),
  },
];

export default workshopSpeakerColumns;
