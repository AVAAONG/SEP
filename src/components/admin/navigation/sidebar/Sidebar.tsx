'use client';
import logo from '@/../public/proexcelencia.png';
import { dashboardComponent } from '@/assets/svgs';
import { sidebarAtom } from '@/state/mainState';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import DropdownButton from '../DropdownButton';
import { SIDEBAR_ACTIVITIES_ACTIONS, SIDEBAR_DB_BUTTONS } from '../data';
import SidebarSeparator from './SidebarSeparator';
const Sidebar = () => {
  const [isOpen] = useAtom(sidebarAtom);
  return (
    <aside
      className={`${isOpen ? 'flex' : 'hidden'
        } flex-col gap-4 justify-start items-center w-72 py-8 px-2 bg-gradient-to-b from-[#238442] to-[#438f5c] dark:from-emerald-950 dark:to-slate-950 `}
    >
      <div className="flex items-center mb-2">
        <Link href="/dashboard">
          <Image src={logo} width={180} alt="Logo Proexcelencia" />
        </Link>
      </div>
      <div className="w-full flex flex-col justify-between">
        <DropdownButton
          buttonName="Panel general"
          itemList={[{ link: '/admin/dashboard', name: 'Estadisticas generales' }]}
          Icon={dashboardComponent}
        />
      </div>
      <SidebarSeparator text="Actividades" />
      <div className="w-full flex flex-col justify-between">
        {SIDEBAR_ACTIVITIES_ACTIONS.map(({ buttonName, icon, itemList }) => {
          return (
            <DropdownButton
              key={buttonName}
              buttonName={buttonName}
              Icon={icon}
              itemList={itemList}
            />
          );
        })}
      </div>
      <SidebarSeparator text="Bases de datos" />
      <div className="w-full flex flex-col justify-between">
        {SIDEBAR_DB_BUTTONS.map(({ buttonName, icon, itemList }) => {
          return (
            <DropdownButton
              key={buttonName}
              buttonName={buttonName}
              Icon={icon}
              itemList={itemList}
            />
          );
        })}
      </div>
      <SidebarSeparator text="Mentoria" />
      <SidebarSeparator text="Controles de administrador" />
      <SidebarSeparator text="Captacion" />
      <SidebarSeparator text="Red de egresados" />

      {/* 
                <ul className=" space-y-2 ">
                    {SIDEBAR_DATABSE_ELEMENTS.map(({ buttonName, icon, itemList }) => {
                        return (
                            <DropdownButton key={buttonName} buttonName={buttonName} icon={icon} itemList={itemList} />
                        )
                    })}
                </ul> */}
    </aside>
  );
};

export default Sidebar;
