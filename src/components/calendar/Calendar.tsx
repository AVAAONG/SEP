'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { Fragment, useMemo } from 'react';
import 'moment/locale/es';

import { BigCalendarEventType } from '@/types/Calendar';

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
const Calendar = ({ events }: { events: BigCalendarEventType[] }) => {
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
    <Fragment>
      <div className="">
        <BigCalendar
          className="h-96"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={defaultDate}
          views={views}
          showMultiDayTimes
          eventPropGetter={styleEvent}
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
      </div>
    </Fragment>
  );
};

export default Calendar;
