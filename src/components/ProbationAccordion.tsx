'use client';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { ScholarWithAllData } from './EditScholarForm';

interface ProbationAccordionProps {
  scholarInProbation: ScholarWithAllData;
}

const ProbationAccordion: React.FC<ProbationAccordionProps> = ({ scholarInProbation }) => {
  console.log(scholarInProbation);
  return (
    <Accordion variant="splitted">
      {scholarInProbation.program_information.probation.map((probationInfo, index) => {
        return (
          <AccordionItem key={index} aria-label={'Poradsfsd'} title={'Poradsfsd'}>
            {JSON.stringify(probationInfo)}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ProbationAccordion;
