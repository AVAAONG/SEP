import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

interface IUserColumn {
  link: string;
  name: string | undefined;
  photo: string | undefined;
}

export const UserColumn: React.FC<IUserColumn> = ({ link, name, photo }) => {
  return (
    <Link href={link} className="w-67">
      <div className="flex items-center  w-full w-67">
        <div className="flex-shrink-0 w-8 h-8">
          <Avatar className="w-full h-full rounded-full" src={photo} alt="Foto de perfil" />
        </div>
        <div className="ml-4 text-start w-full">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {name ? name : 'No definido'}
          </span>
        </div>
      </div>
    </Link>
  );
};
