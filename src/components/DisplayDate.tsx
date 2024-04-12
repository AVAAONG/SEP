'use client';
import { useEffect, useState } from 'react';

interface DisplayDateProps {
  date: string;
  kind?: 'short' | 'long';
}

const DisplayDate: React.FC<DisplayDateProps> = ({ date, kind = 'long' }) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  } else {
    if (kind === 'long') {
      return (
        <>
          {new Date(date).toLocaleDateString('es-ES', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </>
      );
    } else {
      return (
        <>
          {new Date(date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </>
      );
    }
  }
};

export default DisplayDate;
