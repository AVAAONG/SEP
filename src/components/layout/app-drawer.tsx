'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Button, cn, Image } from '@nextui-org/react';
import Link from 'next/link';
import { dashboardComponent, linkIcon, userIcon } from 'public/svgs/svgs';
import { useState } from 'react';
import { PROGRAM_COMPONENTS, SCHOLARS } from '../admin/navigation/data';
import SidebarSeparator from '../admin/navigation/sidebar/SidebarSeparator';
import DropdownButton from '../scholar/DropdownButton';
import ChapterToggle from './chapter-toggle';
import CustomDrawer from './drawer';

const AppDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        radius="sm"
        className="lg:invisible lg:hidden"
        onPress={() => setIsOpen(true)}
        isIconOnly
        variant="flat"
        startContent={<Bars3Icon className="h-5 w-5" />}
      />
      <CustomDrawer open={isOpen} onOpenChange={setIsOpen} placement="left">
        <Button
          className="absolute top-2 right-2"
          color="danger"
          onPress={() => setIsOpen(false)}
          size="sm"
          radius="sm"
          variant="flat"
          isIconOnly
          startContent={<XMarkIcon className="w-5 h-5" />}
        />
        <div className="p-4 space-y-4">
          <div className="flex justify-between xl:justify-start items-center mb-8 xl:mb-2">
            <Link
              className={cn(
                'flex gap-1 justify-center items-center',
                'transition-transform ease-in-out duration-300 ',
                !isOpen ? 'translate-x-1' : 'translate-x-0'
              )}
              href="/admin/panel"
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
          <DropdownButton
            buttonName="Panel general"
            Icon={dashboardComponent()}
            itemList={[]}
            link="/admin/panel"
          />
          <SidebarSeparator label="Componentes" />
          <div
            className={cn('w-full flex flex-col gap-2 justify-between', !isOpen && 'items-center')}
          >
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
          <div
            className={cn('w-full flex flex-col gap-2 justify-between', !isOpen && 'items-center')}
          >
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
          <div
            className={cn('w-full flex flex-col gap-2 justify-between', !isOpen && 'items-center')}
          >
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
          <SidebarSeparator label="Captacion" />
          <div
            className={cn('w-full flex flex-col gap-2 justify-between', !isOpen && 'items-center')}
          >
            <DropdownButton
              buttonName="Formulario de postulación"
              Icon={linkIcon()}
              itemList={[]}
              link="/captacion/"
            />
          </div>
          <div className={cn('w-full mt-28 ml-6', !isOpen && '!ml-3')}>
            <ChapterToggle />
          </div>
        </div>
      </CustomDrawer>
    </>
  );
};

export default AppDrawer;
