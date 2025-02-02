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
    flattenedApplicants.map(async (applicant: { photo: string | null }) => {
      applicant.photo = await getBlobImage(applicant.photo);
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
