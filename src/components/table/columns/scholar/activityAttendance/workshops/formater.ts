import { parseModalityFromDatabase, parsePlatformFromDatabase, parseScholarAttendanceFromDatabase, parseSkillFromDatabase, parseWorkshopStatusFromDatabase, parseWorkshopYearFromDatabase } from "@/lib/utils2";
import { KindOfSpeaker } from "@prisma/client";
import { WorkshopWithAllData } from "../../../workshopColumns";
import { IScholarWorkshopAttendanceColumns } from "./columns";

const createScholarWorkshopAttendanceForTable = (workshops: WorkshopWithAllData[]): IScholarWorkshopAttendanceColumns[] => {
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
        return {
            id: workshop.id,
            title: workshop.title,
            activityStatus: parseWorkshopStatusFromDatabase(workshop.activity_status),
            modality: parseModalityFromDatabase(workshop.modality),
            platform: parsePlatformFromDatabase(workshop.platform),
            date: new Date(workshop.start_dates[0]).toISOString(),
            startHour: new Date(workshop.start_dates[0]).toISOString(),
            skill: parseSkillFromDatabase(workshop.asociated_skill),
            year: parseWorkshopYearFromDatabase(workshop.year),
            speakerNames,
            speakerImages,
            speakerIds,
            speakerKind,
            speakerCompany,
            attendance: parseScholarAttendanceFromDatabase(workshop.scholar_attendance[0].attendance),
            satisfactionFormFilled: workshop.scholar_attendance[0].satisfaction_form_filled
        };
    });
}
export default createScholarWorkshopAttendanceForTable;