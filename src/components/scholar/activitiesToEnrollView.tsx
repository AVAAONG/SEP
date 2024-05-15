'use client';
import EnrrollActivitiCard from '@/components/EnrrollActivitiCard';
import CalendarForEnrrolling from '@/components/calendar/CalendarForEnrolling';
import React, { useEffect, useState } from 'react';

interface ClientComponentProps {
  selectedKey: string | null;
  events: any[]; // Replace with actual type
  scholar: {
    id: string;
    name: string;
    email: string;
  };
}

const ClientComponent: React.FC<ClientComponentProps> = ({ selectedKey, events, scholar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (selectedKey?.length > 3) return;
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    // Run the handler once to catch the initial size
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const defaultKey = isMobile ? 'activities' : selectedKey;
  const view = selectedKey || defaultKey;
  return (
    <>
      {(view === 'calendar' || view === null) && (
        <div className="w-full">
          <div className="h-full min-h-[600px] text-gray-800 capitalize dark:text-gray-300 shadow-sm overflow-x-clip w-full bg-white border border-gray-200  shadow-emerald-600 dark:border-emerald-800  dark:bg-slate-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 p-2">
            <CalendarForEnrrolling events={events} scholar={scholar} />
          </div>
        </div>
      )}
      {view === 'activities' && (
        <div className="flex gap-4 w-full flex-wrap items-center justify-center">
          {events
            .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
            .map((event) => {
              return <EnrrollActivitiCard activity={event} scholar={scholar} />;
            })}
        </div>
      )}
    </>
  );
};

export default ClientComponent;
