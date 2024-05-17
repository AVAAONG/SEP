'use client';
import CalendarForEnrrolling from '@/components/calendar/CalendarForEnrolling';
import { BigCalendarEventType } from '@/types/Calendar';
import React, { useEffect, useState } from 'react';
import ChatEnrollementCard from './activities/enrollment/ChatEnrollmentCard';
import WorkshopEnrollementCard from './activities/enrollment/WorkshopEnrollmentCard';
import {
  ChatEnrollePage,
  VolunteerEnrollePage,
  WorkshopEnrollePage,
} from './activities/enrollment/lib/formatActivities';

interface AcvititiesViewProps {
  selectedKey: string | null;
  calendarEvents: BigCalendarEventType[]; // Replace with actual type
  chatsToEnroll: ChatEnrollePage[];
  workshopsToEnroll: WorkshopEnrollePage[];
  volunteerToEnroll: VolunteerEnrollePage[];
  scholar: {
    id: string;
    name: string;
    email: string;
  };
}

const AcvititiesView: React.FC<AcvititiesViewProps> = ({
  selectedKey,
  calendarEvents,
  scholar,
  chatsToEnroll,
  workshopsToEnroll,
  volunteerToEnroll,
}) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    if (!selectedKey) return;
    if (selectedKey?.length > 3) return;
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      // Run the handler once to catch the initial size
      handleResize();
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const defaultKey = isMobile ? 'activities' : selectedKey;
  const view = selectedKey || defaultKey;
  return (
    <>
      {(view === 'calendar' || view === null) && (
        <div className="w-full">
          <div className="h-full min-h-[600px] text-gray-800 capitalize dark:text-gray-300 shadow-sm overflow-x-clip w-full bg-white border border-gray-200  shadow-emerald-600 dark:border-emerald-800  dark:bg-slate-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 p-2">
            <CalendarForEnrrolling events={calendarEvents} scholar={scholar} />
          </div>
        </div>
      )}
      {view === 'activities' && (
        <div className="flex gap-4 w-full flex-wrap items-center justify-center">
          {chatsToEnroll.map((activity) => (
            <ChatEnrollementCard key={activity.id} activity={activity} />
          ))}
          {workshopsToEnroll.map((activity: WorkshopEnrollePage) => (
            <WorkshopEnrollementCard key={activity.id} activity={activity} scholar={scholar} />
          ))}
        </div>
      )}
    </>
  );
};

export default AcvititiesView;
