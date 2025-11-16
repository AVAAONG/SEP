import DatePickerByEvaluationPeriod from '@/components/commons/DatePickerByEvaluationBlock';
import Table from '@/components/table/Table';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import chatSpeakerStatsColumns from '@/components/table/columns/speakerStatsColumns/columns';
import {
  aggregateSpeakerMetrics,
  calculateSpeakerMetrics,
} from '@/components/table/columns/speakerStatsColumns/formater';
import { getChatSpeakerForStats } from '@/lib/db/utils/speaker';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const rawChats = await getChatSpeakerForStats();
  const chats = (await filterActivitiesBySearchParams(
    rawChats,
    searchParams
  )) as ChatsWithAllData[];

  const speakers = calculateSpeakerMetrics(chats);
  const aggregatedSpeakers = aggregateSpeakerMetrics(speakers);
  return (
    <div className="flex flex-col items-center w-full gap-6 min-h-screen">
       <DatePickerByEvaluationPeriod />
      <div className="w-full h-fit">
        <Table
          tableColumns={chatSpeakerStatsColumns}
          tableData={aggregatedSpeakers}
          tableHeadersForSearch={[
            {
              label: 'Nombre',
              option: 'first_names',
            },
            {
              label: 'Apellido',
              option: 'last_names',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default page;
