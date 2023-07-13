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
import { getScholarsCount } from '@/lib/database/users'
import { CALENDAR_IDS } from '@/lib/constants'
import { getChatsCount, getChatsDone } from '@/lib/database/chats'
import adminAuthOptions from '@/lib/auth/nextAuthAdminOptions/authAdminOptions'



const createEventObject = (calendarEvents: calendar_v3.Schema$Event[], bgColor: string, textColor: string): BigCalendarEventType[] => {
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
            textColor
        }
        formatedEvents.push(obj)
    })
    return formatedEvents;
}

const fetchEvents = async () => {
    const session = await getServerSession(adminAuthOptions);

    const accessToken = session?.user?.accessToken;
    const refreshToken = session?.user?.refreshToken;

    setTokens(accessToken as string, refreshToken as string);
    let calendarEvents: BigCalendarEventType[] = []
    const volunteerEvents = await getCalendarEvents(CALENDAR_IDS[0].calendarId);
    const formatedVolunteerEvents = createEventObject(volunteerEvents!, CALENDAR_IDS[0].eventColor, CALENDAR_IDS[0].textColor);
    calendarEvents.push(...formatedVolunteerEvents)

    const chatsEvents = await getCalendarEvents(CALENDAR_IDS[1].calendarId);
    const formatedChatsEvents = createEventObject(chatsEvents!, CALENDAR_IDS[1].eventColor, CALENDAR_IDS[1].textColor);
    calendarEvents.push(...formatedChatsEvents)

    const workshopsEvents = await getCalendarEvents(CALENDAR_IDS[2].calendarId);
    const formatedWorkshopsEvents = createEventObject(workshopsEvents!, CALENDAR_IDS[2].eventColor, CALENDAR_IDS[2].textColor);
    calendarEvents.push(...formatedWorkshopsEvents)

    // const userEvents = await getCalendarEvents();
    // const formatedUserEvents = createEventObject(userEvents!, CALENDAR_IDS[2].eventColor, CALENDAR_IDS[2].textColor);
    // calendarEvents.push(...formatedUserEvents)

    return calendarEvents;
}

const page = async () => {
    const workshopCount = await getWorkshopsCount();
    const scholarsCount = await getScholarsCount();
    const chatsCount = await getChatsCount()


    const events = await fetchEvents();

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
            number: chatsCount,
            bg: "bg-gradient-to-r from-red-500  to-red-900",
            cardButtonBg: "bg-indigo-950 active:bg-blue-700"

        },
        {
            icon: volunterIcon,
            text: "Horas de voluntariado realizadas",
            number: 0,
            bg: " from-green-600  to-emerald-800",
            cardButtonBg: "bg-indigo-950 active:bg-blue-700"

        },
        {
            icon: userIcon,
            text: "Becarios activos",
            number: scholarsCount,
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
            <div className='h-full max-h-[680px] min-h-screen overflow-x-clip w-full bg-slate-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 border-2 border-green-950 p-2'>
                <Calendar events={events} />
            </div>
        </div>
    )
}

export default page;

// 4V44yELPr0gr4m4Pr03xc3l3nci4