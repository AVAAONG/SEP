import AttachedFilesForm from '@/components/catchment/formSections/annexes/AnnexesForm';
import { getServerSession } from '@/lib/auth/authOptions';
import { getBlobFile } from '@/lib/azure/azure';
import { getApplicantAnnexes } from '@/lib/db/utils/applicant';
import { Divider } from "@heroui/react";
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/signin');
  const [applicantAnnexes, step] = await getApplicantAnnexes(session.id);
  if (!step || step < 9) redirect('/captacion/postulacion');
  //for each one of the anneces i want to get the blob

  const annexesBlobs: { [key: string]: string | undefined } | undefined = applicantAnnexes
    ? await Promise.all(
        Object.keys(applicantAnnexes).map(async (key: string) => {
          // if key is id then return the id
          if (key === 'id') return { id: applicantAnnexes.id };
          const blob = await getBlobFile(applicantAnnexes[key]);
          return { [key]: blob || undefined };
        })
      ).then((results) => Object.assign({}, ...results))
    : undefined;
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Anexos</h1>
      <Divider />
      <AttachedFilesForm applicantAnnexes={annexesBlobs} applicantId={session.id} />
    </div>
  );
};

export default page;
