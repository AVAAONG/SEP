import CollageForm from '@/components/admission/collage/collageAdmisionForm';
import ContactInfoForm from '@/components/admission/contactInfo/ContactInfoForm';
import FamilyInfoForm from '@/components/admission/familyInfo/FamilyInfoForm';
import HighSchoolForm from '@/components/admission/highSchool/HighSchoolForm';
import JobInfoForm from '@/components/admission/jobInfo/JobInfoForm';
import LanguagesForm from '@/components/admission/languageKnowledge/LanguageKnowledgeForm';
import PersonalInformation from '@/components/public/admision/form/PersonalInformation';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';

const buttonLabels = [
  {
    label: 'Datos personales',
    state: 'done',
    avalible: true,
  },
  {
    label: 'Datos de contacto',
    state: 'current',
    avalible: true,
  },
  {
    label: 'Datos familiares',
    state: 'notDone',
    avalible: false,
  },
  {
    label: 'Situación laboral',
    state: 'notDone',
    avalible: false,
  },
  {
    label: 'Conocimiento de idiomas',
    state: 'notDone',
    avalible: false,
  },
  {
    label: 'Educación secundaria',
    state: 'notDone',
    avalible: false,
  },
  {
    label: 'Educación universitaria',
    state: 'notDone',
    avalible: false,
  },
  {
    label: 'Información adicional',
    state: 'notDone',
    avalible: false,
  },
];
const setVariantAccordingToState = (state: string) => {
  if (state === 'current') return 'solid';
  if (state === 'done') return 'flat';
  if (state === 'notDone') return 'light';
};

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: {
    paso: 'contacto' | 'secundaria' | 'universidad' | 'familia' | 'ingles' | 'familia' | undefined;
  };
}) => {
  return (
    <main className="bg-gray-100 p-10 min-h-screen flex flex-col space-y-28">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-primary-light">
        Formulario de Postulación ProExcelencia
      </h1>
      <div className="grid grid-cols-6 space-y-5 ">
        <div className="space-y-0.5 col-start-2 col-span-5 pl-12">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Datos Personales</h1>
          <p className="text-muted-foreground">Completa cada uno de los campos</p>
          <div className="w-full h-0.5 bg-primary-light opacity-40" />
        </div>

        <div className="flex flex-col gap-2">
          {buttonLabels.map(({ label, state, avalible }, index) => (
            <Button
              radius="sm"
              startContent={state === 'done' ? <CheckBadgeIcon className="w-5 h-5" /> : <></>}
              key={index}
              color="success"
              isDisabled={!avalible}
              variant={setVariantAccordingToState(state)}
              className="!justify-start"
            >
              {label}
            </Button>
          ))}
        </div>
        <div className=" pl-12 space-y-5 col-span-5">
          {searchParams?.paso === undefined && <PersonalInformation />}
          {searchParams?.paso === 'contacto' && <ContactInfoForm />}
          {searchParams?.paso === 'familia' && <FamilyInfoForm />}
          {searchParams?.paso === 'trabajo' && <JobInfoForm />}
          {searchParams?.paso === 'secundaria' && <HighSchoolForm />}
          {searchParams?.paso === 'universidad' && <CollageForm />}
          {searchParams?.paso === 'ingles' && <LanguagesForm />}
        </div>
      </div>
    </main>
  );
};

export default page;
