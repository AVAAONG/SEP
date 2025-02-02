import AdditionalInfoForm from '@/components/catchment/formSections/additionalInfo/AdditionalInfoForm';
import { getServerSession } from '@/lib/auth/authOptions';
import { getApplicantAdditionalInfo } from '@/lib/db/utils/applicant';
import { Divider } from '@nextui-org/react';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/signin');
  const [applicantAdditionalInfo, step] = await getApplicantAdditionalInfo(session.id);
  if (!step || step < 8) redirect('/captacion/postulacion');
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información adicional</h1>
      <Divider />
      <AdditionalInfoForm
        applicantId={session.id}
        applicantAdditionalInfo={applicantAdditionalInfo}
      />
    </div>
  );
};

export default page;
