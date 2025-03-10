'use client';

import { useEffect, useState } from 'react';

type DeviceType = {
  isMobile: boolean;
  isMiddle: boolean; // e.g., tablets or mid-size devices
  isDesktop: boolean;
};

const useMobile = (): DeviceType => {
  const [device, setDevice] = useState<DeviceType>({
    isMobile: false,
    isMiddle: false,
    isDesktop: true,
  });

  useEffect(() => {
    const handler = () => {
      const width = window.innerWidth;
      setDevice({
        isMobile: width < 768,
        isMiddle: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return device;
};

export default useMobile;
