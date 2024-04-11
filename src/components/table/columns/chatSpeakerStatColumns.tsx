'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { WorkshopSpeaker } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Cell, Column } from 'react-table';

const chatSpeakerStatsColumns: Column<WorkshopSpeaker>[] = [
  {
    Header: 'Nombre',
    accessor: (row: WorkshopSpeaker) => `${row.first_names} ${row.last_names} ${row.job_company}`,
    Cell: ({ cell }: { cell: Cell<WorkshopSpeaker> }) => (
      <Link
        href={`facilitadores/${cell.row.original.id ? `${cell.row.original.id}` : ''}`}
        className="flex items-center"
      >
        <div className="flex-shrink-0 w-8 h-8">
          <Image
            className="w-full h-full rounded-full"
            src={cell.row.original.image ? cell.row.original.image : defailProfilePic}
            alt="Foto de perfil"
          />
        </div>
        <div className="ml-4 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {cell.row.original.first_names} {cell.row.original.last_names}
          </span>
          <span className="block text-xs font-medium text-gray-400 dark:text-slate-400">
            {cell.row.original.job_company}
          </span>
        </div>
      </Link>
    ),
  },
  {
    Header: 'theoryPracticeMix',
    accessor: 'totalScores.speaker_theory_practice_mix',
  },
  {
    Header: 'theoryPracticeMix',
    accessor: 'totalScores.speaker_knowledge_of_activity',
  },
  {
    Header: 'scholarToParticipate',
    accessor: 'totalScores.speaker_foment_scholar_to_participate',
  },
  {
    Header: 'knowledgeTransmition',
    accessor: 'totalScores.speaker_knowledge_transmition',
  },
  {
    Header: 'Sumatoria',
    accessor: 'totalPoints',
  },
  {
    Header: 'Total de respuestas',
    accessor: 'totalResponses',
  },
  {
    Header: 'Promedio de respuestas',
    accessor: 'finalNumber',
  },
  {
    Header: 'Promedio final',
    accessor: 'finalAverage',
  },
];

export default chatSpeakerStatsColumns;
