import { ActivityStatus } from "@prisma/client";

export const determineStatus = (buttonType: string): ActivityStatus => {
    switch (buttonType) {
        case 'create':
            return 'ATTENDANCE_CHECKED';
        case 'schedule':
        case 'edit':
            return 'SCHEDULED';
        case 'send':
            return 'SENT';
        default:
            return '' as ActivityStatus;
    }
};