import { getBlobImage } from "@/lib/azure/azure";
import { ScholarWithAllData } from "@/lib/db/types";
import { getCollageName, parseAvaaAdmisionYear, parseKindOfCollageFromDatabase, parseProbationFromDatabase, parseStudiRegimeFromDatabase, parseStudyAreaFromDatabase } from "@/lib/utils/parseFromDatabase";
import moment from "moment";
import { ScholarAllInformationColumnProps } from "./columns";

export const formatScholarsToAllInfoTable = async (scholars: ScholarWithAllData[]): Promise<ScholarAllInformationColumnProps[]> => {
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
      collage_information
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
      yearsInAvaa: parseAvaaAdmisionYear(
        moment().diff(moment(program_information?.program_admission_date), 'years')
      ),
      programStatus: parseProbationFromDatabase(program_information?.scholar_status!),
      kindOfCollage: parseKindOfCollageFromDatabase(collage_information[0]?.kind_of_collage!),
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
  return Promise.all(data)
}
