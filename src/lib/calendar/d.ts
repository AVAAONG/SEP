import { Chat, Workshop } from "@prisma/client"

export interface IWorkshopCalendar extends Workshop {
    speakersNames: string[]
}

export interface IChatCalendar extends Chat {
    speakersNames: string[]
}
