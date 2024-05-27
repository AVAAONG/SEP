'use client';
import exportFollowUpData from '@/lib/utils/exportFunctions/scholarFollowUpExport';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';

const FollowUpExportButton = ({ datatoExport }: { datatoExport: {}[] }) => {
  return (
    <Button
      onClick={async () => await exportFollowUpData(datatoExport)}
      className="w-auto flex gap-2 items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10  dark:focus:ring-gray-700 dark:bg-slate-950 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      type="button"
      startContent={<ArrowUpTrayIcon className="w-5 h-5 text-primary-1" />}
    >
      Exportar reporte de seguimiento
    </Button>
  );
};

export default FollowUpExportButton;
