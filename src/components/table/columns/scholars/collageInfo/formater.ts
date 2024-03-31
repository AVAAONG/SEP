import { ScholarWithAllData } from "@/components/EditScholarForm";
import { getBlobImage } from "@/lib/azure/azure";
import { getCollageName, parseStudiRegimeFromDatabase, parseStudyAreaFromDatabase } from "@/lib/utils/parseFromDatabase";
import { scholarCollageInformationColumnsProps } from "./columns";

export const formatScholarsToCollageinfoTable = async (scholars: ScholarWithAllData[]): Promise<scholarCollageInformationColumnsProps[]> => {
    const data = scholars.map(async (scholar) => {
        const {
            id,
            first_names,
            last_names,
            photo,
            dni,
            collage_information
        } = scholar;
        return {
            id,
            first_names,
            last_names,
            profilePhoto: photo ? await getBlobImage(photo) : null,
            dni,
            kindOfCollage: collage_information[0]?.kind_of_collage! === 'PRIVATE' ? 'Privada' : 'Pública',
            collageStartDate: new Date(collage_information[0]?.collage_start_date!).toLocaleDateString(),
            studyRegime: parseStudiRegimeFromDatabase(collage_information[0]?.study_regime!),
            collage: collage_information[0]?.collage!,
            collageCompleteName: getCollageName(collage_information[0]?.collage!),
            studyArea: parseStudyAreaFromDatabase(collage_information[0]?.study_area!),
            carrer: collage_information[0]?.career!,
            mention: collage_information[0]?.mention!,
            currentAcademicPeriod: collage_information[0]?.collage_period?.[0]?.current_academic_period,
            grade: collage_information[0]?.collage_period?.[0]?.grade,
        };
    });
    return await Promise.all(data);
}
