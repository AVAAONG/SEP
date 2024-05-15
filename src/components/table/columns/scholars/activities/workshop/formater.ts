import { WorkshopWithAllData } from "@/components/table/columns/workshopColumns";
import { parseModalityFromDatabase, parseSkillFromDatabase, parseWorkshopStatusFromDatabase, parseWorkshopYearFromDatabase } from "@/lib/utils2";
import { KindOfSpeaker } from "@prisma/client";

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
            (a) => a.attendance !== 'CANCELLED'
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
            endHour: new Date(workshop.end_dates[0]).toISOString(),
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

export default createAdminWorkshopsObjectForTable;