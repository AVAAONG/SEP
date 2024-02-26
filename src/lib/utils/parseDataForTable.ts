import { IScholarWorkshopColumns } from "@/app/becario/actividadesFormativas/page";
import { WorkshopWithAllData } from "@/components/table/columns/workshopColumns";

const createScholarWorkshopAttendanceObject = (workshops: WorkshopWithAllData[]): IScholarWorkshopColumns[] => {
    return workshops.map((workshop): IScholarWorkshopColumns => {
        const speakerNames: string[] = [];
        const speakerImages: (string | null)[] = [];
        const speakerIds: string[] = [];
        const speakerCompany: (string | null)[] = [];

        workshop.speaker.forEach((speaker) => {
            speakerNames.push(`${speaker.first_names.split(' ')[0]} ${speaker.last_names.split(' ')[0]}`);
            speakerImages.push(speaker.image);
            speakerIds.push(speaker.id);
            speakerCompany.push(speaker.job_company);
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
            speakerCompany,
        };
    });
};

export {
    createScholarWorkshopAttendanceObject
};

