import AditionalInfoForm from '@/components/admission/aditionalInfo/AditionalInfoForm';
import AttachedFilesForm from '@/components/admission/aditionalInfo/attachedFiles/AttachedFilesForm';
import CollageForm from '@/components/admission/collage/collageAdmisionForm';
import FormNavigation from '@/components/admission/common/FormNavigation';
import ContactInfoForm from '@/components/admission/contactInfo/ContactInfoForm';
import FamilyInfoForm from '@/components/admission/familyInfo/FamilyInfoForm';
import HighSchoolForm from '@/components/admission/highSchool/HighSchoolForm';
import JobInfoForm from '@/components/admission/jobInfo/JobInfoForm';
import LanguagesForm from '@/components/admission/languageKnowledge/LanguageKnowledgeForm';
import PersonalInformation from '@/components/public/admision/form/PersonalInformation';
import applicantAuthOptions from '@/lib/auth/nextAuthApplicant/authApplicantOptions';
import { prisma } from '@/lib/db/utils/prisma';
import { formatDateToDisplayInInput } from '@/lib/utils/dates';
import { getServerSession } from 'next-auth';

const page = async ({
  searchParams,
}: {
  searchParams?: {
    paso: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | undefined;
  };
}) => {
  const step = searchParams?.paso || '0';
  const session = await getServerSession(applicantAuthOptions);
  const scholarId = session?.scholarId;
  const scholar = await prisma.scholar.findUnique({
    where: {
      id: scholarId,
    },
    // select: {
    //   recruitment_information: {
    //     select: {
    //       current_step: true,
    //     }
    //   }
    // }
  });

  const currentStep = 0

  const buttonLabels = [
    {
      label: 'Datos personales',
      state: 'current',
      avalible: true,
      step: 0,
    },
    {
      label: 'Datos de contacto',
      state: 'current',
      avalible: true,
      step: 1,
    },
    {
      label: 'Datos familiares',
      state: 'notDone',
      avalible: true,
      step: 2,
    },
    {
      label: 'Situación laboral',
      state: 'notDone',
      avalible: true,
      step: 3,
    },
    {
      label: 'Conocimiento de idiomas',
      state: 'notDone',
      avalible: true,
      step: 4,
    },
    {
      label: 'Educación secundaria',
      state: 'notDone',
      avalible: true,
      step: 5,
    },
    {
      label: 'Educación universitaria',
      state: 'notDone',
      avalible: true,
      step: 6,
    },
    {
      label: 'Información adicional',
      state: 'notDone',
      avalible: true,
      step: 7,
    },
    {
      label: 'Anexos',
      state: 'notDone',
      avalible: true,
      step: 8,
    },
  ];

  const updatedButtonLabels = buttonLabels.map(button => ({
    ...button,
    avalible: button.step <= currentStep,
    state: button.step < currentStep ? 'done' : button.step === currentStep ? 'current' : 'notDone',
  }));
  const personalForm = {
    id: scholar?.id || '',
    photo: scholar?.photo || '',
    first_names: scholar?.first_names || '',
    last_names: scholar?.last_names || '',
    dni: scholar?.dni || '',
    gender: scholar?.gender || '',
    state: scholar?.state || '',
    address: scholar?.address || '',
    birthdate: scholar?.birthdate ? formatDateToDisplayInInput(scholar?.birthdate) : '',
  }

  return (
    <main className="bg-gray-100 p-10 min-h-screen flex flex-col space-y-28">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-primary-light">
        Formulario de postulación ProExcelencia
      </h1>
      <div className="grid grid-cols-6 space-y-5">
        <div className="space-y-0.5 col-start-2 col-span-5 pl-12">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{buttonLabels[
            parseInt(step)
          ].label}
          </h1>
          <p className="text-muted-foreground">Completa cada uno de los campos</p>
          <div className="w-full h-0.5 bg-primary-light opacity-40" />
        </div>

        <div className="flex col-span-6 lg:col-span-1 lg:flex-col gap-2">
          <FormNavigation items={updatedButtonLabels} />
        </div>
        <div className=" pl-12 space-y-5 col-span-5">
          {step === '0' && <PersonalInformation {...personalForm} />}
          {step === '1' && <ContactInfoForm />}
          {step === '2' && <FamilyInfoForm />}
          {step === '3' && <JobInfoForm />}
          {step === '4' && <LanguagesForm />}
          {step === '5' && <HighSchoolForm />}
          {step === '6' && <CollageForm />}
          {step === '7' && <AditionalInfoForm />}
          {step === '8' && <AttachedFilesForm />}
        </div>
      </div>
    </main>
  );
};

export default page;
