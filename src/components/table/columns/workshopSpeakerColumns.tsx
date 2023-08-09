import defailProfilePic from '@/../public/defaultProfilePic.png';
import { WorkshopSpeaker } from '@prisma/client';
import Image from 'next/image';
import { TableOptions } from 'react-table';

const workshopSpeakerColumns: TableOptions<WorkshopSpeaker> = [
  {
    Header: 'Nombre completo',
    Cell: ({ cell }) => {
      return (
        <div className="flex items-center w-8">
          <div className="flex-shrink-0 w-8 h-8">
            <Image
              className="w-full h-full rounded-full"
              src={defailProfilePic}
              alt="Foto de perfil"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
              {cell.row.original.first_name}
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
              {cell.row.original.last_name}
            </div>
          </div>
        </div>
      );
    },
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
    Header: 'Género',
    accessor: 'gender',
  },
];

export default workshopSpeakerColumns;
