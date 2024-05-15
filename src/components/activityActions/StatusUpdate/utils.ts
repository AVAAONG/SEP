import { changeWorkshopStatus } from "@/lib/db/utils/Workshops";
import { changeChatStatus } from "@/lib/db/utils/chats";
import createAttendanceCheckedActivityMessage from "@/lib/htmls/attendanceCheckedActivityMessage";
import createSuspendedActivityMessage from "@/lib/htmls/suspendedActivityMessage";
import { sendGenericEmail } from "@/lib/sendEmails";
import { revalidateSpecificPath } from "@/lib/serverAction";
import { ActivityStatus } from "@prisma/client";

const changeActivityStatus = async (
    status: ActivityStatus,
    kindOfActivity: 'workshop' | 'chat',
    activityForChangeId: string,
    scholarsEmails: (string | null)[]
) => {
    let activityName = '',
        link = '',
        startDate = '',
        path = '',
        activityId = '';
    const emails = scholarsEmails.filter((email) => email !== null) as string[];

    if (kindOfActivity === 'workshop') {
        const workshop = await changeWorkshopStatus(activityForChangeId, status);
        link = `https://programaexcelencia.org/becario/actividadesFormativas/${workshop.id}`;
        activityName = workshop.title;
        startDate = workshop.start_dates[0].toISOString();
        path = `actividadesFormativas`;
        activityId = workshop.id;
    } else if (kindOfActivity === 'chat') {
        const chat = await changeChatStatus(activityForChangeId, status);
        link = `https://programaexcelencia.org/becario/chats/${chat.id}`;
        activityName = chat.title;
        startDate = chat.start_dates[0].toISOString();
        path = `chats`;
        activityId = chat.id;
    }

    await revalidateSpecificPath(`/becario/${path}/${activityId}`);
    await revalidateSpecificPath(`/admin/${path}/${activityId}`);

    if (status === 'SUSPENDED') {
        await sendGenericEmail(
            createSuspendedActivityMessage(activityName, startDate),
            emails,
            `🚨 La actividad ${activityName} ha sido suspendida 🚨`
        );
    }
    if (status === 'ATTENDANCE_CHECKED') {
        await sendGenericEmail(
            createAttendanceCheckedActivityMessage(activityName, startDate, link),
            emails,
            `📝 Actividad - ${activityName}: Encuesta de satisfacción 📝`
        );
    }
};

export default changeActivityStatus;