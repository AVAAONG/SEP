'use client';
import logo from '@/../public/proexcelencia-color.png';
import {
  CalendarIcon,
  chatIcon,
  dashboardComponent,
  volunterIcon,
  workshopIcon,
} from '@/assets/svgs';
import { scholarSidebarAtom } from '@/state/mainState';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import DropdownButton from './DropdownButton';

const SCHOLAR_PREFIX = 'becario';

export const SCHOLAR_SIDEBAR_ITEMS = [
  {
    Icon: dashboardComponent(),
    buttonName: 'Panel general',
    itemList: [],
    link: `/${SCHOLAR_PREFIX}/dashboard`,
  },
  {
    Icon: workshopIcon(),
    buttonName: 'Actividades formativas',
    itemList: [
      {
        name: 'Reporte de actividades',
        link: `/${SCHOLAR_PREFIX}/talleres/reporte`,
      },
      { name: 'Lista de actividades', link: `/${SCHOLAR_PREFIX}/talleres` },
    ],
    link: '',
  },
  {
    Icon: chatIcon(),
    buttonName: 'Chats',
    itemList: [
      { name: 'Lista de chats', link: `/${SCHOLAR_PREFIX}/chats` },
      {
        name: 'Reporte de chats Clubs',
        link: `/${SCHOLAR_PREFIX}/chats/reporte`,
      },
    ],
    link: '',
  },
  {
    Icon: volunterIcon(),
    buttonName: 'Voluntariado',
    itemList: [
      {
        name: 'Lista de voluntariado',
        link: `/${SCHOLAR_PREFIX}/voluntariado`,
      },
      {
        name: 'Reporte de horas de voluntariado',
        link: `/${SCHOLAR_PREFIX}/voluntariado/reporte`,
      },
      {
        name: 'Subir voluntariado externo',
        link: `/${SCHOLAR_PREFIX}/voluntariado/externo`,
      },
    ],
    link: '',
  },
  {
    Icon: CalendarIcon(),
    buttonName: 'Calendario de Actividades',
    itemList: [],
    link: `/${SCHOLAR_PREFIX}/calendario`,
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useAtom(scholarSidebarAtom);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <aside
      className={`${isSidebarOpen ? 'fixed  w-full md:w-64' : 'hidden'
        } top-0 left-0 z-40 h-screen pt-4  bg-white border-r border-gray-200 md:translate-x-0 dark:bg-slate-900 dark:border-gray-700`}
    >
      <div className={`flex items-center mt-2 ml-6 ${isSidebarOpen ? 'justify-between' : ''} `}>
        <Link href="/becario/dashboard">
          <Image src={logo} width={190} alt="Logo Proexcelencia" />
        </Link>
        <div className="flex justify-start items-center md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 text-green-600 rounded-lg cursor-pointer  hover:text-green-900 hover:bg-green-100 focus:bg-green-100 dark:focus:bg-emerald-950  dark:focus:ring-green-700 dark:text-green-700 dark:hover:bg-green-700 dark:hover:text-emerald-950 dark:focus:text-emerald-700"
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
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-slate-900 mt-4">
        <ul className="space-y-2">
          {SCHOLAR_SIDEBAR_ITEMS.map((item, index) => (
            <DropdownButton {...item} key={index} />
          ))}
        </ul>
        <div className="p-4 mt-6 rounded-lg bg-emerald-100 dark:bg-emerald-900 dark:border-emerald-950 border-green-600">
          <div className="flex items-center mb-3">
            <span className=" text-emerald-800 text-sm font-bold rounded  dark:text-emerald-200">
              ¡Danos tu feedback!
            </span>
          </div>
          <p className="mb-3 text-xs text-green-800 dark:text-green-400">
            El SEP actualmente sigue en proceso de desarrolo, seria genial para nosotros escuchar
            tus comentarios con respecto a mejoras, cambios o nuevas funcionalidades que te gustaria
            ver en el sistema.
          </p>
          <a
            className="bg-orange-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-90"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfRhXSZ0CB5EY5GRJ6sg5crjLgNokge8t2XHvQoUqqGve0Vkg/viewform?usp=sf_link"
          >
            Dejar feedback
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
