'use client';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import { ScholarStatus } from '@prisma/client';
import BasicModal from './BasicModal';
import ProbationAccordion from './probation/ProbationAcordionInfo';

type ScholarStatusIndicatorProps = {
  scholarData: {
    id: string;
    status: ScholarStatus;
    firstName: string;
    surNames: string;
    dni: string;
  }
  isAdmin: boolean;
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

const ScholarStatusIndicator: React.FC<ScholarStatusIndicatorProps> = ({ scholarData, isAdmin, }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const config = statusConfig[scholarData.status];
  if (!config) return null;
  return (
    <>
      <Button
        size="sm"
        radius="full"
        startContent={<span className={`w-2 h-2 mr-1 bg-${config.color}-500 rounded-full`} />}
        onPress={onOpen}
        className={` bg-${config.color}-100 text-${config.color}-800 text-base font-medium  dark:bg-${config.color}-900 dark:text-${config.color}-300 animate-pulse`}
      >
        {config.text}
      </Button>
      <BasicModal
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
        title="Historial de casos de probatorio"
        Content={() => <ProbationAccordion isAdmin={isAdmin} scholarData={scholarData} />}
        isButtonDisabled={false}
        onConfirm={() => null}
        confirmText=""
      />
    </>
  );
};

export default ScholarStatusIndicator;
