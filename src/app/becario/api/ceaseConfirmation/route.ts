import { ceaseSpotInChat, ceaseSpotInWorkshop } from "@/lib/db/utils/users"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const activityId = searchParams.get('activityId')
    const scholarWhoCeaseAttendanceId = searchParams.get('scholarWhoCeaseAttendanceId')
    const scholarWhoReceiveId = searchParams.get('scholarId')
    const time = searchParams.get('timeout')
    const kindOfActivity = searchParams.get('kindOfActivity')

    if (activityId === null ||
        scholarWhoCeaseAttendanceId === null ||
        scholarWhoReceiveId === null ||
        time === null ||
        kindOfActivity === null
    ) {
        return new Response('Missing parameters', {
            status: 400,
        })
    }
    // MAXIMUM 30 MINUTES
    if (new Date(time) < new Date()) {
        return new Response('The time has passed', {
            status: 400,
        })
    }

    if (kindOfActivity === 'workshop')
        await ceaseSpotInWorkshop(scholarWhoCeaseAttendanceId, activityId, scholarWhoReceiveId);
    else if (kindOfActivity === 'chat')
        await ceaseSpotInChat(scholarWhoCeaseAttendanceId, activityId, scholarWhoReceiveId);
}
