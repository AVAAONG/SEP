'use client';
import Image from 'next/image';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const IconWithInfo = ({ icon, value }: { icon: JSX.Element; value: string }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = () => {
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
      setShowInfo(!showInfo);
    }, 1000);
  };

  return (
    <>
      <div className="flex gap-2 items-center justify-center bg-white rounded-full dark:bg-slate-600 z-50">
        <CopyToClipboard text={value}>
          <div
            className="bg-white  dark:bg-slate-600 p-2 w-9 rounded-full hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
            onMouseEnter={() => setShowInfo(true)}
            onClick={() => handleCopy()}
          >
            {icon}
          </div>
        </CopyToClipboard>
        {showInfo && (
          <span className="pr-4" onMouseLeave={() => setShowInfo(false)}>
            {value}
          </span>
        )}{' '}
      </div>
      {showCopied && (
        <span className="absolute translate-x-80 z-50">
          <Image
            className="inline-block"
            src="/svgs/copied-text.svg"
            width={140}
            height={70}
            alt="texto copiado"
          />{' '}
          <span className="absolute -translate-x-4 translate-y-1">👍</span>
        </span>
      )}
    </>
  );
};

export default IconWithInfo;
