import { IScholarWorkshopColumns } from "@/app/becario/actividadesFormativas/page";
import { IScholarChatColumns } from "@/app/becario/chats/page";
import { ChatsWithAllData } from "@/components/table/columns/chatsColumns";
import { WorkshopWithAllData } from "@/components/table/columns/workshopColumns";
import { KindOfSpeaker } from "@prisma/client";
import { parseChatLevelFromDatabase, parseModalityFromDatabase, parseSkillFromDatabase, parseWorkshopStatusFromDatabase, parseWorkshopYearFromDatabase } from "../utils2";

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

const createAdminWorkshopsObjectForTable = (workshops: WorkshopWithAllData[]) => {
    return workshops.map((workshop) => {
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

        const attendedScholars = workshop.scholar_attendance.filter((a) => a.attendance === 'ATTENDED')
            .length;
        const enrrolledScholars = workshop.scholar_attendance.filter(
            (a) => a.attendance === 'ENROLLED' || 'ATTENDED' || 'NOT_ATTENDED' || 'JUSTIFY'
        ).length;
        return {
            id: workshop.id,
            title: workshop.title,
            speakerNames,
            speakerImages,
            speakerIds,
            speakerKind,
            speakerCompany,
            date: new Date(workshop.start_dates[0]).toISOString(),
            startHour: new Date(workshop.start_dates[0]).toISOString(),
            status: workshop.activity_status,
            parsedStatus: parseWorkshopStatusFromDatabase(workshop.activity_status),
            skill: parseSkillFromDatabase(workshop.asociated_skill),
            modality: parseModalityFromDatabase(workshop.modality),
            platform: workshop.platform,
            year: parseWorkshopYearFromDatabase(workshop.year),
            attendedScholars,
            enrrolledScholars
        };
    });
}

const createAdminChatsObjectForTable = (chats: ChatsWithAllData[]) => {

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
            (a) => a.attendance === 'ENROLLED' || 'ATTENDED' || 'NOT_ATTENDED' || 'JUSTIFY'
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
            scholarsEnrroled: chat.scholar_attendance.filter(
                (a) => a.attendance === 'ENROLLED' || 'ATTENDED'
            ).length,
            attendedScholars,
            enrrolledScholars,
            speakerNames,
            speakerImages,
            speakerIds,
            speakerKind,
            speakerCompany,
        };
    });
}
export {
    createScholarWorkshopAttendanceObject,
    createScholarChatAttendanceObject,
    createAdminWorkshopsObjectForTable,
    createAdminChatsObjectForTable
};

