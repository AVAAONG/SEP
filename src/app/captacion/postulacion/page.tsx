import PersonalInfo from '@/components/catchment/formSections/personalInfo/PersonalInfoForm';
import { getServerSession } from '@/lib/auth/authOptions';
import { getApplicantPersonalInfo } from '@/lib/db/utils/applicant';
import { Divider } from "@heroui/react";
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/signin');
  const applicantPersonalInfo = await getApplicantPersonalInfo(session.id);
  return (
    <div className="space-y-2">
      <h1 className="font-bold text-lg">Información personal</h1>
      <Divider />
      <div className="py-2"></div>
      <PersonalInfo personalInfo={applicantPersonalInfo} applicantId={session.id} />
    </div>
  );
};

export default page;
