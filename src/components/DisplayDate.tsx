'use client';
import moment from 'moment-timezone';
import 'moment/locale/es';
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
          {moment(date, moment.ISO_8601, true).locale('es').format('dddd, DD [de] MMMM [de] YYYY')}
        </>
      );
    } else {
      return (
        <>
          {moment.utc(date, moment.ISO_8601, true).tz('America/Caracas').format('DD/MM/YYYY')}
        </>
      );
    }
  }
};

export default DisplayDate;
