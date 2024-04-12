import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';

interface ScholarColumnWidgetProps {
  scholarId: string;
  scholarName: string;
  scholarPhoto: string | null;
}

const ScholarColumnWidget: React.FC<ScholarColumnWidgetProps> = ({
  scholarId,
  scholarName,
  scholarPhoto,
}) => {
  return (
    <Link href={scholarId ? `/admin/becarios/${scholarId}` : ''} className="w-67">
      <div className="flex items-center  w-full">
        <div className="flex-shrink-0 w-8 h-8">
          <Avatar
            className="w-full h-full rounded-full"
            src={scholarPhoto ? scholarPhoto : undefined}
            alt="Foto de perfil"
          />
        </div>
        <div className="ml-4 text-start w-full">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {scholarName}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ScholarColumnWidget;
