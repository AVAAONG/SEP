'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      isIconOnly
      variant="flat"
      size="sm"
      radius="full"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
    </Button>
  );
};
