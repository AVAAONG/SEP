import { ActivityStatus, ScholarAttendance } from "@prisma/client";

const isDisabled = (attendance: ScholarAttendance, startDate: string, activityStatus: ActivityStatus) => {
    if (attendance !== 'ENROLLED') return true; // only allows to cancel if the scholar is enrolled
    else if (new Date(startDate) <= new Date()) return true; // only allows to cancel if the activity has not started yet
    else if (activityStatus !== 'SENT') return true; // only allows to cancel if the activity have status 'SENT'
    else return false;
};

export default isDisabled;