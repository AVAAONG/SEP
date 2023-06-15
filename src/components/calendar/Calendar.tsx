"use client";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'

import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { Fragment, useMemo } from 'react';
import 'moment/locale/es'

import { BigCalendarEventType } from '@/types/Calendar';

const styleEvent = (event: BigCalendarEventType) => {
    const style = {
        background: event.bgColor,
        borderRadius: '4px',
        border: '0px',
        display: 'block',
        fontSize: "13px",
        color: "#ffffff",
    };
    return {
        style: style
    };
}

const Calendar = ({ events }: { events: BigCalendarEventType[] }) => {
    type T = keyof typeof Views
    const localizer = momentLocalizer(moment)
    const { defaultDate, views } = useMemo(
        () => ({
            defaultDate: new Date(),
            views: Object.keys(Views).map((value: string) => Views[value as T]),
        }),
        []
    )
    return (
        <Fragment>
            <div className='h-full w-full'>
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={defaultDate}
                    views={views}
                    showMultiDayTimes
                    eventPropGetter={(styleEvent)}
                />
            </div>
        </Fragment>
    )
}

export default Calendar;