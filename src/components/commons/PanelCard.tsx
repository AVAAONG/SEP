import Link from 'next/link';

const colorVariants = {
  workshop: {
    iconColor: 'bg-gradient-to-br from-blue-600 to-blue-700',
    titleColor: 'text-blue-700 dark:text-blue-400',
    subtitleColor: 'text-blue-600 dark:text-blue-400',
    linkBackground: 'bg-blue-50 dark:bg-blue-950',
  },
  chat: {
    iconColor: 'bg-gradient-to-br from-red-500 to-red-600',
    titleColor: 'text-red-600 dark:text-red-400',
    subtitleColor: 'text-red-600 dark:text-red-400',
    linkBackground: 'bg-red-50 dark:bg-red-950',
  },
  volunteer: {
    iconColor: 'bg-gradient-to-br from-green-500 to-green-600',
    titleColor: 'text-green-600 dark:text-green-400',
    subtitleColor: 'text-green-600 dark:text-green-400',
    linkBackground: 'bg-green-50 dark:bg-green-950',
  },
  scholar: {
    iconColor: 'bg-gradient-to-br from-amber-500 to-amber-600',
    titleColor: 'text-amber-700 dark:text-amber-400',
    subtitleColor: 'text-amber-600 dark:text-amber-400',
    linkBackground: 'bg-amber-50 dark:bg-amber-950',
  },
};

export interface PanelCardProps {
  title: string;
  subtitle: string;
  data: number | string;
  link: string;
  icon: JSX.Element;
  kind: 'workshop' | 'chat' | 'volunteer' | 'scholar';
  replace?: boolean;
}

const PanelCard: React.FC<PanelCardProps> = ({
  title,
  subtitle,
  data,
  link,
  icon,
  kind,
  replace = true,
}) => {
  return (
    <Link href={link} replace={replace} className="w-full block group">
      <div className="w-full h-full relative border border-gray-200 dark:border-neutral-950 bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className={`text-sm font-medium ${colorVariants[kind]['titleColor']} dark:opacity-90 mb-1`}>
                {title}
              </p>
              <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                {data}
              </p>
            </div>
            <div className={`${colorVariants[kind]['iconColor']} rounded-lg p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <div className="w-6 h-6 text-white">{icon}</div>
            </div>
          </div>
          <div className={`flex items-center text-sm ${colorVariants[kind]['subtitleColor']} dark:opacity-80 group-hover:gap-2 transition-all duration-300`}>
            <span className="truncate">{subtitle}</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PanelCard;
