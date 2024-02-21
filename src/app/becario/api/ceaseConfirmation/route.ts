import { ceaseSpotInChat, ceaseSpotInWorkshop } from "@/lib/db/utils/users"
import createSpotCanceledConfirmationMessage from "@/lib/htmls/spotCeaseConfirmation"
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
    if (kindOfActivity === 'workshop')
        await ceaseSpotInWorkshop(scholarWhoCeaseAttendanceId, activityId, scholarWhoReceiveId);
    else if (kindOfActivity === 'chat')
        await ceaseSpotInChat(scholarWhoCeaseAttendanceId, activityId, scholarWhoReceiveId);
    return new NextResponse(createSpotCanceledConfirmationMessage(),
        { status: 410, headers: { 'content-type': 'text/html' } }
    )
}
