import { ScholarAttendanceSpanish } from "@/components/charts/common/widgets/ScholarAttendanceWidgetSpanish";
import { parseChatLevelFromDatabase, parseModalityFromDatabase, parsePlatformFromDatabase, parseScholarAttendanceFromDatabase, parseWorkshopStatusFromDatabase } from "@/lib/utils2";
import { KindOfSpeaker } from "@prisma/client";
import { ChatsWithAllData } from "../../../chatsColumns";
import { IScholarChatColumns } from "./columns";

const createScholarChatAttendanceForTable = (chats: ChatsWithAllData[], scholarId: string): IScholarChatColumns[] => {
    return chats.map((chat) => {
        const speakerNames: string[] = [];
        const speakerImages: (string | undefined)[] = [];
        const speakerIds: string[] = [];
        const speakerCompany: (string | null)[] = [];
        const speakerKind: (KindOfSpeaker | null)[] = [];
        let attendance = parseScholarAttendanceFromDatabase(chat.scholar_attendance[0]?.attendance) as ScholarAttendanceSpanish;
        chat.speaker.forEach((speaker) => {
            speakerNames.push(`${speaker.first_names.split(' ')[0]} ${speaker.last_names.split(' ')[0]}`);
            speakerImages.push(speaker.image || undefined);
            speakerIds.push(speaker.id);
            speakerCompany.push(speaker.job_company);
            speakerKind.push(speaker.speaker_kind);
            if (speaker.id === scholarId) attendance = 'Facilitador';
        });

        return {
            id: chat.id,
            title: chat.title,
            date: new Date(chat.start_dates[0]).toISOString(),
            startHour: new Date(chat.start_dates[0]).toISOString(),
            activityStatus: parseWorkshopStatusFromDatabase(chat.activity_status),
            modality: parseModalityFromDatabase(chat.modality),
            platform: parsePlatformFromDatabase(chat.platform),
            level: parseChatLevelFromDatabase(chat.level),
            speakerNames,
            speakerImages,
            speakerIds,
            speakerKind,
            speakerCompany,
            attendance,
            satisfactionFormFilled: chat.scholar_attendance[0].satisfaction_form_filled
        };
    });
}
export default createScholarChatAttendanceForTable;