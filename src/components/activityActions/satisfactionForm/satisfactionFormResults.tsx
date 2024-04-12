'use client';
import { Button, Tooltip, useDisclosure } from '@nextui-org/react';
import BasicModal from '../../BasicModal';
import { PieChartComponent } from '../../charts';
import {
  COLORS_BASED_ON_RESPONSE,
  SatisfactionFormChartData,
  getSatisfactionFormTitleAndQuestion,
} from './utils';

interface SatisfactionFormResultsProps {
  satisfactionFormChartData: SatisfactionFormChartData[];
}

const SatisfactionFormResults: React.FC<SatisfactionFormResultsProps> = ({
  satisfactionFormChartData,
}) => {
  const attendanceCheckedModal = useDisclosure();
  return (
    <>
      <Button className="w-full" onPress={attendanceCheckedModal.onOpen}>
        Resultados de la encuesta
      </Button>
      <BasicModal
        size="full"
        scroll={true}
        isOpen={attendanceCheckedModal.isOpen}
        onOpenChange={attendanceCheckedModal.onOpenChange}
        isButtonDisabled={false}
        title="Resultados de la encuesta de valoración"
        Content={() => (
          <div className="flex flex-col">
            <div>
              <div className="flex flex-row gap-4 text-sm">
                <h3>Leyenda</h3>
                {Object.entries(COLORS_BASED_ON_RESPONSE).map(([label, color]) => (
                  <div className="flex flex-row gap-2 items-center">
                    <div className={`w-4 h-4 bg-[${color}] rounded-full`}></div>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 p-4 ">
                {satisfactionFormChartData.map((response, index) => {
                  const title = getSatisfactionFormTitleAndQuestion(response.name);
                  return (
                    <div key={index}>
                      <Tooltip content={title.question}>
                        <h3 className="truncate font-semibold text-center text-sm">
                          {title.title}
                        </h3>
                      </Tooltip>
                      <PieChartComponent data={response.value} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        onConfirm={() => {}}
        confirmText="Cerrar"
      />
    </>
  );
};

export default SatisfactionFormResults;
