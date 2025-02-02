import CollageForm from '@/components/catchment/formSections/collageInfo/CollageInfoForm';
import { getServerSession } from '@/lib/auth/authOptions';
import { getApplicantCollageInfo } from '@/lib/db/utils/applicant';
import { Divider } from '@nextui-org/react';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/signin');
  const [applicantCollageInfo, step] = await getApplicantCollageInfo(session.id);
  if (!step || step < 7) redirect('/captacion/postulacion');
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información universitaria</h1>
      <Divider />
      <CollageForm applicantCollageInfo={applicantCollageInfo} applicantId={session.id} />
    </div>
  );
};

export default page;
