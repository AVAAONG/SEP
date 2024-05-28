import { getBlobImage } from "@/lib/azure/azure";
import { ScholarWithAllData } from "@/lib/db/types";
import { parseScholarCondition } from "@/lib/utils/parseFromDatabase";
import moment from "moment";
import { WithdrawAndResignationGeneralInformationColumnProps } from "./columns";

export const formatScholarsToWithdrawAndResignationGeneralInfoTable = async (scholars: ScholarWithAllData[]): Promise<WithdrawAndResignationGeneralInformationColumnProps[]> => {
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
            name: first_names + ' ' + last_names,
            profilePhoto: photo ? await getBlobImage(photo) : null,
            dni,
            birthdate: moment(birthdate).format('DD/MM/YYYY'),
            years: moment().diff(moment(birthdate), 'years'),
            gender: gender!,
            whatsapp_number: whatsapp_number!,
            email,
            avaaStarteYear: moment(program_information?.program_admission_date).format('DD/MM/YYYY'),
            avaaEndDate: moment(program_information?.program_end_date).format('DD/MM/YYYY'),
            scholarCondition: parseScholarCondition(program_information?.scholar_condition!)
        };
    });
    return Promise.all(data)
}
