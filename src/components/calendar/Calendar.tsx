'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

import { BigCalendarEventType } from '@/types/Calendar';
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Spinner } from '@nextui-org/react';
import moment from 'moment';
import 'moment/locale/es';
import { useCallback, useMemo, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, View, Views } from 'react-big-calendar';
import ActivityDetailsPopover from './ActivityDetailsPopover';

/**c
 * Defines the style for each event in the calendar.
 * Enhanced with better visual indicators and animations.
 * @param event The event to style.
 * @returns The style object for the event.
 */
const styleEvent = (event: BigCalendarEventType,) => {
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

const Calendar = ({
  events,
  isLoading = false,
  height = 360
}: {
  events: BigCalendarEventType[];
  isLoading?: boolean;
  height?: number | string;
}) => {
  const [selectedEvent, setSelectedEvent] = useState<BigCalendarEventType | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [visibleDate, setVisibleDate] = useState<Date>(new Date());

  type T = keyof typeof Views;
  const localizer = momentLocalizer(moment);

  const { views } = useMemo(
    () => ({
      views: Object.keys(Views).map((value: string) => Views[value as T]),
    }),
    []
  );

  const handleSelectEvent = useCallback((event: BigCalendarEventType) => {
    setSelectedEvent(event);
    setIsPopoverOpen(true);
  }, []);

  const handleClosePopover = useCallback(() => {
    setIsPopoverOpen(false);
    // Small delay before clearing selected event for smoother animation
    setTimeout(() => setSelectedEvent(null), 200);
  }, []);

  const handleViewChange = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  // Keep the calendar's visible date controlled so navigation and day selection
  // show the chosen date instead of always falling back to "today".
  const handleNavigate = useCallback((date: Date) => {
    setVisibleDate(date);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" color="success" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Cargando calendario...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card fullWidth radius='sm' style={{ height: typeof height === 'number' ? `${height}px` : height }}>
      {/* <CardHeader className="flex gap-3">

      </CardHeader> */}
      <CardBody className='flex-1 overflow-y-auto'>
        <div className="calendar-container relative">
          {/* Modern Calendar Wrapper */}
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
            popup={true} // Enable popup for show-more functionality
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

          {/* Activity Details Popover */}
          <ActivityDetailsPopover
            isOpen={isPopoverOpen}
            onClose={handleClosePopover}
            event={selectedEvent}
          />
        </div>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>

  );
};

export default Calendar;
