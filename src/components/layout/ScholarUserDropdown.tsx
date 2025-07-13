'use client';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { signOut, useSession } from 'next-auth/react';

export const ScholarUserDropdown: React.FC = () => {
  const { data, status } = useSession();
  let image: string | undefined,
    email: string | undefined,
    name: string = '';
  if (status === 'loading') {
    image = undefined;
    email = undefined;
    name = '';
  } else {
    image = data?.image;
    email = data?.email;
    name = data?.name;
  }

  const fallback = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Dropdown placement="bottom-end" radius="sm" size="sm">
      <DropdownTrigger>
        <Avatar
          as="button"
          fallback={fallback}
          className="transition-transform h-8 w-8"
          src={image}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={['info']}>
        <DropdownSection showDivider>
          <DropdownItem key="info" className="font-normal">
            <div className=" space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">{email}</p>
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem key="publicProfile" href={`/perfilBecario/${data?.id}`}>
          Ver perfil público
        </DropdownItem>
        <DropdownItem key="configurations" href="/becario/configuracion">
          Configuración
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={async () => signOut()}>
          <div className="flex items-center justify-between w-full">
            <p>Cerrar sesión</p>
            <ArrowRightEndOnRectangleIcon className="w-4 h-4 mr-3 text-muted-foreground" />
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
