import CombinedColumns from '@/components/table/columns/applicant/applicants';
import Table from '@/components/table/Table';
import { getBlobImage } from '@/lib/azure/azure';
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
      applicant.dniCard = await getBlobImage(applicant?.dniCard);
      applicant.rif = await getBlobImage(applicant?.rif);
      applicant.highSchoolGrades = await getBlobImage(applicant?.highSchoolGrades);
      applicant.universityGrades = await getBlobImage(applicant?.universityGrades);
      applicant.studyProof = await getBlobImage(applicant?.studyProof);
      applicant.professorReferenceLetterI = await getBlobImage(applicant.professorReferenceLetterI);
      applicant.professorReferenceLetterII = await getBlobImage(
        applicant.professorReferenceLetterII
      );
      applicant.utilityBillVerification = await getBlobImage(applicant.utilityBillVerification);
      applicant.personalEssay = await getBlobImage(applicant?.personalEssay);
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
