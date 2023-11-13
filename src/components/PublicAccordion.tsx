'use client';
import { parseSkillFromDatabase } from '@/lib/utils2';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Level, Skill } from '@prisma/client';
import Link from 'next/link';
import { chatIcon } from 'public/svgs/svgs';

interface PublicAccordionProps {
  workshopInfo: {
    workshopTotalHours: number;
    totalHoursBySkill: {
      [skill: string]: number;
    };
  };
  chatInfo: {
    chatTotalHours: number;
    chatTotalHoursByLevel: {
      [Level: Level]: number;
    };
  };
  volunteerInfo: {
    totalHours: number;
  };
  kindOfActivity: string;
}

interface WorkshopAccordionProps {
  workshopInfo: {
    workshopTotalHours: number;
    totalHoursBySkill: {
      [skill: Skill]: number;
    };
  };
}

interface ChatAccordionProps {
  chatInfo: {
    chatTotalHours: number;
    chatTotalHoursByLevel: {
      [Level: Level]: number;
    };
  };
}



const WorkshopsAccordion: React.FC<WorkshopAccordionProps> = ({ workshopInfo }) => {
  const { workshopTotalHours, totalHoursBySkill } = workshopInfo;

  return (
    <>
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
          className=" text-blue-600  h-14 w-14"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
        <h3 className="col-span-full text-3xl font-semibold">
          Actividades formativas
        </h3>
      </div>
      <Accordion variant="splitted">
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
                <p className="text-4xl font-bold">{workshopTotalHours}</p>
                <h3 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
                  Horas académicas de actividades formativas realizadas
                </h3>
              </div>
            </div>
          }
        >
          <div className="p-4 gap-4 flex flex-wrap justify-between">
            {totalHoursBySkill.map((skill) => (
              <div className="flex-grow">
                <h4 className="font-semibold text-light">{parseSkillFromDatabase(skill.category)}</h4>
                <p className="text-4xl font-bold text-white ">{skill.totalHours}</p>
                <p className="text-base  text-black dark:text-blue-200">Horas académicas</p>
              </div>
            ))}
          </div>
          <Link
            replace={false}
            href="?actividad=talleres"
            className="p-2 block rounded-b-lg text-sm font-semibold text-light  transition-transform duration-75 hover:bg-blue-600"
          >
            Ver actividades realizadas
          </Link>
        </AccordionItem>
      </Accordion>
    </>
  )
}
const ChatsAccordion: React.FC<ChatAccordionProps> = ({ chatInfo }) => {
  const { chatTotalHours, chatTotalHoursByLevel } = chatInfo;
  return (
    <>
      <div className="flex gap-4 px-4 items-center">
        <div className="w-14 h-14 text-red-600">{chatIcon()}</div>
        <h3 className="col-span-full text-3xl font-semibold text-gray-900 dark:text-white">
          Inglés
        </h3>
      </div>
      <Accordion variant="splitted">
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
            <div className="flex-col space-y-1.5 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <p className="text-4xl font-bold">{chatTotalHours}</p>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Horas académicas de actividades formativas realizadas
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
          <Link
            replace={false}
            href="?actividad=chats"
            className="p-2 block rounded-b-lg text-sm font-semibold text-light  transition-transform duration-75 hover:bg-red-600"
          >
            Ver actividades realizadas
          </Link>
        </AccordionItem>
      </Accordion>
    </>
  )
}





const PublicAccordion: React.FC<PublicAccordionProps> = ({
  workshopInfo,
  kindOfActivity,
  chatInfo,
}) => {

  if (kindOfActivity === 'talleres') {
    return (
      <WorkshopsAccordion workshopInfo={workshopInfo} />
    );
  } else if (kindOfActivity === 'chats') {
    return (
      <ChatsAccordion chatInfo={chatInfo} />
    );
  }
  // else if (kindOfActivity === 'voluntariado') {
  //   return (
  // <>
  //   <div className="flex gap-4 px-4 items-center">
  //     <div className="w-14 h-14 text-green-600">{volunterIcon()}</div>

  //     <h3 className="col-span-full text-3xl font-semibold  ">Actividades de voluntariado</h3>
  //   </div>
  //   <Accordion variant="splitted">
  //     <AccordionItem
  //       key="3"
  //       className="group-[.is-splitted]:p-0 p-0 w-full"
  //       aria-label="Actividades de voluntariado"
  //       classNames={{
  //         content: 'bg-green-100  rounded-b-lg',
  //         base: '!bg-green-500',
  //         title: 'text-light text-xl font-semibold leading-none tracking-tight',
  //         subtitle: 'text-green-100',
  //         indicator: 'text-white text-center pr-4',
  //       }}
  //       title={
  //         <div className="flex-col space-y-1.5  flex justify-between items-center">
  //           <div className="flex items-center space-x-4">
  //             <p className="text-4xl font-bold">{workshopTotalHours}</p>
  //             <h3 className="text-2xl font-semibold leading-none tracking-tight">
  //               Horas de voluntariado realizadas
  //             </h3>
  //           </div>
  //         </div>
  //       }
  //     ></AccordionItem>
  //   </Accordion>
  // </>
  // );
  // } 
  else {
    return (
      <>
        <WorkshopsAccordion workshopInfo={workshopInfo} />

        {/* <div className="flex gap-4 px-4 items-center">
          <div className="w-14 h-14 text-green-600">{volunterIcon()}</div>

          <h3 className="col-span-full text-3xl font-semibold  ">Actividades de voluntariado</h3>
        </div>
        <Accordion variant="splitted">
          <AccordionItem
            key="3"
            className="group-[.is-splitted]:p-0 p-0 w-full"
            aria-label="Actividades de voluntariado"
            classNames={{
              content: 'bg-green-100  rounded-b-lg',
              base: '!bg-green-500',
              title: 'text-light text-xl font-semibold leading-none tracking-tight',
              subtitle: 'text-green-100',
              indicator: 'text-white text-center pr-4',
            }}
            title={
              <div className="flex-col space-y-1.5  flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <p className="text-4xl font-bold">{workshopTotalHours}</p>
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">
                    Horas de voluntariado realizadas
                  </h3>
                </div>
              </div>
            }
          ></AccordionItem>
        </Accordion> */}
        <ChatsAccordion chatInfo={chatInfo} />
      </>
    );
  }
};

export default PublicAccordion;
