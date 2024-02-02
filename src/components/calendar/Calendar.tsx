'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

import { BigCalendarEventType } from '@/types/Calendar';
import moment from 'moment';
import 'moment/locale/es';
import { useMemo } from 'react';
import { Calendar as BigCalendar, Views, momentLocalizer } from 'react-big-calendar';

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
const Calendar = ({ events }: { events: BigCalendarEventType[], }) => {
  type T = keyof typeof Views;
  const localizer = momentLocalizer(moment);
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: Object.keys(Views).map((value: string) => Views[value as T]),
    }),
    []
  );
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
          window.open(event.url, '_blank');
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
    </>
  );
};

export default Calendar;
