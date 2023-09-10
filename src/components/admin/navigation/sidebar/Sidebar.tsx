'use client';
import logo from '@/../public/proexcelencia.png';
import { sidebarAtom } from '@/lib/state/mainState';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon, dashboardComponent } from '../../../../../public/svgs/svgs';
import DropdownButton from "../../../scholar/DropdownButton";
import { SIDEBAR_ACTIVITIES_ACTIONS, SIDEBAR_DB_BUTTONS } from '../data';
import SidebarSeparator from './SidebarSeparator';
const Sidebar = () => {
  const [isOpen, setSidebarOpen] = useAtom(sidebarAtom);
  const toggleSidebar = () => setSidebarOpen(!isOpen);
  return (
    <aside
      className={`${isOpen ? 'fixed xl:flex xl:relative' : 'hidden'
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
            <div className='w-6 font-bold'><MenuIcon /></div>
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
        {SIDEBAR_ACTIVITIES_ACTIONS.map(({ buttonName, icon, itemList }) => {
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
      <SidebarSeparator text="Bases de datos" />
      <div className="w-full flex flex-col gap-2 justify-between">
        {SIDEBAR_DB_BUTTONS.map(({ buttonName, icon, itemList }) => {
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
      <SidebarSeparator text="Mentoria" />
      <SidebarSeparator text="Controles de administrador" />
      <SidebarSeparator text="Captacion" />
      <SidebarSeparator text="Red de egresados" />
    </aside>
  );
};

export default Sidebar;
