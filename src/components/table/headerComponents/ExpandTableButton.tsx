'use client';

import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';

interface ExpandTableButtonProps {
  isExpanded: boolean;
  toggleExpanded: (isExpanded: boolean) => void;
}

const ExpandTableButton = ({ isExpanded, toggleExpanded }: ExpandTableButtonProps) => {
  return (
    <Button
      variant="flat"
      isIconOnly
      size="sm"
      onPress={() => toggleExpanded(isExpanded ? false : true)}
    >
      {isExpanded ? (
        <ArrowsPointingInIcon className="w-5 h-5 " />
      ) : (
        <ArrowsPointingOutIcon className="w-5 h-5 " />
      )}
    </Button>
  );
};

export default ExpandTableButton;
