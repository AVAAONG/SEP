import CombinedColumns from '@/components/table/columns/applicant/applicants';
import Table from '@/components/table/Table';
import { getBlobFile, getBlobImage } from '@/lib/azure/azure';
import { getApplicantsWithAllInfo } from '@/lib/db/utils/applicant';
const flattenApplicantData = (applicant) => {
  return {
    ...applicant,
    ...applicant.personal,
    ...applicant.ContactInfo,
    ...applicant.familyInfo,
    ...applicant.jobInfo,
    ...applicant.languageKnowledge,
    ...applicant.highSchool,
    ...applicant.additionalInfo,
    ...applicant.collageInfo,
    ...applicant.annexes,
  };
};

const page = async () => {
  const applicants = await getApplicantsWithAllInfo();
  const flattenedApplicants = applicants.map(flattenApplicantData);
  await Promise.all(
    flattenedApplicants.map(async (applicant: any) => {
      applicant.photo = await getBlobImage(applicant.photo);
      applicant.annexes.dniCard = await getBlobFile(applicant.annexes.dniCard);
      applicant.annexes.rif = await getBlobFile(applicant.annexes.rif);
      applicant.annexes.highSchoolGrades = await getBlobFile(applicant.annexes.highSchoolGrades);
      applicant.annexes.universityGrades = await getBlobFile(applicant.annexes.universityGrades);
      applicant.annexes.studyProof = await getBlobFile(applicant.annexes.studyProof);
      applicant.annexes.professorReferenceLetterI = await getBlobFile(
        applicant.annexes.professorReferenceLetterI
      );
      applicant.annexes.professorReferenceLetterII = await getBlobFile(
        applicant.annexes.professorReferenceLetterII
      );
      applicant.annexes.utilityBillVerification = await getBlobFile(
        applicant.annexes.utilityBillVerification
      );
      applicant.annexes.personalEssay = await getBlobFile(applicant.annexes.personalEssay);
    })
  );

  return (
    <div className="w-full ">
      <Table
        tableData={flattenedApplicants}
        tableColumns={CombinedColumns}
        tableHeadersForSearch={[]}
      />
    </div>
  );
};

export default page;
