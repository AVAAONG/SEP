'use client';
import { parseSkillFromDatabase } from '@/lib/utils2';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Skill } from '@prisma/client';
import Link from 'next/link';
import { chatIcon } from 'public/svgs/svgs';

interface WorkshopAccordionProps {
  workshopInfo: {
    workshopTotalHours: number;
    totalHoursBySkill: [{ category: string; totalHours: number }];
  };
}
interface ChatAccordionProps {
  chatInfo: {
    chatTotalHours: number;
    chatTotalHoursByLevel: [{ category: string; totalHours: number }];
  };
}

const WorkshopsAccordion: React.FC<WorkshopAccordionProps> = ({ workshopInfo }) => {
  const { workshopTotalHours, totalHoursBySkill } = workshopInfo;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 px-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className=" text-blue-600  h-10 w-10 md:w-14 md:h-14"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
        <h3 className="col-span-full text-2xl md:text-3xl font-semibold">Actividades formativas</h3>
      </div>
      <Accordion variant="splitted" className="p-0">
        <AccordionItem
          key="1"
          aria-label="Actividades académicas"
          className="group-[.is-splitted]:p-0 p-0 w-full"
          classNames={{
            content: 'bg-blue-400 rounded-b-lg pb-0',
            base: '!bg-blue-600',
            title: 'text-white text-xl font-semibold leading-none tracking-tight',
            indicator: '-mt-2 opacity-100 text-white text-center pr-4',
          }}
          title={
            <div className="flex-col gap-1.5 flex justify-between items-center px-2">
              <div className="flex items-center gap-4">
                <p className="text-2xl md:text-4xl font-bold">{workshopTotalHours}</p>
                <h3 className="text-base md:text-2xl font-semibold leading-none tracking-tight">
                  Horas académicas realizadas en actividades formativas
                </h3>
              </div>
            </div>
          }
        >
          <div className="p-4 gap-4 flex flex-wrap justify-between">
            {totalHoursBySkill.map((skill) => (
              <div className="flex-grow">
                <h4 className="font-semibold text-light">
                  {parseSkillFromDatabase(skill.category as Skill)}
                </h4>
                <p className="text-4xl font-bold text-white ">{skill.totalHours}</p>
                <p className="text-base  text-black dark:text-blue-200">Horas académicas</p>
              </div>
            ))}
          </div>
          <Link
            replace={false}
            href="?actividad=actividadesFormativas"
            className="text-center md:text-start p-2 block rounded-b-lg text-sm font-semibold text-light  transition-transform duration-75 hover:bg-blue-600"
          >
            Ver actividades realizadas
          </Link>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
const ChatsAccordion: React.FC<ChatAccordionProps> = ({ chatInfo }) => {
  const { chatTotalHours, chatTotalHoursByLevel } = chatInfo;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 px-4 items-center">
        <div className="h-10 w-10 md:w-14 md:h-14 text-red-600">{chatIcon()}</div>
        <h3 className="col-span-full text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Inglés
        </h3>
      </div>
      <Accordion variant="splitted" className="p-0">
        <AccordionItem
          key="1"
          aria-label="Inglés"
          className="group-[.is-splitted]:p-0 p-0 w-full"
          classNames={{
            content: 'bg-red-400 rounded-b-lg pb-0',
            base: '!bg-red-600',
            title: 'text-white text-xl font-semibold leading-none tracking-tight',
            indicator: '-mt-2 opacity-100 text-white text-center pr-4',
          }}
          title={
            <div className="px-2 flex-col space-y-1.5 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <p className="text-2xl md:text-4xl font-bold">{chatTotalHours}</p>
                <h3 className="text-base md:text-2xl font-semibold leading-none tracking-tight">
                  Horas académicas realizadas en chat clubs
                </h3>
              </div>
            </div>
          }
        >
          <div className="p-4 gap-4 flex flex-wrap justify-between">
            {chatTotalHoursByLevel.map((level) => (
              <div className="flex-grow">
                <h4 className="font-semibold text-light">{level.category}</h4>
                <p className="text-4xl font-bold text-white ">{level.totalHours}</p>
                <p className="text-base  text-black dark:text-red-200">Horas académicas</p>
              </div>
            ))}
          </div>
          {/* <div>Completo el CVA EN iandsfndsafjdsalf</div> */}
          <Link
            replace={false}
            href="?actividad=chats"
            className="text-center md:text-start p-2 block rounded-b-lg text-sm font-semibold text-light  transition-transform duration-75 hover:bg-red-600"
          >
            Ver actividades realizadas
          </Link>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

interface PublicAccordionProps {
  workshopInfo: {
    workshopTotalHours: number;
    totalHoursBySkill: { category: string; totalHours: number }[];
  };
  chatInfo: {
    chatTotalHours: number;
    chatTotalHoursByLevel: { category: string; totalHours: number }[];
  };
  activity: 'actividadesFormativas' | 'chats' | 'voluntariado' | undefined;
}

const PublicAccordion: React.FC<PublicAccordionProps> = ({ workshopInfo, chatInfo, activity }) => {
  if (activity === 'actividadesFormativas') {
    return <WorkshopsAccordion workshopInfo={workshopInfo} />;
  } else if (activity === 'chats') {
    return <ChatsAccordion chatInfo={chatInfo} />;
  } else if (activity === 'voluntariado') {
    return <></>;
  } else {
    return (
      <>
        <WorkshopsAccordion workshopInfo={workshopInfo} />
        <ChatsAccordion chatInfo={chatInfo} />
      </>
    );
  }
};

export default PublicAccordion;
