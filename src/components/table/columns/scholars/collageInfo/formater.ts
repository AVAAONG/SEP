import { getBlobImage } from "@/lib/azure/azure";
import { getCollageName, parseStudyAreaFromDatabase } from "@/lib/utils/parseFromDatabase";
import { scholarCollageInformationColumnsProps } from "./columns";

export const formatScholarsToCollageinfoTable = async (scholars): Promise<scholarCollageInformationColumnsProps> => {
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
            kindOfCollage: collage_information[0]?.kind_of_collage!,
            studyRegime: collage_information[0]?.study_regime!,
            collage: collage_information[0]?.collage!,
            completeCollage: getCollageName(collage_information[0]?.complete_collage!),
            studyArea: parseStudyAreaFromDatabase(collage_information[0]?.study_area!),
            carrer: collage_information[0]?.career!,
            mention: collage_information[0]?.mention!,
            currentAcademicPeriod: collage_information[0]?.collage_period.current_academic_period!,
            collageStartDate: collage_information[0]?.collage_start_date!,
            grade: collage_information[0]?.collage_period.grade!
        };
    });
    return await Promise.all(data);
}
