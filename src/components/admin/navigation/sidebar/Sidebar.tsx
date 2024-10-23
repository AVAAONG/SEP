'use client';
import logo from '@/../public/proexcelencia.png';
import { sidebarAtom } from '@/lib/state/mainState';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { MenuIcon, dashboardComponent, linkIcon, userIcon } from '../../../../../public/svgs/svgs';
import DropdownButton from '../../../scholar/DropdownButton';
import { PROGRAM_COMPONENTS, SCHOLARS } from '../data';
import SidebarSeparator from './SidebarSeparator';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setSidebarOpen] = useAtom(sidebarAtom);
  const toggleSidebar = () => setSidebarOpen(!isOpen);
  useEffect(() => {
    // Function to handle route changes
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, [pathname]);
  return (
    <aside
      className={`${
        isOpen ? 'fixed xl:flex xl:relative' : 'hidden'
      } flex-col gap-4 justify-start items-center z-50 xl:z-0 w-full sm:w-72 py-8 px-2 bg-primary-light dark:bg-secondary-dark transition-all min-h-full`}
    >
      <div className="flex justify-between xl:justify-start items-center mb-8 xl:mb-2">
        <Link href="/admin/panel">
          <Image src={logo} width={180} alt="Logo Proexcelencia" />
        </Link>
        <div className="flex justify-start items-center xl:hidden">
          <button
            onClick={toggleSidebar}
            type="button"
            className="w-6 text-white font-medium p-2 mr-4 text-xl"
          >
            <div className="w-6 font-bold">
              <MenuIcon />
            </div>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 justify-between">
        <DropdownButton
          buttonName="Panel general"
          Icon={dashboardComponent()}
          itemList={[]}
          link="/admin/panel"
        />
      </div>
      <SidebarSeparator text="Componentes" />
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
      <SidebarSeparator text="Participantes" />
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
      <SidebarSeparator text="Mentoria" />
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
      {/* <SidebarSeparator text="Configuración" />
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
      <SidebarSeparator text="Captacion" />
      <div className="w-full flex flex-col gap-2 justify-between">
        <DropdownButton
          buttonName="Formulario de postulación"
          Icon={linkIcon()}
          itemList={[]}
          link="/postulante/registro"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
