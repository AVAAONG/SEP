import { Chat, Workshop } from "@prisma/client"

export interface ISpeakerCalendar {
    speakersData: {
        id: string
        speakerName: string
        speakerEmail: string
    }[]
}
export interface IWorkshopCalendar extends Omit<Workshop, "calendar_ids" | "activity_status" | "slides" | 'id' | 'start_dates' | 'end_dates'>, ISpeakerCalendar {
    start_dates: string[]
    end_dates: string[]
}
export interface IChatCalendar extends Omit<Chat, "calendar_ids" | "activity_status" | "slides" | 'id' | 'start_dates' | 'end_dates'>, ISpeakerCalendar {
    start_dates: string[]
    end_dates: string[]
}