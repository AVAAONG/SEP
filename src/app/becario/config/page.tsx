import { PrismaClient } from "@prisma/client";
import moment from 'moment'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth/nextAuthOptions/authOptions'

import AddressInformation from '@/components/forms/userSetings/AddressInformation'
import CVAInformation from '@/components/forms/userSetings/CVAInformation'
import GeneralInformation from '@/components/forms/userSetings/GeneralInformation'
import ProfilePic from '@/components/forms/userSetings/ProfilePic'
import UniversityInformation from '@/components/forms/userSetings/UniversityInformation'
import WorkInformation from '@/components/forms/userSetings/WorkInformation'
import VolunteeringInformation from '@/components/forms/userSetings/VolunteeringInformation'

const formatDate = (date: string) => {
    return moment(date).format('YYYY-MM-DD')
}
/**
 * Retrieves scholar data from the database.
 * @param id The ID of the scholar to retrieve data for.
 * @returns {{
 *   scholarGeneralInfo: {
*     firstNames: string | null,
*     lastNames: string | null,
*     dni: string | null,
*     gender: string | null,
*     birthDate: string | null,
*     cellPhoneNumber: string | null,
*     localPhoneNumber: string | null,
*     avaaAdmissionYear: string | null,
*     email: string | null,
*   },
*   scholarAddressInfo: {
*     currentZone: string | null,
*     stateOfOrigin: string | null,
*   },
*   scholarCollageInfo: {
*     collage: string | null,
*     carrer: string | null,
*     studyArea: string | null,
*     currentAcademicPeriod: string | null,
*     grade: string | null,
*     gradeKind: string | null,
*     classModality: string | null,
*     academicPeriodType: string | null,
*   },
*   workScholarInformation: {
*     isCurrentlyWorking: string,
*     organizationName: string | null,
*     positionHeld: string | null,
*     workModality: string | null,
*     weeklyHours: number | null,
*   },
*   scholarCVAInfo: {
*     isInCVA: string,
*     cvaLocation: string | null,
*     cvaModality: string | null,
*     englishLevel: string | null,
*     notStartedCvaReason: string | null,
*   },
* }} - The scholar data.
 */
const getScholarData = async (id: string) => {
    const prisma = new PrismaClient();
    const scholar = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            scholar: true,
        }
    });

    const scholarGeneralInfo = {
        firstNames: scholar?.scholar?.first_names,
        lastNames: scholar?.scholar?.last_names,
        dni: scholar?.scholar?.dni,
        gender: scholar?.scholar?.gender,
        birthDate: formatDate(scholar?.scholar?.birthdate),
        cellPhoneNumber: scholar?.scholar?.cell_phone_number,
        localPhoneNumber: scholar?.scholar?.local_phone_number,
        avaaAdmissionYear: formatDate(scholar?.scholar?.avaa_admission_year),
        email: scholar?.scholar?.email,
    };

    const scholarAddressInfo = {
        currentZone: scholar?.scholar?.current_zone,
        stateOfOrigin: scholar?.scholar?.state_of_origin,
    };
    const scholarCollageInfo = {
        collage: scholar?.scholar?.collage,
        carrer: scholar?.scholar?.carrer,
        studyArea: scholar?.scholar?.study_area,
        currentAcademicPeriod: scholar?.scholar?.current_academic_period,
        grade: scholar?.scholar?.grade,
        gradeKind: scholar?.scholar?.grade_kind,
        classModality: scholar?.scholar?.class_modality,
        academicPeriodType: scholar?.scholar?.academic_period_type,
    };

    const workScholarInformation = {
        isCurrentlyWorking: scholar?.scholar?.is_currently_working ? "TRUE" : "FALSE",
        organizationName: scholar?.scholar?.organization_name,
        positionHeld: scholar?.scholar?.position_held,
        workModality: scholar?.scholar?.work_modality,
        weeklyHours: scholar?.scholar?.weekly_hours,
    };
    const scholarCVAInfo = {
        isInCVA: scholar?.scholar?.is_in_cva ? "TRUE" : "FALSE",
        cvaLocation: scholar?.scholar?.cva_location,
        cvaModality: scholar?.scholar?.cva_modality,
        englishLevel: scholar?.scholar?.english_level,
        notStartedCvaReason: scholar?.scholar?.not_started_cva_reason,
    };
    return {
        scholarGeneralInfo,
        scholarAddressInfo,
        scholarCollageInfo,
        workScholarInformation,
        scholarCVAInfo,
    };
}

/**
 * Renders the user settings page with the user information. 
 * @returns The user settings page
 */
const page = async () => {
    const session = await getServerSession(authOptions);
    const scholarId = "cljwyi8hl0008uwmkjo6dktty"
    const scholar = await getScholarData(scholarId);
    return (
        <div>
            <div className="grid grid-cols-1 px-2 pt-6 xl:grid-cols-3 xl:gap-4 ">
                <div className="mb-4 col-span-full xl:mb-2">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Configuracion de usuario</h1>
                </div>
                <div className="col-span-full xl:col-auto">
                    <div className="bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
                        <ProfilePic image={scholar!.image} />
                    </div>
                    <div className="bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
                        <CVAInformation id={scholarId} title='CVA' scholarCVAInfo={scholarCVAInfo} />
                    </div>
                    {/* <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2 dark:border-gray-900 sm:p-6 dark:bg-slate-950">
                        <SocialMedia />
                    </div> */}
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2 dark:border-gray-900 sm:p-6 dark:bg-slate-950">
                        <VolunteeringInformation />
                    </div>
                </div>
                <div className="col-span-2 ">
                    <div className="bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
                        <GeneralInformation scholarGeneralInfo={scholarGeneralInfo} id={scholarId} title='Informacion General' />
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2 dark:border-gray-900 sm:p-6 dark:bg-slate-950">
                        <AddressInformation id={scholarId} title='Dirección' scholarAddressInfo={scholarAddressInfo} />
                    </div>
                    <div className="bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
                        <UniversityInformation id={scholarId} title='Universidad' scholarCollageInfo={scholarCollageInfo} />
                    </div>
                    <div className="bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
                        <WorkInformation id={scholarId} title='Trabajo' workScholarInformation={workScholarInformation} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default page