"use client";
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'
import { Fragment, useMemo } from 'react';

const styleEvent = (event: BigCalendarEventType) => {
    const style = {
        background: event.bgColor,
        borderRadius: '4px',
        color: 'white',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
}


const Calendar = ({ events }) => {
    const { defaultDate, views } = useMemo(
        () => ({
            // components: {
            //     timeSlotWrapper: ColoredDateCellWrapper,
            // },
            defaultDate: new Date(),
            views: Object.keys(Views).map((k) => Views[k]),
        }),
        []
    )
    const localizer = momentLocalizer(moment)
    return (
        <Fragment>
            <div className='h-full'>
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