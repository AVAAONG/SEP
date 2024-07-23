import { getProbationInfoByScholar } from '@/lib/db/utils/probation';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import React from 'react';
import ProbationActionButtons from './ProbationActionButtons';
import { formatDate, renderDateInfo, renderInfoSection } from './commonComponents';

interface ProbationAccordionProps {
  scholarId: string;
  isAdmin: boolean;
}

const ProbationAccordion: React.FC<ProbationAccordionProps> = async ({ scholarId, isAdmin }) => {
  const probations = await getProbationInfoByScholar(scholarId);
  return (
    <Accordion variant="splitted">
      {probations.map((probationInfo, index) => {
        const isProbationI = probationInfo.kind_of_probation === 'PROBATION_I';
        const title = isProbationI ? 'Probatorio I' : 'Probatorio II';
        const bgColor = isProbationI
          ? '!bg-yellow-300 !dark:bg-yellow-800'
          : '!bg-rose-300 !dark:bg-rose-800';
        const headerBgColor = isProbationI
          ? '!bg-yellow-500 !dark:bg-yellow-700'
          : '!bg-rose-500 !dark:bg-rose-700';
        return (
          <AccordionItem
            key={index}
            aria-label={`Probation ${index + 1}`}
            className="group-[.is-splitted]:p-0 p-0 w-full"
            classNames={{
              content: `${bgColor} rounded-b-lg pb-0`,
              base: headerBgColor,
              title:
                'text-light dark:text-secondary-dark text-xl font-semibold leading-none tracking-tight',
              indicator: '-mt-2 opacity-100 text-white text-center pr-4',
            }}
            title={
              <div className="flex-col gap-1.5 flex px-2">
                <h3 className="text-base md:text-2xl font-semibold leading-none tracking-tight">
                  {title} - ({formatDate(probationInfo.starting_date)}
                  {probationInfo.ending_date && ` - ${formatDate(probationInfo.ending_date)}`})
                </h3>
              </div>
            }
          >
            <div className="flex flex-col p-4 gap-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                {renderDateInfo('Fecha de inicio de probatorio', probationInfo.starting_date)}
                {renderDateInfo('Fecha de la proxima evaluación', probationInfo.next_meeting)}
              </div>

              {probationInfo.ending_date &&
                renderDateInfo('Fecha de finalización de probatorio', probationInfo.ending_date)}

              {renderInfoSection(
                'Realizado hasta el momento de la evaluación',
                probationInfo.done_at_the_moment
              )}
              {renderInfoSection('Acuerdo de cumplimiento', probationInfo.agreement)}

              <div>
                <h3 className="text-base md:text-lg font-semibold leading-none tracking-tight">
                  Observaciones
                </h3>
                <p className="whitespace-pre-wrap">{probationInfo.observations}</p>
              </div>

              {isAdmin && (
                <div className="flex gap-4 justify-end">
                  <ProbationActionButtons />
                </div>
              )}
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ProbationAccordion;
