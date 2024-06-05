import { ActivityStatus } from "@prisma/client";

export const determineStatus = (buttonType: string): ActivityStatus => {
    switch (buttonType) {
        case 'create':
            return 'ATTENDANCE_CHECKED';
        case 'schedule':
            return 'SCHEDULED';
        case 'send':
            return 'SENT';
        default:
            throw new Error('Invalid button type');
    }
};