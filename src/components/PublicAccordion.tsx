'use client';
import {
  parseChatLevelFromDatabase,
  parseKindOfVolunteerFromDatabase,
  parseSkillFromDatabase,
} from '@/lib/utils2';
import { HandRaisedIcon } from '@heroicons/react/24/outline';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Level, Skill } from '@prisma/client';
import Link from 'next/link';
import { chatIcon } from 'public/svgs/svgs';

const formatThousands = (n: number | string) => {
  const num = Number(n) || 0;
  if (num >= 1000) {
    const v = num / 1000;
    return v % 1 === 0 ? `${v}k` : `${v.toFixed(1)}k`;
  }
  return String(num);
};

interface WorkshopAccordionProps {
  workshopInfo: {
    workshopTotalHours: number;
    totalHoursBySkill: { category: string; totalHours: number }[];
  };
  activityCount?: number;
}
interface ChatAccordionProps {
  chatInfo: {
    chatTotalHours: number;
    chatTotalHoursByLevel: { category: string; totalHours: number }[];
  };
  activityCount?: number;
}

interface VolunteerAccordionProps {
  volunteerInfo: {
    totalActivities: number;
    totalHours: number;
    breakdownByKind: { kind: string; count: number; totalHours: number }[];
  };
}

const WorkshopsAccordion: React.FC<WorkshopAccordionProps & { activityCount?: number }> = ({ workshopInfo, activityCount }) => {
  const { workshopTotalHours, totalHoursBySkill } = workshopInfo;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 px-2 items-center">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl shadow-lg">
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
            className="text-white h-8 w-8 md:w-10 md:h-10"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
          Actividades formativas
        </h3>
      </div>
      <Accordion variant="splitted" className="p-0">
        <AccordionItem
          key="1"
          aria-label="Actividades académicas"
          className="group-[.is-splitted]:p-0 p-0 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          classNames={{
            content: 'bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 rounded-b-2xl pb-0',
            base: '!bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 !rounded-2xl border border-blue-500/20',
            title: 'text-white text-xl font-semibold leading-tight',
            indicator: 'opacity-100 text-white text-center pr-4',
          }}
          title={
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-3 py-1">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <p className="text-3xl md:text-5xl font-bold text-white">{activityCount ?? totalHoursBySkill.length}</p>
                </div>
                <h3 className="text-base md:text-xl font-semibold leading-tight">
                  Actividades realizadas
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-white">Total de horas:</span>
                <span className="text-lg font-bold text-white">{workshopTotalHours}</span>
              </div>
            </div>
          }
        >
          <div className="p-6 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {totalHoursBySkill.map((skill, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <h4 className="font-semibold text-white text-sm mb-2">
                  {parseSkillFromDatabase(skill.category as Skill)}
                </h4>
                <p className="text-4xl font-bold text-white mb-1">{skill.totalHours}</p>
                <p className="text-sm text-white/90">Horas académicas</p>
              </div>
            ))}
          </div>
          <Link
            replace={false}
            href="?actividad=actividadesFormativas"
            className="group text-center p-4 block rounded-b-2xl text-base font-semibold text-white bg-blue-600/50 hover:bg-blue-600 transition-all duration-300 border-t border-white/10"
          >
            <span className="flex items-center justify-center gap-2">
              Ver actividades realizadas
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
const ChatsAccordion: React.FC<ChatAccordionProps & { activityCount?: number }> = ({ chatInfo, activityCount }) => {
  const { chatTotalHours, chatTotalHoursByLevel } = chatInfo;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 px-2 items-center">
        <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-2xl shadow-lg">
          <div className="h-8 w-8 md:w-10 md:h-10 text-white">{chatIcon()}</div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
          Chat clubs de inglés
        </h3>
      </div>
      <Accordion variant="splitted" className="p-0">
        <AccordionItem
          key="1"
          aria-label="Inglés"
          className="group-[.is-splitted]:p-0 p-0 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          classNames={{
            content: 'bg-gradient-to-br from-red-400 to-red-500 dark:from-red-500 dark:to-red-600 rounded-b-2xl pb-0',
            base: '!bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 !rounded-2xl border border-red-500/20',
            title: 'text-white text-xl font-semibold leading-tight',
            indicator: 'opacity-100 text-white text-center pr-4',
          }}
          title={
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-3 py-1">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <p className="text-3xl md:text-5xl font-bold text-white">{activityCount ?? chatTotalHoursByLevel.length}</p>
                </div>
                <h3 className="text-base md:text-xl font-semibold leading-tight">
                  Actividades realizadas
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-white">Total de horas:</span>
                <span className="text-lg font-bold text-white">{chatTotalHours}</span>
              </div>
            </div>
          }
        >
          <div className="p-6 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {chatTotalHoursByLevel.map((level, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <h4 className="font-semibold text-white text-sm mb-2">
                  {parseChatLevelFromDatabase(level.category as Level)}
                </h4>
                <p className="text-4xl font-bold text-white mb-1">{level.totalHours}</p>
                <p className="text-sm text-white/90">Horas académicas</p>
              </div>
            ))}
          </div>
          <Link
            replace={false}
            href="?actividad=chats"
            className="group text-center p-4 block rounded-b-2xl text-base font-semibold text-white bg-red-600/50 hover:bg-red-600 transition-all duration-300 border-t border-white/10"
          >
            <span className="flex items-center justify-center gap-2">
              Ver actividades realizadas
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const VolunteerAccordion: React.FC<VolunteerAccordionProps> = ({ volunteerInfo }) => {
  const { totalActivities, totalHours, breakdownByKind } = volunteerInfo;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 px-2 items-center">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-2xl shadow-lg">
          <HandRaisedIcon className="h-8 w-8 md:w-10 md:h-10 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-600 bg-clip-text text-transparent">
          Voluntariado
        </h3>
      </div>
      <Accordion variant="splitted" className="p-0">
        <AccordionItem
          key="1"
          aria-label="Voluntariado"
          className="group-[.is-splitted]:p-0 p-0 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          classNames={{
            content: 'bg-gradient-to-br from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600 rounded-b-2xl pb-0',
            base: '!bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 !rounded-2xl border border-emerald-500/20',
            title: 'text-white text-xl font-semibold leading-tight',
            indicator: 'opacity-100 text-white text-center pr-4',
          }}
          title={
            <div className="px-3 py-1 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <p className="text-3xl md:text-5xl font-bold">{totalActivities}</p>
                </div>
                <h3 className="text-base md:text-xl font-semibold leading-tight">
                  Voluntariados completados
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-emerald-100">Total de horas:</span>
                <span className="text-lg font-bold">{totalHours}</span>
              </div>
            </div>
          }
        >
          <div className="p-6 gap-6 grid grid-cols-1 md:grid-cols-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h4 className="font-semibold text-white text-sm mb-2">Actividades registradas</h4>
              <p className="text-4xl font-bold text-white mb-1">{totalActivities}</p>
              <p className="text-sm text-white/90">Voluntariados</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h4 className="font-semibold text-white text-sm mb-2">Horas acumuladas</h4>
              <p className="text-4xl font-bold text-white mb-1">{totalHours}</p>
              <p className="text-sm text-white/90">Horas totales</p>
            </div>
          </div>
          {breakdownByKind.length > 0 && (
            <div className="px-6 pb-6 space-y-3">
              <div className="border-t border-white/20 pt-4">
                <h5 className="text-sm font-semibold text-white mb-3">Desglose por tipo</h5>
                <div className="space-y-2">
                  {breakdownByKind.map(({ kind, count, totalHours }) => (
                    <div key={kind} className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                      <span className="font-medium text-white text-sm">
                        {parseKindOfVolunteerFromDatabase(kind)}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-md font-semibold text-white">
                          {count} {count === 1 ? 'actividad' : 'actividades'}
                        </span>
                        <span className="text-sm font-bold text-white">
                          {totalHours} h
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <Link
            replace={false}
            href="?actividad=voluntariado"
            className="group text-center p-4 block rounded-b-2xl text-base font-semibold text-white bg-emerald-600/50 hover:bg-emerald-600 transition-all duration-300 border-t border-white/10"
          >
            <span className="flex items-center justify-center gap-2">
              Ver voluntariados realizados
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
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
  volunteerInfo: {
    totalActivities: number;
    totalHours: number;
    breakdownByKind: { kind: string; count: number; totalHours: number }[];
  };
  activity: 'actividadesFormativas' | 'chats' | 'voluntariado' | undefined;
  workshopActivityCount?: number;
  chatActivityCount?: number;
}

const PublicAccordion: React.FC<PublicAccordionProps> = ({
  workshopInfo,
  chatInfo,
  volunteerInfo,
  activity,
  workshopActivityCount,
  chatActivityCount,
}) => {
  if (activity === 'actividadesFormativas') {
    return <WorkshopsAccordion workshopInfo={workshopInfo} activityCount={workshopActivityCount} />;
  } else if (activity === 'chats') {
    return <ChatsAccordion chatInfo={chatInfo} activityCount={chatActivityCount} />;
  } else if (activity === 'voluntariado') {
    return <VolunteerAccordion volunteerInfo={volunteerInfo} />;
  } else {
    return (
      <>
        <WorkshopsAccordion workshopInfo={workshopInfo} activityCount={workshopActivityCount} />
        <ChatsAccordion chatInfo={chatInfo} activityCount={chatActivityCount} />
        <VolunteerAccordion volunteerInfo={volunteerInfo} />
      </>
    );
  }
};

export default PublicAccordion;
