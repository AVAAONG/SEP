'use client';
import logo from '@/../public/proexcelencia-color.png';
import { scholarSidebarAtom } from '@/lib/state/mainState';
import { DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  chatIcon,
  dashboardComponent,
  volunterIcon,
  workshopIcon,
} from '../../../public/svgs/svgs';
import ScholarDropdownButton from './ScholarDropdownButton';

const SCHOLAR_PREFIX = 'becario';

export const SCHOLAR_SIDEBAR_ITEMS = [
  {
    Icon: dashboardComponent(),
    buttonName: 'Panel general',
    itemList: [],
    link: `/${SCHOLAR_PREFIX}/panel`,
  },
  {
    Icon: workshopIcon(),
    buttonName: 'Actividades formativas',
    itemList: [],
    link: `/${SCHOLAR_PREFIX}/actividadesFormativas`,
  },
  {
    Icon: chatIcon(),
    buttonName: 'Chats',
    itemList: [],
    link: `/${SCHOLAR_PREFIX}/chats`,
  },
  // {
  //   Icon: chatIcon(),
  //   buttonName: 'Chats',
  //   itemList: [
  //     { name: 'Registro', link: `/${SCHOLAR_PREFIX}/chats` },
  //     { name: 'Proponer chat', link: `/${SCHOLAR_PREFIX}/chats/prouestas` },
  //   ],
  //   link: '',
  // },
  {
    Icon: volunterIcon(),
    buttonName: 'Voluntariado',
    itemList: [
      {
        name: 'Registro',
        link: `/${SCHOLAR_PREFIX}/voluntariado`,
      },
      {
        name: 'Subir voluntariado externo',
        link: `/${SCHOLAR_PREFIX}/voluntariado/externo`,
      },
    ],
    link: '',
  },
  {
    Icon: <SparklesIcon />,
    buttonName: 'Oferta de actividades',
    itemList: [],
    link: `/${SCHOLAR_PREFIX}/oferta`,
  },
  // {
  //   Icon: CalendarIcon(),
  //   buttonName: 'Notas universitarias',
  //   itemList: [],
  //   link: `/${SCHOLAR_PREFIX}/universidad`,
  // },
  {
    Icon: <DocumentTextIcon />,
    buttonName: 'Registro CVA',
    itemList: [],
    link: `/${SCHOLAR_PREFIX}/cva`,
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useAtom(scholarSidebarAtom);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();
  useEffect(() => {
    // Function to handle route changes
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, [pathname]);
  return (
    <aside
      className={`${
        isSidebarOpen ? 'fixed  w-full md:w-72' : 'hidden'
      } top-0 left-0 z-40 h-screen pt-4 bg-gray-50 md:translate-x-0 dark:bg-black`}
    >
      <div className={`flex items-center mt-2 px-5 ${isSidebarOpen ? 'justify-between' : ''} `}>
        <Link href="/becario/panel" className="flex justify-center w-full">
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
      <div className="overflow-y-auto py-6 px-3 h-full">
        <ul className="space-y-2">
          {SCHOLAR_SIDEBAR_ITEMS.map((item, index) => (
            <ScholarDropdownButton {...item} key={index} />
          ))}
        </ul>
        <div className="p-4 mt-6 rounded-lg bg-emerald-100 dark:bg-emerald-900 dark:border-emerald-950 border-green-600">
          <div className="flex items-center mb-3">
            <span className=" text-emerald-800 text-sm font-bold rounded  dark:text-emerald-200">
              ¡Danos tu feedback!
            </span>
          </div>
          <p className="mb-3 text-xs text-green-800 dark:text-green-400">
            El SEP actualmente sigue en proceso de desarrollo, seria genial para nosotros escuchar
            tus comentarios con respecto a mejoras, cambios o nuevas funcionalidades que te gustaria
            ver en el sistema. 💚
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
