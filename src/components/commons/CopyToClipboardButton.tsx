'use client';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { toast } from 'react-toastify';

const CopyToClipboardButton = ({ textToCopy }: { textToCopy: string }) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(textToCopy);
    toast.info('Texto copiado al portapapeles');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      isIconOnly
      radius="sm"
      onClick={copyToClipboard}
      startContent={<ClipboardIcon className="h-4 w-4" />}
    ></Button>
  );
};

export default CopyToClipboardButton;
