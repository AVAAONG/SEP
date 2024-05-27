'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

import { BigCalendarEventType } from '@/types/Calendar';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/modal';
import moment from 'moment';
import 'moment/locale/es';
import { useMemo, useState } from 'react';
import { Calendar as BigCalendar, Views, momentLocalizer } from 'react-big-calendar';
import ChatEnrollementCard from '../scholar/activities/enrollment/ChatEnrollmentCard';
import VolunteerEnrollmentCard from '../scholar/activities/enrollment/VolunteerEnrollmentCard';
import WorkshopEnrollementCard from '../scholar/activities/enrollment/WorkshopEnrollmentCard';
import {
  ChatEnrollePage,
  VolunteerEnrollePage,
  WorkshopEnrollePage,
} from '../scholar/activities/enrollment/lib/formatActivities';

/**
 * Defines the style for each event in the calendar.
 * @param event The event to style.
 * @returns The style object for the event.
 */
const styleEvent = (event: BigCalendarEventType) => {
  const style = {
    background: event.bgColor,
    borderRadius: '4px',
    border: '0px',
    display: 'block',
    fontSize: '13px',
    color: '#ffffff',
    textDecoration: event.isSuspended ? 'line-through' : 'none',
  };
  return {
    style: style,
  };
};

/**
 * The Calendar component.
 * @param events The events to display in the calendar.
 * @see {@link https://github.com/jquense/react-big-calendar} for more information about the react-big-calendar component.
 * @returns The Calendar component.
 */
const CalendarForEnrrolling = ({
  events,
  scholar,
  chatsToEnroll,
  workshopsToEnroll,
  volunteerToEnroll,
}: {
  events: BigCalendarEventType[];
  scholar: {
    id: string;
    name: string;
    email: string;
  };
  chatsToEnroll: ChatEnrollePage[];
  workshopsToEnroll: WorkshopEnrollePage[];
  volunteerToEnroll: VolunteerEnrollePage[];
}) => {
  const [selectedEvent, setSelectedEvent] = useState<
    ChatEnrollePage | WorkshopEnrollePage | VolunteerEnrollePage | null
  >(null);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  type T = keyof typeof Views;
  const localizer = momentLocalizer(moment);
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: Object.keys(Views).map((value: string) => Views[value as T]),
    }),
    []
  );
  const selectActivity = (event: BigCalendarEventType) => {
    if (event.kindOfActivity === 'chat' && chatsToEnroll)
      setSelectedEvent(chatsToEnroll.find((chat) => chat.id === event.id) ?? null);
    if (event.kindOfActivity === 'workshop')
      setSelectedEvent(workshopsToEnroll.find((workshop) => workshop.id === event.id) ?? null);
    if (event.kindOfActivity === 'volunteer')
      setSelectedEvent(volunteerToEnroll.find((volunteer) => volunteer.id === event.id) ?? null);
  };

  return (
    <>
      <BigCalendar
        className="h-full w-full overflow-y-scroll overflow:-moz-scrollbars-none"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={defaultDate}
        views={views}
        showMultiDayTimes
        eventPropGetter={styleEvent}
        popup
        onSelectEvent={(event) => {
          selectActivity(event);
          onOpen();
        }}
        messages={{
          month: 'Mes',
          day: 'Día',
          today: 'Hoy',
          week: 'Semana',
          work_week: 'Semana Laboral',
          previous: 'Atrás',
          next: 'Siguiente',
        }}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        classNames={{
          body: '!bg-transparent !shadow-none !border-0',
          base: '!bg-transparent !shadow-none !border-0',
          wrapper: '!bg-transparent !shadow-none !border-0',
          backdrop: '!bg-black !bg-opacity-50 !shadow-none !border-0',
          closeButton: '!text-red-500 !bg-white',
        }}
      >
        <ModalContent className="!border-0">
          {(onClose) => (
            <>
              <ModalBody>
                {selectedEvent?.kindOfActivity === 'chat' && (
                  <ChatEnrollementCard
                    activity={selectedEvent as ChatEnrollePage}
                    scholar={scholar}
                  />
                )}
                {selectedEvent?.kindOfActivity === 'workshop' && (
                  <WorkshopEnrollementCard
                    activity={selectedEvent as WorkshopEnrollePage}
                    scholar={scholar}
                  />
                )}
                {selectedEvent?.kindOfActivity === 'volunteer' && (
                  <VolunteerEnrollmentCard
                    activity={selectedEvent as VolunteerEnrollePage}
                    scholar={scholar}
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CalendarForEnrrolling;
