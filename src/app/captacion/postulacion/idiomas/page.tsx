import LanguagesForm from '@/components/catchment/formSections/language/LanguageKnowledgeForm';
import { getServerSession } from '@/lib/auth/authOptions';
import { getApplicantLangInfo } from '@/lib/db/utils/applicant';
import { Divider } from "@heroui/react";
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/signin');
  const [applicantLangInfo, step] = await getApplicantLangInfo(session.id);
  if (!step || step < 5) redirect('/captacion/postulacion');
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Conocimiento de idiomas</h1>
      <Divider />
      <LanguagesForm applicantId={session.id} applicantLangKnowledge={applicantLangInfo} />
    </div>
  );
};

export default page;
