'use client';
import { useEffect, useState } from 'react';

interface DisplayDateProps {
  date: string;
}

const DisplayDate: React.FC<DisplayDateProps> = ({ date }) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  } else {
    return (
      <>
        {new Date(date).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </>
    );
  }
};

export default DisplayDate;
