'use client';
import { useState } from 'react';

const WarningTooltip = ({ helperText }: { helperText: string }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex-1 w-1/6">
      <div
        className="absolute bg-green-700 text-white text-sm rounded p-1 -mt-7 translate-x-3"
        style={{
          visibility: show ? 'visible' : 'hidden',
          transform: show ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {helperText}
      </div>
      <p
        style={{ touchAction: 'none', cursor: 'default' }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-sm font-medium text-yellow-600"
      >
        <svg
          className="flex-shrink-0 w-4 h-4 mr-2 animate-pulse cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
      </p>
    </div>
  );
};

export default WarningTooltip;
