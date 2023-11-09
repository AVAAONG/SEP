'use client';
import { Accordion, AccordionItem } from '@nextui-org/react';
import Link from 'next/link';
import { chatIcon, volunterIcon } from 'public/svgs/svgs';

const PublicAccordion = (workshop) => {
  const { totalHours, totalHoursBySkill } = workshop;
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
        <h3 className="col-span-full text-3xl font-semibold text-gray-900 dark:text-white">
          Actividades formativas
        </h3>
      </div>
      <Accordion variant="splitted">
        <AccordionItem
          key="1"
          aria-label="Actividades academicas"
          className="group-[.is-splitted]:p-0 p-0 w-full"
          classNames={{
            content: 'bg-blue-400 rounded-b-lg pb-0',
            base: '!bg-blue-600',
            title: 'text-white text-xl font-semibold leading-none tracking-tight',
            indicator: '-mt-2 opacity-100 text-white text-center pr-4',
          }}
          title={
            <div className="flex-col space-y-1.5 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <p className="text-4xl font-bold">{totalHours}</p>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Horas academicas de actividades formativas realizadas
                </h3>
              </div>
            </div>
          }
        >
          <div className="p-4 space-x-4 flex justify-between">
            <div className="flex-grow">
              <h4 className="font-semibold text-light">Ejercicio Ciudadano</h4>
              <p className="text-4xl font-bold text-white ">
                {totalHoursBySkill.CITIZEN_EXERCISE.toFixed()}
              </p>
              <p className="text-base  text-black dark:text-blue-200">Horas academicas</p>
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold text-light">Emprendimiento</h4>
              <p className="text-4xl font-bold text-white ">
                {totalHoursBySkill.ENTREPRENEURSHIP.toFixed()}
              </p>
              <p className="text-base  text-black dark:text-blue-200">Horas academicas</p>
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold text-light">Gerencia de sí mismo</h4>
              <p className="text-4xl font-bold text-white ">
                {totalHoursBySkill.SELF_MANAGEMENT.toFixed()}
              </p>
              <p className="text-base  text-black dark:text-blue-200">Horas academicas</p>
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold text-light">Liderazgo</h4>
              <p className="text-4xl font-bold text-white ">
                {totalHoursBySkill.LEADERSHIP.toFixed()}
              </p>
              <p className="text-base  text-black dark:text-blue-200">Horas academicas</p>
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold text-light">TIC</h4>
              <p className="text-4xl font-bold text-white ">{totalHoursBySkill.ICT.toFixed()}</p>
              <p className="text-base  text-black dark:text-blue-200">Horas academicas</p>
            </div>
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
      <div className="flex gap-4 px-4 items-center">
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
                <p className="text-4xl font-bold">{totalHours}</p>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Horas de voluntariado realizadas
                </h3>
              </div>
            </div>
          }
        ></AccordionItem>
      </Accordion>
      <div className="flex gap-4 px-4 items-center">
        <div className="w-14 h-14 text-red-600">{chatIcon()}</div>
        <h3 className="col-span-full text-3xl font-semibold text-gray-900 dark:text-white">
          Componente Ingles
        </h3>
      </div>
      <Accordion variant="splitted">
        <AccordionItem
          key="2"
          aria-label="Competencia de ingles"
          className="group-[.is-splitted]:p-0 p-0 w-full"
          classNames={{
            content: 'bg-red-100  rounded-b-lg',
            base: '!bg-red-500',
            title: 'text-light text-xl font-semibold leading-none tracking-tight',
            subtitle: 'text-red-100',
            indicator: 'text-white text-center pr-4',
          }}
          title={
            <div className="flex-col space-y-1.5  flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <p className="text-4xl font-bold">{totalHours}</p>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Horas academicas clubs conversacionales de realizadas
                </h3>
              </div>
            </div>
          }
        ></AccordionItem>
      </Accordion>
    </>
  );
};

export default PublicAccordion;
