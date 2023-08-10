import { WorkshopSpeaker } from '@prisma/client';
import React, { useState } from 'react';

const WorkshopTooltip = ({ title, speaker }: { title: string; speaker: WorkshopSpeaker[] }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex-1 w-1/6">
      <div
        className="absolute bg-gray-700 text-white text-xs rounded py-1 px-4 -mt-6"
        style={{
          visibility: show ? 'visible' : 'hidden',
          transform: show ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {title}
      </div>
      <p
        style={{ touchAction: 'none', cursor: 'default' }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-sm font-medium  truncate text-white"
      >
        {title}
      </p>
      <p className="text-xs text-gray-500 truncate ">
        Por: {speaker[0].first_names + ' ' + speaker[0].last_names}
      </p>
    </div>
  );
};

export default WorkshopTooltip;
