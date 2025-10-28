'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

import { BigCalendarEventType } from '@/types/Calendar';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/modal';
import moment from 'moment';
import 'moment/locale/es';
import { useCallback, useMemo, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, View, Views } from 'react-big-calendar';
import ChatEnrollementCard from '../scholar/activities/enrollment/ChatEnrollmentCard';
import VolunteerEnrollmentCard from '../scholar/activities/enrollment/VolunteerEnrollmentCard';
import WorkshopEnrollementCard from '../scholar/activities/enrollment/WorkshopEnrollmentCard';
import {
  ChatEnrollePage,
  VolunteerEnrollePage,
  WorkshopEnrollePage,
} from '../scholar/activities/enrollment/lib/formatActivities';

/**
 * Enhanced event styling with modern gradients and animations.
 * @param event The event to style.
 * @returns The style object for the event.
 */
const styleEvent = (event: BigCalendarEventType) => {
  const style = {
    background: event.isSuspended
      ? 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)'
      : event.bgColor || 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: '6px',
    border: '0px',
    display: 'block',
    fontSize: '13px',
    color: '#ffffff',
    textDecoration: event.isSuspended ? 'line-through' : 'none',
    padding: '4px 8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    fontWeight: '500',
  };
  return {
    style: style,
  };
};

/**
 * Enhanced Calendar component for activity enrollment with modern UI/UX.
 * Features enrollment cards in a modal with smooth animations and responsive design.
 * @param events The events to display in the calendar.
 * @see {@link https://github.com/jquense/react-big-calendar} for more information about the react-big-calendar component.
 * @returns The enhanced Calendar component.
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
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [visibleDate, setVisibleDate] = useState<Date>(new Date());

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  type T = keyof typeof Views;
  const localizer = momentLocalizer(moment);
  const { views } = useMemo(
    () => ({
      views: Object.keys(Views).map((value: string) => Views[value as T]),
    }),
    []
  );

  const selectActivity = useCallback((event: BigCalendarEventType) => {
    if (event.kindOfActivity === 'chat' && chatsToEnroll)
      setSelectedEvent(chatsToEnroll.find((chat) => chat.id === event.id) ?? null);
    if (event.kindOfActivity === 'workshop')
      setSelectedEvent(workshopsToEnroll.find((workshop) => workshop.id === event.id) ?? null);
    if (event.kindOfActivity === 'volunteer')
      setSelectedEvent(volunteerToEnroll.find((volunteer) => volunteer.id === event.id) ?? null);
  }, [chatsToEnroll, workshopsToEnroll, volunteerToEnroll]);

  const handleSelectEvent = useCallback((event: BigCalendarEventType) => {
    selectActivity(event);
    onOpen();
  }, [selectActivity, onOpen]);

  const handleViewChange = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const handleNavigate = useCallback((date: Date) => {
    setVisibleDate(date);
  }, []);

  return (
    <div className="calendar-container relative">
      {/* Modern Calendar Wrapper */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <BigCalendar
          className="modern-calendar h-full w-full"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={visibleDate}
          views={views}
          view={currentView}
          onView={handleViewChange}
          onNavigate={handleNavigate}
          showMultiDayTimes
          eventPropGetter={styleEvent}
          popup={true}
          onSelectEvent={handleSelectEvent}
          messages={{
            month: 'Mes',
            day: 'Día',
            today: 'Hoy',
            week: 'Semana',
            work_week: 'Semana Laboral',
            previous: 'Anterior',
            next: 'Siguiente',
            agenda: 'Agenda',
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
            allDay: 'Todo el día',
            noEventsInRange: 'No hay actividades en este rango de fechas.',
            showMore: (total: number) => `+${total} más`,
          }}
          style={{ minHeight: '600px' }}
        />
      </div>

      {/* Enrollment Modal with Enhanced Styling */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="3xl"
        placement="center"
        backdrop="blur"
        classNames={{
          body: '!bg-transparent !shadow-none !border-0 p-0',
          base: '!bg-transparent !shadow-none !border-0',
          wrapper: '!bg-transparent !shadow-none !border-0',
          backdrop: '!bg-black/60 backdrop-blur-sm',
          closeButton: 'z-50 !text-red-500 !bg-white dark:!bg-slate-800 !shadow-lg hover:!bg-red-50 dark:hover:!bg-red-900/20 hover:!text-red-600 transition-all',
        }}
        motionProps={{
          variants: {
            enter: {
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.25,
                ease: 'easeOut',
              },
            },
            exit: {
              scale: 0.95,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent className="!border-0">
          {(onClose) => (
            <>
              <ModalBody>
                {selectedEvent?.kindOfActivity === 'chat' && (
                  <div className="animate-in fade-in-0 zoom-in-95 duration-200">
                    <ChatEnrollementCard
                      activity={selectedEvent as ChatEnrollePage}
                      scholar={scholar}
                    />
                  </div>
                )}
                {selectedEvent?.kindOfActivity === 'workshop' && (
                  <div className="animate-in fade-in-0 zoom-in-95 duration-200">
                    <WorkshopEnrollementCard
                      activity={selectedEvent as WorkshopEnrollePage}
                      scholar={scholar}
                    />
                  </div>
                )}
                {selectedEvent?.kindOfActivity === 'volunteer' && (
                  <div className="animate-in fade-in-0 zoom-in-95 duration-200">
                    <VolunteerEnrollmentCard
                      activity={selectedEvent as VolunteerEnrollePage}
                      scholar={scholar}
                    />
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CalendarForEnrrolling;
