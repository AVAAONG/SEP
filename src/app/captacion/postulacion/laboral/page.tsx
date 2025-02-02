import JobInfoForm from '@/components/catchment/formSections/jobInfo/JobInfoForm';
import { getServerSession } from '@/lib/auth/authOptions';
import { getApplicantJobInfo } from '@/lib/db/utils/applicant';
import { Divider } from '@nextui-org/react';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/signin');
  const [applicantJobInfo, step] = await getApplicantJobInfo(session.id);
  if (!step || step < 4) redirect('/captacion/postulacion');
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información laboral</h1>
      <Divider />
      <JobInfoForm applicantJobInfo={applicantJobInfo} applicantId={session.id} />
    </div>
  );
};

export default page;
