import HighSchoolForm from '@/components/catchment/formSections/highschool/HighSchoolForm';
import { getServerSession } from '@/lib/auth/authOptions';
import { getApplicantHighSchoolInfo } from '@/lib/db/utils/applicant';
import { Divider } from "@heroui/react";
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/signin');
  const [applicantHighSchoolInfo, step] = await getApplicantHighSchoolInfo(session.id);
  if (!step || step < 6) redirect('/captacion/postulacion');
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información sobre educación secundaria</h1>
      <Divider />
      <HighSchoolForm applicantHighSchoolInfo={applicantHighSchoolInfo} applicantId={session.id} />
    </div>
  );
};

export default page;
