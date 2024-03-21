'use client';
import { Button, Tooltip, useDisclosure } from '@nextui-org/react';
import { WorkshopSafisfactionForm } from '@prisma/client';
import BasicModal from '../../BasicModal';
import { PieChartComponent } from '../../charts';
import { getSatisfactionFormTitleAndQuestion, transformFormResponses } from './utils';

interface SatisfactionFormResultsProps {
  formResponses: WorkshopSafisfactionForm[];
}

const SatisfactionFormResults: React.FC<SatisfactionFormResultsProps> = ({ formResponses }) => {
  const attendanceCheckedModal = useDisclosure();
  const responsesForEachKey = transformFormResponses(formResponses);
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
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-4 h-4 bg-[#23a217] rounded-full"></div>
                  <p>Excelente</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-4 h-4 bg-[#1d4ed8] rounded-full"></div>
                  <p>Bueno</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-4 h-4 bg-[#eab308] rounded-full"></div>
                  <p>Regular</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-4 h-4 bg-[#d97706] rounded-full"></div>
                  <p>Deficiente</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-4 h-4 bg-[#b91c1c] rounded-full"></div>
                  <p>Malo</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 p-4 ">
                {responsesForEachKey.map((response, index) => {
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
