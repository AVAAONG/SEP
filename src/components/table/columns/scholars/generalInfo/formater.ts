import { ScholarWithAllData } from "@/components/EditScholarForm";
import { getBlobImage } from "@/lib/azure/azure";
import { parseAvaaAdmisionYear, parseProbationFromDatabase } from "@/lib/utils/parseFromDatabase";
import moment from "moment";
import { ScholarGeneralInformationColumnProps } from "./columns";

export const formatScholarsToGeneralInfoTable = async (scholars: ScholarWithAllData[]): Promise<ScholarGeneralInformationColumnProps[]> => {
    const data = scholars.map(async (scholar) => {
        const {
            id,
            first_names,
            last_names,
            photo,
            dni,
            birthdate,
            whatsapp_number,
            email,
            gender,
            program_information,
        } = scholar;
        return {
            id,
            first_names,
            last_names,
            profilePhoto: photo ? await getBlobImage(photo) : null,
            dni,
            birthdate: moment(birthdate).format('DD/MM/YYYY'),
            years: moment().diff(moment(birthdate), 'years'),
            gender: gender!,
            whatsapp_number: whatsapp_number!,
            email,
            avaaStarteYear: moment(program_information?.program_admission_date).format('DD/MM/YYYY'),
            yearsInAvaa: parseAvaaAdmisionYear(
                moment().diff(moment(program_information?.program_admission_date), 'years')
            ),
            programStatus: parseProbationFromDatabase(program_information?.scholar_status!)
        };
    });
    return Promise.all(data)
}
