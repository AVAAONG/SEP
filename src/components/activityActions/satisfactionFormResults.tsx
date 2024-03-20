'use client';
import {
  parseSatisfactionFormResponsesFromDatabase,
  parseSatisfactionFormTitlesFromDatabase,
} from '@/lib/utils2';
import { Button, Tooltip, useDisclosure } from '@nextui-org/react';
import { WorkshopSafisfactionForm } from '@prisma/client';
import BasicModal from '../BasicModal';
import { PieChartComponent } from '../charts';

type FormResponse = {
  [key: string]: 'Malo' | 'Deficiente' | 'Regular' | 'Bueno' | 'Excelente' | 'No definido';
};

type Count = {
  [key in 'Malo' | 'Deficiente' | 'Regular' | 'Bueno' | 'Excelente' | 'No definido']?: number;
};

type Result = {
  name: string;
  value: { label: string; value: number }[];
};

const transformFormResponses = (formResponses: FormResponse[]): Result[] => {
  const keys = [
    'activity_organization',
    'activity_number_of_participants',
    'activity_lenght',
    'activity_relevance_for_scholar',
    'speaker_theory_practice_mix',
    'speaker_knowledge_of_activity',
    'speaker_foment_scholar_to_participate',
    'speaker_knowledge_transmition',
    'content_match_necesities',
    'content_knowledge_adquisition',
    'content_knowledge_expansion',
    'content_personal_development',
    'general_satisfaction',
  ];

  return keys.map((key) => {
    const valueCounts = formResponses.reduce<Count>((counts, response) => {
      const value = parseSatisfactionFormResponsesFromDatabase(response[key]);
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});

    const value = Object.entries(valueCounts).map(([label, count]) => ({
      label,
      value: count as number,
    }));

    return { name: key, value };
  });
};

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
          <div className="grid grid-cols-4 gap-4 p-4 ">
            {responsesForEachKey.map((response, index) => {
              const title = parseSatisfactionFormTitlesFromDatabase(response.name);
              return (
                <div key={index}>
                  <Tooltip content={title.question}>
                    <h3 className="truncate font-semibold text-center text-sm">{title.title}</h3>
                  </Tooltip>
                  <PieChartComponent data={response.value} />
                </div>
              );
            })}
          </div>
        )}
        onConfirm={() => {}}
        confirmText="Cerrar"
      />
    </>
  );
};

export default SatisfactionFormResults;
