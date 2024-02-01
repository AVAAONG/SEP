import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import { getServerSession } from 'next-auth';

import AddressInformation from '@/components/scholar/config/AddressInformation';
import CVAInformation from '@/components/scholar/config/CVAInformation';
import GeneralInformation from '@/components/scholar/config/GeneralInformation';
import ProfilePic from '@/components/scholar/config/ProfilePic';
import UniversityInformation from '@/components/scholar/config/UniversityInformation';
import VolunteeringInformation from '@/components/scholar/config/VolunteeringInformation';
import WorkInformation from '@/components/scholar/config/WorkInformation';

const getScholarData = async (id: string) => {
  const prisma = new PrismaClient();
  const scholar = await prisma.scholar.findUnique({
    where: {
      id: id,
    },
  });

  const scholarGeneralInfo = {
    firstNames: scholar?.first_names,
    lastNames: scholar?.last_names,
    dni: scholar?.dni,
    gender: scholar?.gender,
    birthDate: formatDate(scholar?.birthdate),
    cellPhoneNumber: scholar?.cell_phone_number,
    localPhoneNumber: scholar?.local_phone_number,
    avaaAdmissionYear: formatDate(scholar?.avaa_admission_year),
    email: scholar?.email,
  };

  const scholarAddressInfo = {
    currentZone: scholar?.current_zone,
    stateOfOrigin: scholar?.state_of_origin,
  };
  const scholarCollageInfo = {
    collage: scholar?.collage,
    carrer: scholar?.carrer,
    studyArea: scholar?.study_area,
    currentAcademicPeriod: scholar?.current_academic_period,
    grade: scholar?.grade,
    gradeKind: scholar?.grade_kind,
    classModality: scholar?.class_modality,
    academicPeriodType: scholar?.academic_period_type,
  };

  const workScholarInformation = {
    isCurrentlyWorking: scholar?.is_currently_working ? 'TRUE' : 'FALSE',
    organizationName: scholar?.organization_name,
    positionHeld: scholar?.position_held,
    workModality: scholar?.work_modality,
    weeklyHours: scholar?.weekly_hours,
  };
  const scholarCVAInfo = {
    isInCVA: scholar?.is_in_cva ? 'TRUE' : 'FALSE',
    cvaLocation: scholar?.cva_location,
    cvaModality: scholar?.cva_modality,
    englishLevel: scholar?.english_level,
    notStartedCvaReason: scholar?.not_started_cva_reason,
  };
  return {
    scholarGeneralInfo,
    scholarAddressInfo,
    scholarCollageInfo,
    workScholarInformation,
    scholarCVAInfo,
  };
};

/**
 * Renders the user settings page with the user information.
 * @returns The user settings page
 */
const page = async () => {
  const session = await getServerSession(authOptions);
  const scholarId = session.user.id || '';
  console.log(scholarId);
  const prisma = new PrismaClient();
  const scholar = await prisma.user.findUnique({
    where: {
      id: scholarId,
    },
    include: {
      scholar: true,
    },
  });

  const scholarGeneralInfo = {
    firstNames: scholar?.first_names,
    lastNames: scholar?.last_names,
    dni: scholar?.dni,
    gender: scholar?.gender,
    birthDate: formatDate(scholar?.birthdate),
    cellPhoneNumber: scholar?.cell_phone_number,
    localPhoneNumber: scholar?.local_phone_number,
    avaaAdmissionYear: formatDate(scholar?.avaa_admission_year),
    email: scholar?.email,
  };

  const scholarAddressInfo = {
    currentZone: scholar?.current_zone,
    stateOfOrigin: scholar?.state_of_origin,
  };
  const scholarCollageInfo = {
    collage: scholar?.collage,
    carrer: scholar?.carrer,
    studyArea: scholar?.study_area,
    currentAcademicPeriod: scholar?.current_academic_period,
    grade: scholar?.grade,
    gradeKind: scholar?.grade_kind,
    classModality: scholar?.class_modality,
    academicPeriodType: scholar?.academic_period_type,
  };

  const workScholarInformation = {
    isCurrentlyWorking: scholar?.is_currently_working ? 'TRUE' : 'FALSE',
    organizationName: scholar?.organization_name,
    positionHeld: scholar?.position_held,
    workModality: scholar?.work_modality,
    weeklyHours: scholar?.weekly_hours,
  };
  const scholarCVAInfo = {
    isInCVA: scholar?.is_in_cva ? 'TRUE' : 'FALSE',
    cvaLocation: scholar?.cva_location,
    cvaModality: scholar?.cva_modality,
    englishLevel: scholar?.english_level,
    notStartedCvaReason: scholar?.not_started_cva_reason,
  };
  return (
    <div>
      <div className="grid grid-cols-1 px-2 pt-6 xl:grid-cols-3 xl:gap-4 ">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Configuracion de usuario
          </h1>
        </div>
        <div className="col-span-full xl:col-auto">
          <div className="bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
            <ProfilePic image={scholar!.image} />
          </div>
          <div className="bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
            <CVAInformation id={scholarId} title="CVA" scholarCVAInfo={scholarCVAInfo} />
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
            <GeneralInformation
              scholarGeneralInfo={scholarGeneralInfo}
              id={scholarId}
              title="Informacion General"
            />
          </div>
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2 dark:border-gray-900 sm:p-6 dark:bg-slate-950">
            <AddressInformation
              id={scholarId}
              title="Dirección"
              scholarAddressInfo={scholarAddressInfo}
            />
          </div>
          <div className="bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
            <UniversityInformation
              id={scholarId}
              title="Universidad"
              scholarCollageInfo={scholarCollageInfo}
            />
          </div>
          <div className="bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
            <WorkInformation
              id={scholarId}
              title="Trabajo"
              workScholarInformation={workScholarInformation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
