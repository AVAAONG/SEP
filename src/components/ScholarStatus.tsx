'use client';
import { Button, useDisclosure } from '@nextui-org/react';
import BasicModal from './BasicModal';
import ProbationAccordion from './ProbationAccordion';

type ScholarStatusProps = {
  scholar: any;
};
const statusConfig = {
  NORMAL: {
    color: 'green',
    text: 'Regular',
  },
  PROBATION_I: {
    color: 'yellow',
    text: 'Probatorio I',
  },
  PROBATION_II: {
    color: 'red',
    text: 'Probatorio II',
  },
};

const ScholarStatus: React.FC<ScholarStatusProps> = ({ scholar }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const status = scholar.program_information.scholar_status;
  const config = statusConfig[status];

  if (!config) return null;
  return (
    <>
      <Button
        onPress={onOpen}
        className={`inline-flex items-center bg-${config.color}-100 text-${config.color}-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-${config.color}-900 dark:text-${config.color}-300 animate-pulse`}
      >
        <span className={`w-2 h-2 mr-1 bg-${config.color}-500 rounded-full`}></span>
        {config.text}
      </Button>
      <BasicModal
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
        title="Casos de probatorio"
        Content={() => <ProbationAccordion scholarInProbation={scholar} />}
        isButtonDisabled={false}
        onConfirm={async () => {}}
        confirmText=""
      />
    </>
  );
};

export default ScholarStatus;
