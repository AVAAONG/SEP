import { getBlobImage } from "@/lib/azure/azure";
import { ScholarsCvaInformation } from "@/lib/db/utils/cva";
import { parseCvaLocationFromDatabase } from "@/lib/utils/parseFromDatabase";
import { parseCvaScheduleFromDatabase, parseModalityFromDatabase } from "@/lib/utils2";
import { ScholarCvaInformationColumnsProps } from "./columns";

export const formatScholarsToCvaInfoTable = async (scholars: ScholarsCvaInformation[]): Promise<ScholarCvaInformationColumnsProps[]> => {
    const data = scholars.map(async (scholar) => {
        const {
            id,
            first_names,
            last_names,
            photo,
            dni,
            cva_information
        } = scholar;
        return {
            id,
            name: first_names + ' ' + last_names,
            profilePhoto: photo ? await getBlobImage(photo) : null,
            dni,
            isInCva: cva_information?.is_in_cva ? 'Sí' : 'No',
            cvaLocation: parseCvaLocationFromDatabase(cva_information?.cva_location),
            actualModule: cva_information?.modules?.[0]?.module,
            moduleModality: parseModalityFromDatabase(cva_information?.modules?.[0]?.modality),
            qualification: cva_information?.modules?.[0]?.qualification,
            schedule: parseCvaScheduleFromDatabase(cva_information?.modules?.[0]?.schedule),
            cvaFinished: cva_information?.already_finished_cva ? 'Sí' : 'No',
            cvaStartDate: cva_information?.cva_started_date ? new Date(cva_information?.cva_started_date).toISOString() : null,
            cvaEndDate: cva_information?.cva_ended_date ? new Date(cva_information?.cva_ended_date).toISOString() : null,
            notStartedReason: cva_information?.not_started_cva_reason

        };
    });
    return Promise.all(data)
}
