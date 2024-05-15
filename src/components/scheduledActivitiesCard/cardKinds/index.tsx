import { ChatWithSpeaker, WorkshopWithSpeaker } from '@/lib/db/types';
import { Volunteer } from '@prisma/client';
import React from 'react';
import ScheduledChatCard from './ScheduledChatCard';
import ScheduledVolunteerCard from './ScheduledVolunteerCard';
import ScheduledWorkshopCard from './ScheduledWorkshopCard';

interface ScheduledCardSelectI {
  activity: ChatWithSpeaker | WorkshopWithSpeaker | Volunteer;
  children: React.ReactNode;
}

const ScheduledCardSelect: React.FC<ScheduledCardSelectI> = ({ activity, children }) => {
  if ('level' in activity) {
    return <ScheduledChatCard chat={activity as ChatWithSpeaker}>{children}</ScheduledChatCard>;
  } else if ('year' in activity) {
    return (
      <ScheduledWorkshopCard workshop={activity as WorkshopWithSpeaker}>
        {children}
      </ScheduledWorkshopCard>
    );
  } else if ('kind_of_volunteer' in activity) {
    return (
      <ScheduledVolunteerCard Volunteer={activity as Volunteer}>{children}</ScheduledVolunteerCard>
    );
  }
};

export default ScheduledCardSelect;
