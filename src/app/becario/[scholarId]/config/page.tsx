import AddressInformation from '@/components/forms/userSetings/AddressInformation'
import CVAInformation from '@/components/forms/userSetings/CVAInformation'
import GeneralInformation from '@/components/forms/userSetings/GeneralInformation'
import ProfilePic from '@/components/forms/userSetings/ProfilePic'
import SocialMedia from '@/components/forms/userSetings/SocialMedia'
import UniversityInformation from '@/components/forms/userSetings/UniversityInformation'
import WorkInformation from '@/components/forms/userSetings/WorkInformation'
import React from 'react'
import VolunteeringInformation from '@/components/forms/userSetings/VolunteeringInformation'

const page = ({
    params,
    searchParams,
  }: {
    params: { scholarId: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  })  => {

    console.log(params.scholarId)
    
    return (
        <div>
            <div className="grid grid-cols-1 px-2 pt-6 xl:grid-cols-3 xl:gap-4">
                <div className="mb-4 col-span-full xl:mb-2">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Configuracion de usuario</h1>
                </div>
                <div className="col-span-full xl:col-auto">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-green-950 sm:p-6 dark:bg-slate-900">
                        <ProfilePic image={null} />
                    </div>

                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-green-950 sm:p-6 dark:bg-slate-900">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Respecto al CVA</h3>
                        <CVAInformation />
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <SocialMedia />
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <VolunteeringInformation />
                    </div>
                    
                </div>
                <div className="col-span-2">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-green-950 sm:p-6 dark:bg-slate-900">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Información General</h3>
                        <GeneralInformation />
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <AddressInformation />
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-green-950 sm:p-6 dark:bg-slate-900">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Informacion de universidad</h3>
                        <UniversityInformation />
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-green-950 sm:p-6 dark:bg-slate-900">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Dirección</h3>
                        <WorkInformation />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default page