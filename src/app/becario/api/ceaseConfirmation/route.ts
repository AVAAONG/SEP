import { CHAT_CALENDAR_ID, WORKSHOP_CALENDAR_ID } from "@/lib/constants"
import { ceaseSpotInChat, ceaseSpotInWorkshop } from "@/lib/db/utils/users"
import { createEnrollementConfirmationMessage } from "@/lib/htmlConfirmationTemplate"
import createSpotCanceledConfirmationMessage from "@/lib/htmls/spotCeaseConfirmation"
import { sendGenericEmail } from "@/lib/sendEmails"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const activityId = searchParams.get('activityId')
    const activityName = searchParams.get('activityName')

    const scholarWhoCeaseAttendanceId = searchParams.get('scholarWhoCeaseAttendanceId')

    const scholarWhoReceiveId = searchParams.get('scholarId')
    const scholarWhoReceiveEmail = searchParams.get('scholarWhoReceiveEmail')
    const scholarWhoReceiveName = searchParams.get('scholarWhoReceiveName')

    const eventId = searchParams.get('eventId')

    const kindOfActivity = searchParams.get('kindOfActivity')

    if (!activityId || activityId === 'undefined' || activityId === 'null' ||
        !scholarWhoCeaseAttendanceId || scholarWhoCeaseAttendanceId === 'undefined' || scholarWhoCeaseAttendanceId === 'null' ||
        !scholarWhoReceiveId || scholarWhoReceiveId === 'undefined' || scholarWhoReceiveId === 'null' ||
        !kindOfActivity || kindOfActivity === 'undefined' || kindOfActivity === 'null' || !scholarWhoReceiveEmail) {
        return NextResponse.json({ error: 'Missing parameters, call support' }, { status: 400 })
    }
    if (kindOfActivity === 'workshop')
        await ceaseSpotInWorkshop(scholarWhoCeaseAttendanceId, activityId, scholarWhoReceiveId);
    else if (kindOfActivity === 'chat')
        await ceaseSpotInChat(scholarWhoCeaseAttendanceId, activityId, scholarWhoReceiveId);
    const result = await fetch(
        'https://script.google.com/macros/s/AKfycbzSiMKnlwygmcPdvdGvmeLlvXc_bcdm4tcWcpZ2H7QBbz-g3dBqxgFfzd_G44YaEeKkZA/exec',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newAttende: scholarWhoReceiveEmail,
                eventId,
                calendarId: kindOfActivity === 'workshop' ? WORKSHOP_CALENDAR_ID : CHAT_CALENDAR_ID,
            }),
        }
    );
    if (result.status !== 200) throw new Error('Error al inscribirte en la actividad');
    await sendGenericEmail(
        createEnrollementConfirmationMessage(
            scholarWhoReceiveName,
            kindOfActivity === 'workshop'
                ? `www.programaexcelencia.org/becario/actividadesFormativas/${activityId}`
                : `www.programaexcelencia.org/becario/chats/${activityId}`,,
            activityName
        ),
        scholarWhoReceiveEmail,
        'Confirmación de inscripción'
    );
    revalidatePath('/becario/panel')
    return new NextResponse(createSpotCanceledConfirmationMessage(),
        { status: 410, headers: { 'content-type': 'text/html' } }
    )
}
