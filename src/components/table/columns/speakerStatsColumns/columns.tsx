'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import Image from 'next/image';
import Link from 'next/link';
import { Cell, Column } from 'react-table';

interface ChatSpeakerStatsColumnsI {
  id: string;
  first_names: string;
  last_names: string;
  job_company: string;
  image: string;
  totalScores: {
    speaker_theory_practice_mix: number;
    speaker_knowledge_of_activity: number;
    speaker_foment_scholar_to_participate: number;
    speaker_knowledge_transmition: number;
  };
  totalPoints: number;
  totalResponses: number;
  finalNumber: number;
  finalAverage: number;
}

const chatSpeakerStatsColumns: Column<ChatSpeakerStatsColumnsI>[] = [
  {
    Header: 'Nombre',
    accessor: (row: ChatSpeakerStatsColumnsI) =>
      `${row.first_names} ${row.last_names} ${row.job_company}`,
    Cell: ({ cell }: { cell: Cell<ChatSpeakerStatsColumnsI> }) => (
      <Link
        href={`${cell.row.original.id ? `${cell.row.original.id}` : ''}`}
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
    Header: 'Materiales utilizados',
    accessor: (row) => row.totalScores.speaker_theory_practice_mix, // Corrected accessor
  },
  {
    Header: 'Conocimiento sobre el tema',
    accessor: (row) => row.totalScores.speaker_knowledge_of_activity, // Corrected accessor
  },
  {
    Header: 'Motiva a participar',
    accessor: (row) => row.totalScores.speaker_foment_scholar_to_participate, // Corrected accessor
  },
  {
    Header: 'Facililidad de transmisión de conocimientos',
    accessor: (row) => row.totalScores.speaker_knowledge_transmition, // Corrected accessor
  },
  // ..
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
