'use client';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const IconWithInfo = ({ icon, value }: { icon: JSX.Element; value: string }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = () => {
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <div className="flex gap-2 items-center justify-center bg-white rounded-full dark:bg-slate-600">
      <CopyToClipboard text={value}>
        <div
          className="bg-white  dark:bg-slate-600 p-2 w-9 rounded-full hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
          onMouseEnter={() => setShowInfo(true)}
          onClick={() => setShowInfo(!showInfo)}
        >
          {icon}
        </div>
      </CopyToClipboard>
      {showCopied && <span className="copied-text">copiado</span>}
      {showInfo && (
        <span className="pr-4" onMouseLeave={() => setShowInfo(false)}>
          {value}
        </span>
      )}{' '}
    </div>
  );
};

export default IconWithInfo;
