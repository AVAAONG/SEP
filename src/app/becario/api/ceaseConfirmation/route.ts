import { ceaseSpotInChat, ceaseSpotInWorkshop } from "@/lib/db/utils/users"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const activityId = searchParams.get('activityId')
    const scholarWhoCeaseAttendanceId = searchParams.get('scholarWhoCeaseAttendanceId')
    const scholarWhoReceiveId = searchParams.get('scholarId')
    const kindOfActivity = searchParams.get('kindOfActivity')

    if (!activityId || activityId === 'undefined' || activityId === 'null' ||
        !scholarWhoCeaseAttendanceId || scholarWhoCeaseAttendanceId === 'undefined' || scholarWhoCeaseAttendanceId === 'null' ||
        !scholarWhoReceiveId || scholarWhoReceiveId === 'undefined' || scholarWhoReceiveId === 'null' ||
        !kindOfActivity || kindOfActivity === 'undefined' || kindOfActivity === 'null') {
        return NextResponse.json({ error: 'Missing parameters, call support' }, { status: 400 })
    }
    // MAXIMUM 10 MINUTES
    // if (new Date(time) < new Date()) {
    //     return new Response('The time has passed', {
    //         status: 400,
    //     })
    // }
    if (kindOfActivity === 'workshop')
        await ceaseSpotInWorkshop(scholarWhoCeaseAttendanceId, activityId, scholarWhoReceiveId);
    else if (kindOfActivity === 'chat')
        await ceaseSpotInChat(scholarWhoCeaseAttendanceId, activityId, scholarWhoReceiveId);
    return new NextResponse(
        `
                <h1>Error 410</h1>
                <h2>Permanently deleted or Gone</h2>
                <p>This page is not found and is gone from this server forever</p>
            `,
        { status: 410, headers: { 'content-type': 'text/html' } }
    )
}
