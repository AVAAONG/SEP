import AddressInformation from '@/components/forms/userSetings/AddressInformation'
import CVAInformation from '@/components/forms/userSetings/CVAInformation'
import GeneralInformation from '@/components/forms/userSetings/GeneralInformation'
import ProfilePic from '@/components/forms/userSetings/ProfilePic'
import SocialMedia from '@/components/forms/userSetings/SocialMedia'
import UniversityInformation from '@/components/forms/userSetings/UniversityInformation'
import WorkInformation from '@/components/forms/userSetings/WorkInformation'
import React from 'react'
import VolunteeringInformation from '@/components/forms/userSetings/VolunteeringInformation'
import { PrismaClient } from "@prisma/client";

const formatDate = (date: string) => {
    const rawDate = new Date(date);
    let day = rawDate.getDay() + 1 < 10 ? `0${rawDate.getMonth() + 1}` : rawDate.getMonth() + 1;
    let month = rawDate.getMonth() + 1 < 10 ? `0${rawDate.getMonth() + 1}` : rawDate.getMonth() + 1;
    let fullYear = rawDate.getFullYear();
    const formatedDate = `${fullYear}-${month}-${day}`;
    return formatedDate;
}

const page = async ({
    params,
    searchParams,
}: {
    params: { scholarId: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {

    const prisma = new PrismaClient();

    const scholarId = params.scholarId;

    const scholar = await prisma.user.findUnique({
        where: {
            id: scholarId
        },
        include: {
            scholar: true,
        }
    });

    const scholarGeneralInfo = {
        firstNames: scholar?.scholar?.firstNames,
        lastNames: scholar?.scholar?.lastNames,
        dni: scholar?.scholar?.dni,
        gender: scholar?.scholar?.gender,
        birthDate: formatDate(scholar?.scholar?.birthDate),
        cellPhoneNumber: scholar?.scholar?.cellPhoneNumber,
        localPhoneNumber: scholar?.scholar?.localPhoneNumber,
        avaaAdmissionYear: formatDate(scholar?.scholar?.avaaAdmissionYear),
        email: scholar?.scholar?.email,
    }

    const scholarAddressInfo = {
        currentZone: scholar?.scholar?.currentZone,
        stateOfOrigin: scholar?.scholar?.stateOfOrigin,
    }


    const scholarCollageInfo = {
        collage: scholar?.scholar?.collage,
        carrer: scholar?.scholar?.carrer,
        studyArea: scholar?.scholar?.studyArea,
        currentAcademicPeriod: scholar?.scholar?.currentAcademicPeriod,
        grade: scholar?.scholar?.grade,
        gradeKind: scholar?.scholar?.gradeKind,
        classModality: scholar?.scholar?.classModality,
        academicPeriodType: scholar?.scholar?.academicPeriodType,
    }

    const workScholarInformation = {
        isCurrentlyWorking: scholar?.scholar?.isCurrentlyWorking ? "Sí" : "No",
        organizationName: scholar?.scholar?.organizationName,
        positionHeld: scholar?.scholar?.positionHeld,
        workModality: scholar?.scholar?.workModality,
        weeklyHours: scholar?.scholar?.weeklyHours,
    }

    const scholarCVAInfo = {
        isInCVA: scholar?.scholar?.isInCVA ? "TRUE" : "FALSE",
        cvaLocation: scholar?.scholar?.cvaLocation,
        cvaModality: scholar?.scholar?.cvaModality,
        englishLevel: scholar?.scholar?.englishLevel,
        notStartedCvaRreason: scholar?.scholar?.notStartedCvaRreason,
    }
    console.log(scholarCVAInfo)

    return (
        <div>
            {/* <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52  opacity-40 dark:opacity-30">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-emerald-800 dark:from-green-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-emerald-200 to-sky-300 dark:to-indigo-800"></div>
            </div> */}
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