import DateSelector from '@/components/commons/datePicker';
import Table from '@/components/table/Table';
import chatSpeakerStatsColumns from '@/components/table/columns/chatSpeakerStatColumns';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import { getChatSpeakerForStats } from '@/lib/db/utils/speaker';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
function calculateSpeakerMetrics(chats) {
  return chats.flatMap((chat) => {
    // Early return if no relevant attendance data
    if (!chat.scholar_attendance || chat.scholar_attendance.length === 0) return [];

    // Calculate scores and stats within the chat scope
    const speakerStats = chat.scholar_attendance.reduce(
      (acc, scholarAttendance) => {
        if (!scholarAttendance.ChatSafisfactionForm) return acc;

        const scores = getChatSatisfactionScores(scholarAttendance.ChatSafisfactionForm);
        const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

        return {
          totalScores: sumScores(acc.totalScores, scores),
          totalPoints: acc.totalPoints + totalScore,
          totalResponses: acc.totalResponses + 1,
          finalNumber: totalScore / 4,
        };
      },
      {
        totalScores: {
          speaker_theory_practice_mix: 0,
          speaker_knowledge_of_activity: 0,
          speaker_foment_scholar_to_participate: 0,
          speaker_knowledge_transmition: 0,
        },
        totalPoints: 0,
        totalResponses: 0,
        finalNumber: 0,
      }
    );

    // Map speaker data with calculated stats
    return chat.speaker.map((speaker) => ({
      id: speaker.id,
      ...speakerStats,
      finalAverage:
        typeof speakerStats.finalNumber === 'number' &&
        typeof speakerStats.totalResponses === 'number' &&
        speakerStats.totalResponses !== 0
          ? speakerStats.finalNumber / speakerStats.totalResponses
          : 0,
      first_names: speaker.first_names,
      last_names: speaker.last_names,
      job_company: speaker.job_company,
      phone_number: speaker.phone_number,
      email: speaker.email,
    }));
  });
}

function aggregateSpeakerMetrics(speakers) {
  return speakers.reduce((unique, speaker) => {
    const existingIndex = unique.findIndex((s) => s.id === speaker.id);

    if (existingIndex !== -1) {
      const totalResponses = unique[existingIndex].totalResponses + speaker.totalResponses;
      unique[existingIndex] = {
        ...unique[existingIndex],
        totalScores: sumScores(unique[existingIndex].totalScores, speaker.totalScores),
        totalPoints: unique[existingIndex].totalPoints + speaker.totalPoints,
        totalResponses: totalResponses,
        finalNumber: unique[existingIndex].finalNumber + speaker.finalNumber,
        finalAverage:
          totalResponses > 0
            ? (unique[existingIndex].finalNumber + speaker.finalNumber) / totalResponses
            : 0,
      };
    } else {
      unique.push(speaker);
    }

    return unique;
  }, []);
}

// Helper functions
function getChatSatisfactionScores(form) {
  return {
    speaker_theory_practice_mix: form.speaker_theory_practice_mix || 0,
    speaker_knowledge_of_activity: form.speaker_knowledge_of_activity || 0,
    speaker_foment_scholar_to_participate: form.speaker_foment_scholar_to_participate || 0,
    speaker_knowledge_transmition: form.speaker_knowledge_transmition || 0,
  };
}

function sumScores(scores1, scores2) {
  return {
    speaker_theory_practice_mix:
      scores1.speaker_theory_practice_mix + scores2.speaker_theory_practice_mix,
    speaker_knowledge_of_activity:
      scores1.speaker_knowledge_of_activity + scores2.speaker_knowledge_of_activity,
    speaker_foment_scholar_to_participate:
      scores1.speaker_foment_scholar_to_participate + scores2.speaker_foment_scholar_to_participate,
    speaker_knowledge_transmition:
      scores1.speaker_knowledge_transmition + scores2.speaker_knowledge_transmition,
  };
}

function findBestFacilitator(speakers) {
  return speakers.reduce((bestSpeaker, currentSpeaker) => {
    return bestSpeaker.totalPoints > currentSpeaker.totalPoints ? bestSpeaker : currentSpeaker;
  });
}

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
  const bestSpeaker = findBestFacilitator(aggregatedSpeakers);
  return (
    <div className="flex flex-col items-center w-full gap-6">
      <DateSelector />
      {/* <div className="px-4 flex items-center justify-center  flex-col md:flex-row gap-4 w-full">
        <div className="w-full relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-primary-light rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-14 text-sm font-medium text-gray-500 truncate">
              Total de facilitadores
            </p>
          </dt>
          <dd className="ml-14 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">{chatSpeakers?.length}</p>
          </dd>
        </div>
        <div className="w-full relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-rose-500 rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-14 text-sm font-medium text-gray-500 truncate">
              Total de facilitadores femeninos
            </p>
          </dt>
          <dd className="ml-14 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">{chatSpeakerWomanCount}</p>
          </dd>
        </div>
        <div className="w-full relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-blue-500 rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-14 text-sm font-medium text-gray-500 truncate">
              Total de facilitadores masculinos
            </p>
          </dt>
          <dd className="ml-14 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">{chatSpeakerManCount}</p>
          </dd>
        </div>
      </div> */}
      <div className="w-full h-fit">
        <Table
          tableColumns={chatSpeakerStatsColumns}
          tableData={aggregatedSpeakers}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
