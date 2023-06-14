/**
 * @description list a workshop
 */

import { Workshop } from "@/types/Workshop"
import { createEvent } from "../calendar/calendar"

export const scheduleWorkshop = async (values: Workshop) => {
    await createEvent('workshop', values)
}
