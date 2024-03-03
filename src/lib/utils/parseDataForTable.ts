import { IScholarWorkshopColumns } from "@/app/becario/actividadesFormativas/page";
import { IScholarChatColumns } from "@/app/becario/chats/page";
import { ChatsWithAllData } from "@/components/table/columns/chatsColumns";
import { WorkshopWithAllData } from "@/components/table/columns/workshopColumns";
import { KindOfSpeaker } from "@prisma/client";
import { parseModalityFromDatabase } from "../utils2";

const createScholarWorkshopAttendanceObject = (workshops: WorkshopWithAllData[]): IScholarWorkshopColumns[] => {
    return workshops.map((workshop): IScholarWorkshopColumns => {
        const speakerNames: string[] = [];
        const speakerImages: (string | undefined)[] = [];
        const speakerIds: string[] = [];
        const speakerCompany: (string | null)[] = [];
        const speakerKind: (KindOfSpeaker | null)[] = [];

        workshop.speaker.forEach((speaker) => {
            speakerNames.push(`${speaker.first_names.split(' ')[0]} ${speaker.last_names.split(' ')[0]}`);
            speakerImages.push(speaker.image || undefined);
            speakerIds.push(speaker.id);
            speakerCompany.push(speaker.job_company);
            speakerKind.push(speaker.speaker_kind);
        });

        return {
            id: workshop.id,
            title: workshop.title,
            platform: workshop.platform,
            start_dates: workshop.start_dates,
            end_dates: workshop.end_dates,
            modality: workshop.modality,
            skill: workshop.asociated_skill,
            activity_status: workshop.activity_status,
            attendance: workshop.scholar_attendance[0].attendance,
            year: workshop.year,
            speakerNames,
            speakerImages,
            speakerIds,
            speakerKind,
            speakerCompany,
        };
    });
};

const createScholarChatAttendanceObject = (chats: ChatsWithAllData[]): IScholarChatColumns[] => {
    return chats.map((chat): IScholarChatColumns => {
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
        return {
            id: chat.id,
            title: chat.title,
            platform: chat.platform,
            start_dates: chat.start_dates,
            end_dates: chat.end_dates,
            modality: parseModalityFromDatabase(chat.modality),
            level: chat.level,
            activity_status: chat.activity_status,
            attendance: chat.scholar_attendance[0] ? chat.scholar_attendance[0].attendance : 'SPEAKER',
            speakerNames,
            speakerImages,
            speakerIds,
            speakerCompany,
            speakerKind,
        };
    });
};


export {
    createScholarWorkshopAttendanceObject,
    createScholarChatAttendanceObject
};

