import LineChart from '@/components/charts/LineChart';
import Link from 'next/link';
import React from 'react';

type CardProps = {
  stat: number;
  text: string;
  bg: string;
  Icon: React.FC;
  data: Array<{ label: string; value: number }>;
  activity: 'talleres' | 'chats' | 'voluntariado';
};

const CardWithStat = ({ stat, text, bg, Icon, data, activity }: CardProps) => {
  return (
    <Link
      href={`?actividad=${activity}`}
      className={`flex flex-col bg-gradient-to-br h-full rounded-lg relative overflow-hidden w-full shadow-lg z-10 ${bg} p-2`}
    >
      <div className="flex flex-row justify-between z-10 min-w-fit items-start">
        <div className="text-white ">
          <p className="leading-tight text-5xl font-bold">{stat}</p>
          <p className="leading-snug text-base flex-grow font-semibold">{text}</p>
        </div>
      </div>
      <div className="absolute translate-x-72 z-20  p-0.5 w-1/4">
        <LineChart data={data} />
      </div>
      <div className="absolute opacity-20 text-[190px] -z-10 w-28 ">
        <Icon />
      </div>
    </Link>
  );
};

export default CardWithStat;
