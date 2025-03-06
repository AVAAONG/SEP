'use client';

import { useSidebarContext } from '@/hooks/sidebar-context';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { Tooltip } from '@nextui-org/tooltip';

const SidebarSeparator = ({ label }: { label: string }) => {
  const { isOpen } = useSidebarContext();

  return (
    <div className="w-full">
      {(isOpen && label) || isOpen === undefined ? (
        <p className="text-xs  text-gray-400 p-1 max-w-[248px] truncate">{label}</p>
      ) : !isOpen && isOpen !== undefined && label ? (
        <Tooltip content={<p>{label}</p>} placement="right-end" radius="sm">
          <div className="w-full flex justify-center items-center p-1">
            <EllipsisHorizontalIcon className="h-6 w-6 text-white" />
          </div>
        </Tooltip>
      ) : (
        <p className="p-2"></p>
      )}
    </div>
  );
};

export default SidebarSeparator;
