import CombinedColumns from '@/components/table/columns/applicant/applicants';
import Table from '@/components/table/Table';
import { getBlobImage } from '@/lib/azure/azure';
import { getApplicantsWithAllInfo, getApplicationStatusMetrics } from '@/lib/db/utils/applicant';

const page = async () => {
  const metrics = await getApplicationStatusMetrics();
  const applicants = await getApplicantsWithAllInfo();

  // Flatten applicant data and fetch blob images in a single operation
  const flattenedApplicants = await Promise.all(
    applicants.map(async (applicant: any) => {
      // First flatten the applicant data
      const flattenedApplicant = {
        applicantId: applicant.id,
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

      // Then fetch all blob images in the same operation
      flattenedApplicant.photo = await getBlobImage(flattenedApplicant.photo);
      flattenedApplicant.dniCard = await getBlobImage(flattenedApplicant?.dniCard);
      flattenedApplicant.rif = await getBlobImage(flattenedApplicant?.rif);
      flattenedApplicant.highSchoolGrades = await getBlobImage(
        flattenedApplicant?.highSchoolGrades
      );
      flattenedApplicant.universityGrades = await getBlobImage(
        flattenedApplicant?.universityGrades
      );
      flattenedApplicant.studyProof = await getBlobImage(flattenedApplicant?.studyProof);
      flattenedApplicant.professorReferenceLetterI = await getBlobImage(
        flattenedApplicant.professorReferenceLetterI
      );
      flattenedApplicant.professorReferenceLetterII = await getBlobImage(
        flattenedApplicant.professorReferenceLetterII
      );
      flattenedApplicant.utilityBillVerification = await getBlobImage(
        flattenedApplicant.utilityBillVerification
      );
      flattenedApplicant.personalEssay = await getBlobImage(flattenedApplicant?.personalEssay);

      return flattenedApplicant;
    })
  );

  return (
    <div className=" space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm">Postulaciones totales</h3>
          <p className="text-3xl font-bold">{metrics.totalApplicants}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm">Postulaciones completadas</h3>
          <p className="text-3xl font-bold">{metrics.completedApplications}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm">Postulaciones en progreso</h3>
          <p className="text-3xl font-bold">{metrics.incompletedApplications}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm">Tasa de completación</h3>
          <p className="text-3xl font-bold">
            {metrics.totalApplicants
              ? Math.round((metrics.completedApplications / metrics.totalApplicants) * 100)
              : 0}
            %
          </p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm">Tiempo promedio</h3>
          <p className="text-3xl font-bold">{metrics.avgCompletionTimeInHours} dias</p>
        </div>
      </div>
      <Table
        tableData={flattenedApplicants}
        tableColumns={CombinedColumns}
        tableHeadersForSearch={[]}
      />
    </div>
  );
};

export default page;
