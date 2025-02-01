import ContactInfoForm from '@/components/catchment/formSections/contactInfo/ContactInfoForm';
import { getServerSession } from '@/lib/auth/authOptions';
import { getApplicantContactInfo } from '@/lib/db/utils/applicant';
import { Divider } from '@nextui-org/react';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect ('/signin');
  const applicantContactInfo = await getApplicantContactInfo(session.id);
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información de contacto</h1>
      <Divider />
      <ContactInfoForm applicantContactInfo={applicantContactInfo} applicantId={session.id}/>
    </div>
  );
};

export default page;
