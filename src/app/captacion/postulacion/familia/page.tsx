import FamilyInfoForm from '@/components/catchment/formSections/familyInfo/FamilyInfoForm';
import { getServerSession } from '@/lib/auth/authOptions';
import { getApplicantFamilyInfo } from '@/lib/db/utils/applicant';
import { Divider } from '@nextui-org/react';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/signin');
  const applicantFamilyInfo = await getApplicantFamilyInfo(session.id);
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información familiar</h1>
      <Divider />
      <FamilyInfoForm applicantId={session.id} applicantFamilyInfo={applicantFamilyInfo} />
    </div>
  );
};

export default page;
