'use client';
import logo from '@/../public/proexcelencia.png';
import { sidebarAtom } from '@/lib/state/mainState';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { dashboardComponent } from '../../../../../public/svgs/svgs';
import DropdownButton from '../DropdownButton';
import { SIDEBAR_ACTIVITIES_ACTIONS, SIDEBAR_DB_BUTTONS } from '../data';
import SidebarSeparator from './SidebarSeparator';
const Sidebar = () => {
  const [isOpen, setSidebarOpen] = useAtom(sidebarAtom);
  const toggleSidebar = () => setSidebarOpen(!isOpen);
  return (
    <aside
      className={`${isOpen ? 'fixed xl:flex xl:relative' : 'hidden'
        } flex-col gap-4 justify-start items-center z-50 xl:z-0 w-full sm:w-72 py-8 px-2 bg-gradient-to-b from-[#238442] to-[#438f5c] dark:from-emerald-950 dark:to-slate-950 `}
    >
      <div className="flex justify-between xl:justify-start items-center mb-8 xl:mb-2">
        <Link href="/admin/dashboard">
          <Image src={logo} width={180} alt="Logo Proexcelencia" />
        </Link>
        <div className="flex justify-start items-center xl:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 text-white rounded-lg cursor-pointer  hover:text-green-900 hover:bg-green-100 focus:bg-green-100 dark:focus:bg-emerald-950  dark:focus:ring-green-700 dark:text-green-700 dark:hover:bg-green-700 dark:hover:text-emerald-950 dark:focus:text-emerald-700"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </button>
        </div>
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
