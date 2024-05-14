import { Chat, Volunteer, Workshop } from "@prisma/client";

export const determineActivityKindByTipe = (activity: Partial<Workshop> | Partial<Chat> | Partial<Volunteer>) => {
    if ('asociated_skill' in activity) return 'workshop'
    if ('level' in activity) return 'chat'
    if ('kind_of_volunteer' in activity) return 'volunteer'
}
