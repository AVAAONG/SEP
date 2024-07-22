import { ChatsWithAllData } from "@/components/table/columns/chatsColumns";
import { parseChatLevelFromDatabase, parseModalityFromDatabase, parseWorkshopStatusFromDatabase } from "@/lib/utils2";
import { KindOfSpeaker } from "@prisma/client";
import { IAdminChatColumns } from "./columns";

const createAdminChatsObjectForTable = (chats: ChatsWithAllData[]): IAdminChatColumns[] => {

    return chats.map((chat) => {
        const speakerNames: string[] = [];
        const speakerImages: (string | undefined)[] = [];
        const speakerIds: string[] = [];
        const speakerCompany: (string | null)[] = [];
        const speakerKind: (KindOfSpeaker | null)[] = [];
        chat.speaker.forEach((speaker) => {
            speakerNames.push(`${speaker.first_names.split(' ')[0]} ${speaker.last_names.split(' ')[0]}`);
            speakerImages.push(speaker.image || undefined);
            speakerIds.push(speaker.id);
            speakerCompany.push(speaker.job_company);
            speakerKind.push(speaker.speaker_kind);
        });

        const attendedScholars = chat.scholar_attendance.filter((a) => a.attendance === 'ATTENDED')
            .length;
        const enrrolledScholars = chat.scholar_attendance.filter(
            (a) => a.attendance !== 'CANCELLED'
        ).length;

        return {
            id: chat.id,
            title: chat.title,
            date: new Date(chat.start_dates[0]).toISOString(),
            startHour: new Date(chat.start_dates[0]).toISOString(),
            status: parseWorkshopStatusFromDatabase(chat.activity_status),
            modality: parseModalityFromDatabase(chat.modality),
            platform: chat.platform,
            level: parseChatLevelFromDatabase(chat.level),
            attendedScholars,
            enrrolledScholars,
            speakerNames,
            speakerImages,
            speakerIds,
            speakerKind,
            speakerCompany,
            spots: chat.avalible_spots,
        };
    });
}
export default createAdminChatsObjectForTable;