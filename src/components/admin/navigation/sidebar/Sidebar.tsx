'use client';
import { useSidebarContext } from '@/hooks/sidebar-context';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Button, cn, Image } from '@nextui-org/react';
import Link from 'next/link';
import { dashboardComponent, linkIcon, userIcon } from '../../../../../public/svgs/svgs';
import DropdownButton from '../../../scholar/DropdownButton';
import { PROGRAM_COMPONENTS, SCHOLARS } from '../data';
import SidebarSeparator from './SidebarSeparator';

const Sidebar = () => {
  const { isOpen, toggle } = useSidebarContext();
  return (
    <aside
      className={`${
        isOpen ? 'fixed xl:flex xl:relative' : 'fixed xl:flex xl:relative w-[70px]'
      } flex-col gap-4 justify-start items-center z-50 xl:z-0  py-4 px-2  transition-all min-h-full`}
    >
      <div className="invisible lg:visible absolute top-[12px] -right-[17px] z-50">
        <Button isIconOnly onPress={toggle} size="sm" variant="solid" radius="sm">
          <ChevronLeftIcon
            className={cn(
              'h-4 w-4 transition-transform ease-in-out duration-700',
              isOpen === false ? 'rotate-180' : 'rotate-0'
            )}
          />
        </Button>
      </div>
      <div className="flex justify-between xl:justify-start items-center mb-8 xl:mb-2">
        <Link
          className={cn(
            'flex gap-1 justify-center items-center',
            'transition-transform ease-in-out duration-300 ',
            !isOpen ? 'translate-x-1' : 'translate-x-0'
          )}
          href="/admin"
        >
          <Image src="/logo-proexcelencia-cap-white.png" width={40} />
          <Image
            src="/logo-proexcelencia-words-white.png"
            width={140}
            height={20}
            className={cn(
              'transition-[transform,opacity,display] ease-in-out duration-300 z-50',
              !isOpen ? '-translate-x-96 opacity-0 hidden' : 'translate-x-0 opacity-100'
            )}
          />
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2 justify-between">
        <DropdownButton
          buttonName="Panel general"
          Icon={dashboardComponent()}
          itemList={[]}
          link="/admin/panel"
        />
      </div>
      <SidebarSeparator label="Componentes" />
      <div className="w-full flex flex-col gap-2 justify-between">
        {PROGRAM_COMPONENTS.map(({ buttonName, icon, itemList }) => {
          return (
            <DropdownButton
              key={buttonName}
              buttonName={buttonName}
              Icon={icon()}
              itemList={itemList}
              link={null}
            />
          );
        })}
      </div>
      <SidebarSeparator label="Participantes" />
      <div className="w-full flex flex-col gap-2 justify-between">
        {SCHOLARS.map(({ buttonName, icon, itemList, link }) => {
          return (
            <DropdownButton
              key={buttonName}
              buttonName={buttonName}
              Icon={icon()}
              itemList={itemList}
              link={link}
            />
          );
        })}
      </div>
      <SidebarSeparator label="Mentoria" />
      <div className="w-full flex flex-col gap-2 justify-between">
        <DropdownButton
          buttonName="Mentores"
          Icon={userIcon()}
          itemList={[]}
          link="/admin/mentoria/mentores"
        />
        <DropdownButton
          buttonName="Captación"
          Icon={userIcon()}
          itemList={[]}
          link="/admin/mentoria/captacion"
        />
        <DropdownButton
          buttonName="Formulario de postulación"
          Icon={linkIcon()}
          itemList={[]}
          link="/mentores/registro"
        />
      </div>
      {/* <SidebarSeparator label="Configuración" />
      {SIDEBAR_ADMIN_ACTIONS.map(({ buttonName, icon, itemList }) => {
        return (
          <DropdownButton
            key={buttonName}
            buttonName={buttonName}
            Icon={icon()}
            itemList={itemList}
            link={null}
          />
        );
      })} */}
      <SidebarSeparator label="Captacion" />
      <div className="w-full flex flex-col gap-2 justify-between">
        <DropdownButton
          buttonName="Formulario de postulación"
          Icon={linkIcon()}
          itemList={[]}
          link="/captacion/"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
