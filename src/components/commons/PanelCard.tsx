import Link from 'next/link';

const colorVariants = {
  workshop: {
    iconColor: 'bg-gradient-to-br from-blue-700  to-indigo-900',
    titleColor: 'text-blue-700',
    subtitleColor: 'text-blue-600 hover:text-blue-500',
    linkBackground: 'bg-blue-50  dark:bg-blue-950  hover:bg-blue-100 dark:hover:bg-blue-900',
  },
  chat: {
    iconColor: 'bg-gradient-to-r from-red-500 to-red-900',
    titleColor: 'text-red-500',
    subtitleColor: 'text-red-600 hover:text-red-500',
    linkBackground: 'bg-red-50  dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900',
  },
  volunteer: {
    iconColor: 'bg-gradient-to-r from-green-500 to-green-900',
    titleColor: 'text-green-500',
    subtitleColor: 'text-green-600 hover:text-green-500',
    linkBackground: 'bg-green-50 dark:bg-green-950 hover:bg-green-100 dark:hover:bg-green-900',
  },
  scholar: {
    iconColor: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
    titleColor: 'text-yellow-500',
    subtitleColor: 'text-yellow-600 hover:text-yellow-500',
    linkBackground: 'bg-yellow-50 dark:bg-yellow-950 hover:bg-yellow-100 dark:hover:bg-yellow-900',
  },
};

export interface PanelCardProps {
  title: string;
  subtitle: string;
  data: number;
  link: string;
  icon: JSX.Element;
  kind: 'workshop' | 'chat' | 'volunteer' | 'scholar';
}

const PanelCard: React.FC<PanelCardProps> = ({ title, subtitle, data, link, icon, kind }) => {
  return (
    <div className="w-full relative border-1 border-gray-300 dark:border-secondary-dark bg-white dark:bg-black pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div className={`absolute ${colorVariants[kind]['iconColor']} rounded-md p-3`}>
          <div className="w-6 h-6 text-white">{icon}</div>
        </div>
        <p className={`ml-16 font-medium ${colorVariants[kind]['titleColor']}  truncate`}>
          {title}
        </p>
      </dt>
      <dd className="ml-16 pb-3 flex items-baseline">
        <p className="text-3xl font-semibold ">{data}</p>
        <div
          className={`absolute bottom-0 inset-x-0 ${colorVariants[kind]['linkBackground']} dark:bg-black px-4 py-3 `}
        >
          <Link
            color="foreground"
            href={link}
            className={`block font-medium text-sm  ${colorVariants[kind]['subtitleColor']} w-full text-left truncate`}
          >
            {subtitle}
          </Link>
        </div>
      </dd>
    </div>
  );
};

export default PanelCard;
