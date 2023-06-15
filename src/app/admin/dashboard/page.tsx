import Card from '@/components/dashboard/Card'
import React from 'react'
import { chatIcon, userIcon, volunterIcon, workshopIcon } from '@/assets/svgs'
import Calendar from '@/components/calendar/Calendar'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth/nextAuthOptions/authOptions'
import { setTokens } from '@/lib/auth/auth'
import { getCalendarEvents } from '@/lib/calendar/calendar'
import { calendar_v3 } from '@googleapis/calendar'
import { BigCalendarEventType } from '@/types/Calendar';
import { getWorkshopsCount } from '@/lib/database/Workshops'
const VOLUNTEER_CALENDAR_EVENT_COLORS = "linear-gradient(to right, #34D399, #059669)"

const CALENDAR_IDS = [
    {
        // Calendar for volunteer activities
        calendarId: "66c8bfc0379b164b2d4104d235933b8507228ea39a0f6301f7f3a1a7e878e204@group.calendar.google.com",
        eventColor: VOLUNTEER_CALENDAR_EVENT_COLORS
    },
    {
        // Calendar for english chats clubs
        calendarId: "e8e9c5e4d30d349b75f6061c8641fa2577ed9928403c4bd12b6bd6687291e7a9@group.calendar.google.com",
        eventColor: VOLUNTEER_CALENDAR_EVENT_COLORS
    },
    {
        // Calendar for workshops
        calendarId: "3bd2458b588a28274518ba4e7a45f44db6a04c33377cc8c008c986a72dc36cdb@group.calendar.google.com",
        eventColor: VOLUNTEER_CALENDAR_EVENT_COLORS
    }
]



const createEventObject = (calendarEvents: calendar_v3.Schema$Event[], bgColor: string): BigCalendarEventType[] => {

    const formatedEvents: BigCalendarEventType[] = []
    calendarEvents.forEach((event) => {
        const { summary, start, end, description, location } = event;
        const obj = {
            title: summary as string,
            allDay: false,
            start: new Date(start!.dateTime as string),
            end: new Date(end!.dateTime as string),
            description: description as string,
            bgColor,
            location: location as string,
        }
        formatedEvents.push(obj)
    })
    return formatedEvents;
}

const fetchEvents = async () => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    const refreshToken = session?.user?.refreshToken;
    setTokens(accessToken as string, refreshToken as string);
    let calendarEvents: BigCalendarEventType[] = []
    CALENDAR_IDS.forEach(async ({ calendarId, eventColor }) => {
        const events = await getCalendarEvents(calendarId);
        const formatedEvents = createEventObject(events!, eventColor);
        calendarEvents.push(...formatedEvents)
    })
    console.log(calendarEvents)
    return calendarEvents;
}

const page = async () => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.accessToken;
    const refreshToken = session?.user?.refreshToken;
    const workshopCount = await getWorkshopsCount()
    setTokens(accessToken as string, refreshToken as string);
    let calendarEvents: BigCalendarEventType[] = []
    // CALENDAR_IDS.forEach(async ({ calendarId, eventColor }) => {
    const events = await getCalendarEvents(CALENDAR_IDS[0].calendarId);
    const formatedEvents = createEventObject(events!, CALENDAR_IDS[0].eventColor);
    //     calendarEvents.push(...formatedEvents)
    // })

    const CARD_CONTENT = [
        {
            icon: workshopIcon,
            text: "Talleres realizados",
            number: workshopCount,
            bg: "bg-gradient-to-r from-blue-700  to-indigo-900",
            cardButtonBg: "bg-indigo-950 active:bg-blue-700 hover:bg-blue-700"
        },
        {
            icon: chatIcon,
            text: "Chats Realizados",
            number: 9,
            bg: "bg-gradient-to-r from-red-500  to-red-900",
            cardButtonBg: "bg-indigo-950 active:bg-blue-700"

        },
        {
            icon: volunterIcon,
            text: "Horas de voluntariado realizadas",
            number: 7,
            bg: " from-green-600  to-emerald-800",
            cardButtonBg: "bg-indigo-950 active:bg-blue-700"

        },
        {
            icon: userIcon,
            text: "Becarios activos",
            number: 5,
            bg: "from-yellow-500  to-yellow-700",
            cardButtonBg: "bg-indigo-950 active:bg-blue-700 hover:bg-blue-700"
        },
    ]

    return (
        <div className='flex flex-col gap-4 h-full w-full'>
            <div className="flex flex-col md:flex-row gap-4 items-center md:h-1/4">
                {CARD_CONTENT.map(({ icon, text, number, bg, cardButtonBg }) => {
                    return (
                        <Card key={text} stat={number} Icon={icon} text={text} bg={bg} cardButtonBg={cardButtonBg} />
                    )
                })}
            </div>
            <div className='h-full w-full bg-slate-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 border border-gray-100 p-2'>
                <Calendar events={formatedEvents} />
            </div>
        </div>
    )
}

export default page;