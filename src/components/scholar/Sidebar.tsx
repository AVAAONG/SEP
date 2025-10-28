'use client';
import logo from '@/../public/proexcelencia-color.png';
import { useSidebarContext } from '@/hooks/sidebar-context';
import { ArchiveBoxIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import {
  chatIcon,
  dashboardComponent,
  volunterIcon,
  workshopIcon,
} from '../../../public/svgs/svgs';
import SidebarSeparator from '../admin/navigation/sidebar/SidebarSeparator';
import ScholarDropdownButton from './ScholarDropdownButton';

const SCHOLAR_PREFIX = 'becario';

const Sidebar = ({ isSpeaker }: { isSpeaker: boolean | undefined }) => {
  const { isOpen: isSidebarOpen, toggle } = useSidebarContext();

  const SCHOLAR_SIDEBAR_ITEMS = [
    {
      Icon: workshopIcon(),
      buttonName: 'Actividades formativas',
      itemList: [],
      link: `/${SCHOLAR_PREFIX}/actividadesFormativas`,
    },
    {
      Icon: chatIcon(),
      buttonName: 'Chats',
      itemList: isSpeaker
        ? [
          {
            name: 'Registro',
            link: `/${SCHOLAR_PREFIX}/chats`,
          },
          {
            name: 'Proponer chat',
            link: `/${SCHOLAR_PREFIX}/chats/crear`,
          },
        ]
        : [],
      link: isSpeaker ? '' : `/${SCHOLAR_PREFIX}/chats`,
    },
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
      Icon: <SparklesIcon className="!text-primary-light" />,
      buttonName: 'Oferta de actividades',
      itemList: [],
      link: `/${SCHOLAR_PREFIX}/oferta`,
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen pt-4 bg-white dark:bg-black transform transition-transform duration-300 ease-in-out 
      w-full md:w-72 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      aria-hidden={!isSidebarOpen}
    >
      <div className={`flex items-center mt-2 px-5 ${isSidebarOpen ? 'justify-between' : ''} `}>
        <Link href="/becario/panel" className="flex justify-center w-full">
          <Image src={logo} width={190} alt="Logo Proexcelencia" />
        </Link>
        <div className="flex justify-start items-center md:hidden">
          <button
            onClick={toggle}
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
      <div className="flex flex-col gap-2 overflow-y-auto py-6 px-3 h-full">
        <ul className="space-y-2">
          <ScholarDropdownButton
            Icon={dashboardComponent()}
            buttonName="Panel general"
            itemList={[]}
            link={`/${SCHOLAR_PREFIX}/panel`}
          />
        </ul>
        <SidebarSeparator label="Actividades" />
        <ul className="space-y-2">
          {SCHOLAR_SIDEBAR_ITEMS.map((item, index) => (
            <ScholarDropdownButton {...item} key={index} />
          ))}
        </ul>
        <SidebarSeparator label="Otros componentes" />
        <ul className="space-y-2">
          <ScholarDropdownButton
            Icon={<DocumentTextIcon />}
            buttonName="Registro CVA"
            itemList={[]}
            link={`/${SCHOLAR_PREFIX}/cva`}
          />
          <ScholarDropdownButton
            Icon={<DocumentTextIcon />}
            buttonName="Notas universitarias"
            itemList={[]}
            link={`/${SCHOLAR_PREFIX}/universidad`}
          />
          <ScholarDropdownButton
            Icon={<ArchiveBoxIcon />}
            buttonName="D.O.S Exchange Programs"
            itemList={[]}
            link={`/${SCHOLAR_PREFIX}/dos`}
          />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
