'use client';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { ScholarWithAllData } from './EditScholarForm';

interface ProbationAccordionProps {
  scholarInProbation: ScholarWithAllData;
}

const probationKeysMap = {
  cva: 'CVA',
  chats: 'Chat clubs de inglés',
  average: 'Promedio',
  workshops: 'Actividades formativas',
  year_in_career: 'Año en la carrera',
  external_volunteering_hours: 'Horas de voluntariado externo',
  internal_volunteering_hours: 'Horas de voluntariado interno',
}

const ProbationAccordion: React.FC<ProbationAccordionProps> = ({ scholarInProbation }) => {
  return (
    <Accordion variant="splitted">
      {scholarInProbation.program_information.probation.map((probationInfo, index) => {
        const title = probationInfo.kind_of_probation === 'PROBATION_II' ? 'Probatorio II' : 'Probatorio I';
        const starDate = new Date(probationInfo.starting_date).toLocaleDateString('es-ES', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })

        return (
          <AccordionItem key={index}
            aria-label={"sdf"}
            className="group-[.is-splitted]:p-0 p-0 w-full"
            classNames={{
              content: `${probationInfo.kind_of_probation === "PROBATION_I" ? '!bg-yellow-300' : '!bg-rose-300'} rounded-b-lg pb-0`,
              base: `${probationInfo.kind_of_probation === "PROBATION_I" ? '!bg-yellow-500' : '!bg-rose-500'}`,
              title: 'text-light dark:text-secondary-dark text-xl font-semibold leading-none tracking-tight',
              indicator: '-mt-2 opacity-100 text-white text-center pr-4',
            }}
            title={
              <div className="flex-col gap-1.5 flex px-2">
                <h3 className="text-base md:text-2xl font-semibold leading-none tracking-tight">
                  {title} - ({starDate} {probationInfo.ending_date && (
                    - new Date(probationInfo.ending_date).toLocaleDateString('es-ES', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  )})
                </h3>
              </div>
            }>
            <div className='flex flex-col p-4 gap-8'>
              <div className='flex gap-10'>
                <div>
                  <h3 className='text-base md:text-lg font-semibold leading-none tracking-tight'>
                    Fecha de inicio de probatorio
                  </h3>
                  <p>
                    <CalendarDaysIcon className='inline w-5 h-5' />  {starDate}
                  </p>
                </div>
                <div>
                  <h3 className='text-base md:text-lg font-semibold leading-none tracking-tight'>
                    Fecha de la proxima evaluación
                  </h3>
                  <p>
                    <CalendarDaysIcon className='inline w-5 h-5' />   {new Date(probationInfo.next_meeting).toLocaleDateString('es-ES', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {probationInfo.ending_date && (
                <>
                  <h3 className='text-base md:text-lg font-semibold leading-none tracking-tight'>
                    Fecha de finalización de probatorio
                  </h3>
                  <p>
                    <CalendarDaysIcon className='inline w-5 h-5' />  {new Date(probationInfo.ending_date).toLocaleDateString('es-ES', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </>
              )}

              <div>
                <h3 className='text-base md:text-lg font-semibold leading-none tracking-tight'>
                  Realizado hasta el momento de la evaluación
                </h3>
                <div className='flex gap-2 divide-x-4 divide-yellow-800 mt-2 '>
                  {Object.keys(probationInfo.done_at_the_moment).map((key, index) => {
                    return (
                      <div key={index} className='px-2'>
                        <h4 className='text-base font-semibold leading-none tracking-tight'>
                          {probationKeysMap[key as keyof typeof probationKeysMap]}
                        </h4>
                        <p>
                          {probationInfo.done_at_the_moment[key]}
                        </p>
                      </div>
                    );
                  }
                  )}
                </div>

              </div>
              <div>
                <h3 className='text-base md:text-lg font-semibold leading-none tracking-tight'>
                  Acuerdo de compromisos
                </h3>
                <div className='flex gap-2 divide-x-4 divide-yellow-800 mt-2 '>
                  {Object.keys(probationInfo.agreement).map((key, index) => {
                    return (
                      <div key={index} className='px-2'>
                        <h4 className='text-base font-semibold leading-none tracking-tight'>
                          {probationKeysMap[key as keyof typeof probationKeysMap]}
                        </h4>
                        <p>
                          {probationInfo.agreement[key]}
                        </p>
                      </div>
                    );
                  }
                  )}
                </div>
              </div>
              {/* <div>
                <h3 className='text-base md:text-lg font-semibold leading-none tracking-tight'>
                  Rason de entrada a probatorio
                </h3>
                <p>
                  {probationInfo.probation_reason}
                </p>
              </div> */}
              <div>
                <h3 className='text-base md:text-lg font-semibold leading-none tracking-tight'>
                  Observaciones
                </h3>
                <p>
                  {probationInfo.observations}
                </p>
              </div>

            </div>
          </AccordionItem>
        );
      })}
    </Accordion >
  );
};

export default ProbationAccordion;
