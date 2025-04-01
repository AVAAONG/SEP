import ApplicantStatusButton from '@/components/catchment/applicant-status-button';
import { getBlobImage } from '@/lib/azure/azure';
import { getApplicantById } from '@/lib/db/utils/applicant';
import formatDni from '@/lib/db/utils/formatDni';
import {
  parseKindOfCollageFromDatabase,
  parseStudiRegimeFromDatabase,
  parseStudyAreaFromDatabase,
} from '@/lib/utils/parseFromDatabase';
import { parseModalityFromDatabase } from '@/lib/utils2';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { Avatar, Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <Card className="w-full mb-6 shadow-sm" radius="sm">
      <CardHeader className="flex gap-3 px-6 py-4 bg-primary/5">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{title}</p>
        </div>
      </CardHeader>
      <CardBody className="px-6 py-4">{children}</CardBody>
    </Card>
  );
};

type InfoItemProps = {
  label: string;
  value: React.ReactNode;
  col?: boolean;
};

const InfoItem = ({ label, value, col = true }: InfoItemProps) => {
  return (
    <div className={`${col ? 'flex flex-col' : 'grid grid-cols-2'} mb-2`}>
      <span className="text-sm font-bold text-black">{label}</span>
      <span className={`text-sm ${col ? 'mt-1' : ''}`}>{value || 'No disponible'}</span>
    </div>
  );
};

async function ApplicantProfilePage({ params }: { params: { id: string } }) {
  const applicant = await getApplicantById(params.id);

  if (!applicant || !applicant.personal) {
    notFound();
  }

  // Format gender enum for display
  const formatGender = (gender: string) => {
    return gender === 'M'
      ? 'Masculino'
      : gender === 'F'
        ? 'Femenino'
        : gender === 'O'
          ? 'Otro'
          : gender;
  };

  // Format date for display
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'No disponible';
    return format(date, 'dd/MM/yyyy');
  };

  // Format housing enum values
  const formatHousing = {
    OWNED: 'Propia',
    RENTED: 'Alquilada',
    MORTGAGED: 'Hipotecada',
  };

  // Format living situation enum values
  const formatLivingWith = {
    PARENTS: 'Padres',
    RELATIVES: 'Familiares',
    OTHERS: 'Otros',
  };

  // Format modality enum values
  const formatModality = {
    REMOTE: 'Remoto',
    PRESENTIAL: 'Presencial',
    HYBRID: 'Híbrido',
  };

  // Format job schedule enum values
  const formatJobSchedule = {
    PART_TIME: 'Medio tiempo',
    FULL_TIME: 'Tiempo completo',
  };

  // Format institution dependency enum values
  const formatInstitutionDependency = {
    PUBLIC: 'Pública',
    PRIVATE: 'Privada',
    SUBSIDY: 'Subsidiada',
  };

  // Format graduation title enum values
  const formatGraduationTitle = {
    BACHELOR_IN_SCIENCE: 'Bachiller en Ciencias',
    MEDIAN_TECHNICIAN: 'Técnico Medio',
  };

  // Format level enum values for language
  const formatLanguageLevel = {
    BASIC: 'Básico',
    INTERMEDIATE: 'Intermedio',
    ADVANCED: 'Avanzado',
    NATIVE: 'Nativo',
  };

  // Format internet connection stability enum values
  const formatInternetStability = {
    VERY_STABLE: 'Muy estable',
    STABLE: 'Estable',
    UNSTABLE: 'Inestable',
    VERY_UNSTABLE: 'Muy inestable',
  };

  // Format program discovery source enum values
  const formatDiscoverySource = {
    FRIEND_RELATIVE: 'Amigo o familiar',
    MEDIA: 'Medios de comunicación',
    AVAA_WEBSITE: 'Sitio web de AVAA',
    INSTAGRAM: 'Instagram',
    LINKEDIN: 'LinkedIn',
    TWITTER: 'Twitter',
    YOUTUBE: 'YouTube',
    INTERNET_SEARCH: 'Búsqueda en Internet',
  };

  const profilePic = (await getBlobImage(applicant.personal.photo)) ?? undefined;

  // Pre-compute blob URLs for annex files
  const annexes = applicant.annexes;
  const dniCardUrl = annexes?.dniCard ? await getBlobImage(annexes.dniCard) : null;
  const rifUrl = annexes?.rif ? await getBlobImage(annexes.rif) : null;
  const highSchoolGradesUrl = annexes?.highSchoolGrades
    ? await getBlobImage(annexes.highSchoolGrades)
    : null;
  const universityGradesUrl = annexes?.universityGrades
    ? await getBlobImage(annexes.universityGrades)
    : null;
  const studyProofUrl = annexes?.studyProof ? await getBlobImage(annexes.studyProof) : null;
  const professorReferenceLetterIUrl = annexes?.professorReferenceLetterI
    ? await getBlobImage(annexes.professorReferenceLetterI)
    : null;
  const professorReferenceLetterIIUrl = annexes?.professorReferenceLetterII
    ? await getBlobImage(annexes.professorReferenceLetterII)
    : null;
  const utilityBillVerificationUrl = annexes?.utilityBillVerification
    ? await getBlobImage(annexes.utilityBillVerification)
    : null;
  const personalEssayUrl = annexes?.personalEssay
    ? await getBlobImage(annexes.personalEssay)
    : null;

  return (
    <div className=" mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar - Fixed while scrolling */}
        <div className="md:w-1/3 lg:w-1/4">
          <div className="sticky top-20">
            <Card className="w-full mb-6 overflow-hidden shadow-sm" radius="sm">
              <CardBody className="p-0">
                <div className="relative h-32 bg-gradient-to-r from-green-600 to-green-400">
                  {/* Background gradient banner */}
                </div>
                <div className="flex flex-col items-center px-6 pt-0 pb-6 -mt-24">
                  <Avatar
                    className="w-60 h-60 border-4 border-white shadow-xl"
                    src={profilePic}
                    showFallback
                    name={`${applicant.personal.firstNames.charAt(0)}${applicant.personal.lastNames.charAt(0)}`}
                  />
                  <h2 className="mt-4 text-xl font-bold text-center">
                    {applicant.personal.firstNames} {applicant.personal.lastNames}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {applicant.collageInfo?.career || 'No especificada'}
                  </p>
                  <div className="mt-2">
                    <Chip color="secondary" variant="flat" className="text-xs">
                      {applicant.status}
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="w-full mb-6 shadow-sm" radius="sm">
              <CardHeader className="flex gap-3 px-6 py-4 bg-primary/5">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Información de Contacto</p>
                </div>
              </CardHeader>
              <CardBody className="px-6 py-4">
                <div className="flex items-center mb-3">
                  <span className="mr-2">
                    <EnvelopeIcon className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-sm truncate">
                    {applicant.ContactInfo?.email || 'No disponible'}
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="mr-2">
                    <PhoneIcon className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-sm truncate">
                    {applicant.ContactInfo?.localPhoneNumber || 'No disponible'}
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="mr-2">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-sm truncate">
                    {applicant.ContactInfo?.whatsAppPhoneNumber || 'No disponible'}
                  </span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="md:w-2/3 lg:w-3/4">
          <div className="mb-4">
            <ApplicantStatusButton applicantId={applicant.id} status={applicant.status} />
          </div>

          <Section title="Información universitaria">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoItem
                label="Tipo de institución"
                value={parseKindOfCollageFromDatabase(applicant.collageInfo?.kindOfCollage)}
              />
              <InfoItem
                label="Universidad"
                value={applicant.collageInfo?.collage || 'No disponible'}
              />
              <InfoItem
                label="Área de estudio"
                value={parseStudyAreaFromDatabase(applicant.collageInfo?.studyArea)}
              />
              <InfoItem
                label="Régimen de estudios"
                value={parseStudiRegimeFromDatabase(applicant.collageInfo?.studyRegime)}
              />
              <InfoItem label="Carrera" value={applicant.collageInfo?.career || 'No disponible'} />
              <InfoItem
                label="Inicio de estudios"
                value={formatDate(applicant.collageInfo?.collageStartDate)}
              />
              <InfoItem
                label="Periodo académico actual"
                value={applicant.collageInfo?.currentAcademicPeriod || 'No disponible'}
              />
              <InfoItem label="Promedio" value={applicant.collageInfo?.grade} />
              <InfoItem
                label="Modalidad"
                value={parseModalityFromDatabase(applicant.collageInfo?.classModality)}
              />
              <InfoItem
                label="¿Posee beca?"
                value={applicant.collageInfo?.haveScholarship ? 'Sí' : 'No'}
              />
              {applicant.collageInfo?.haveScholarship && (
                <InfoItem
                  label="Porcentaje de beca"
                  value={`${applicant.collageInfo?.scholarshipPercentage || 0}%`}
                />
              )}
            </div>
          </Section>

          <Section title="Información personal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Nombres" value={applicant.personal.firstNames} />
              <InfoItem label="Apellidos" value={applicant.personal.lastNames} />
              <InfoItem label="Documento de Identidad" value={formatDni(applicant.personal.dni)} />
              <InfoItem label="Género" value={formatGender(applicant.personal.gender)} />
              <InfoItem
                label="Fecha de Nacimiento"
                value={formatDate(applicant.personal.birthdate)}
              />
              <InfoItem label="Estado" value={applicant.personal.state} />
              <div className="col-span-1 md:col-span-2">
                <InfoItem label="Dirección" value={applicant.personal.address} col={true} />
              </div>
            </div>
          </Section>

          <Section title="Información familiar">
            {applicant.familyInfo ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoItem
                  label="Ingreso familiar promedio"
                  value={`${applicant.familyInfo.averageFamilyIncome}`}
                />
                <InfoItem
                  label="Con quién vive"
                  value={
                    formatLivingWith[
                      applicant.familyInfo.whitWhoDoYouLive as keyof typeof formatLivingWith
                    ]
                  }
                />
                <InfoItem
                  label="Tipo de vivienda"
                  value={
                    formatHousing[applicant.familyInfo.kindOfHouse as keyof typeof formatHousing]
                  }
                />
                <InfoItem
                  label="Contribuye al ingreso familiar"
                  value={applicant.familyInfo.contributeToFamilyIncome ? 'Sí' : 'No'}
                />
                <div className="col-span-1 md:col-span-2">
                  <InfoItem
                    label="Miembros de la familia"
                    value={applicant.familyInfo.familyMembers}
                    col={true}
                  />
                </div>
                {applicant.familyInfo.fatherJob && (
                  <>
                    <InfoItem label="Trabajo del padre" value={applicant.familyInfo.fatherJob} />
                    <InfoItem
                      label="Compañía del padre"
                      value={applicant.familyInfo.fathersCompanyName}
                    />
                  </>
                )}
                {applicant.familyInfo.motherJob && (
                  <>
                    <InfoItem label="Trabajo de la madre" value={applicant.familyInfo.motherJob} />
                    <InfoItem
                      label="Compañía de la madre"
                      value={applicant.familyInfo.mothersCompanyName}
                    />
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay información familiar disponible.</p>
            )}
          </Section>

          <Section title="Información laboral">
            {applicant.jobInfo ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label="Trabaja actualmente"
                  value={applicant.jobInfo.currentlyWorking ? 'Sí' : 'No'}
                />
                {applicant.jobInfo.currentlyWorking && (
                  <>
                    <InfoItem label="Empresa" value={applicant.jobInfo.jobCompany} />
                    <InfoItem label="Puesto" value={applicant.jobInfo.jobTitle} />
                    <InfoItem
                      label="Modalidad"
                      value={
                        applicant.jobInfo.jobModality
                          ? formatModality[
                              applicant.jobInfo.jobModality as keyof typeof formatModality
                            ]
                          : 'No disponible'
                      }
                    />
                    <InfoItem
                      label="Horario"
                      value={
                        applicant.jobInfo.jobSchedule
                          ? formatJobSchedule[
                              applicant.jobInfo.jobSchedule as keyof typeof formatJobSchedule
                            ]
                          : 'No disponible'
                      }
                    />
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay información laboral disponible.</p>
            )}
          </Section>

          <Section title="Conocimientos de idiomas">
            {applicant.languageKnowledge ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label="Habla otro idioma"
                  value={applicant.languageKnowledge.speaksOtherLanguage ? 'Sí' : 'No'}
                />
                {applicant.languageKnowledge.speaksOtherLanguage && (
                  <>
                    <InfoItem
                      label="Idioma"
                      value={applicant.languageKnowledge.specifiedLanguage}
                    />
                    <InfoItem
                      label="Nivel"
                      value={
                        applicant.languageKnowledge.languageLevel
                          ? formatLanguageLevel[
                              applicant.languageKnowledge
                                .languageLevel as keyof typeof formatLanguageLevel
                            ]
                          : 'No disponible'
                      }
                    />
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay información sobre idiomas disponible.</p>
            )}
          </Section>

          <Section title="Bachillerato">
            {applicant.highSchool ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label="Nombre de la institución"
                  value={applicant.highSchool.institutionName}
                />
                <InfoItem
                  label="Dependencia de la institución"
                  value={
                    formatInstitutionDependency[
                      applicant.highSchool
                        .institutionDependency as keyof typeof formatInstitutionDependency
                    ]
                  }
                />
                <InfoItem label="Promedio" value={applicant.highSchool.gpa.toFixed(2)} />
                <InfoItem
                  label="Título"
                  value={
                    formatGraduationTitle[
                      applicant.highSchool.graduationTitle as keyof typeof formatGraduationTitle
                    ]
                  }
                />
                {applicant.highSchool.mention && (
                  <InfoItem label="Mención" value={applicant.highSchool.mention} />
                )}
                {applicant.highSchool.extracurricularActivities && (
                  <div className="col-span-1 md:col-span-2">
                    <InfoItem
                      label="Actividades extracurriculares"
                      value={applicant.highSchool.extracurricularActivities}
                      col={true}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No hay información de bachillerato disponible.
              </p>
            )}
          </Section>

          <Section title="Información adicional">
            {applicant.additionalInfo ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label="Tiene conexión a internet"
                  value={applicant.additionalInfo.hasInternetConnection ? 'Sí' : 'No'}
                />
                {applicant.additionalInfo.hasInternetConnection &&
                  applicant.additionalInfo.internetConnectionStability && (
                    <InfoItem
                      label="Estabilidad de la conexión"
                      value={
                        formatInternetStability[
                          applicant.additionalInfo
                            .internetConnectionStability as keyof typeof formatInternetStability
                        ]
                      }
                    />
                  )}
                <InfoItem
                  label="Cómo conoció el programa"
                  value={
                    formatDiscoverySource[
                      applicant.additionalInfo
                        .programDiscoverySource as keyof typeof formatDiscoverySource
                    ]
                  }
                />
                <InfoItem
                  label="Fue referido por un becario"
                  value={applicant.additionalInfo.isReferredByScholar ? 'Sí' : 'No'}
                />
                {applicant.additionalInfo.isReferredByScholar &&
                  applicant.additionalInfo.referredScholarName && (
                    <InfoItem
                      label="Nombre del becario"
                      value={applicant.additionalInfo.referredScholarName}
                    />
                  )}
                <div className="col-span-1 md:col-span-2">
                  <InfoItem
                    label="Razón para aplicar a la beca"
                    value={applicant.additionalInfo.scholarshipApplicationReason}
                    col={true}
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay información adicional disponible.</p>
            )}
          </Section>

          {annexes && (
            <Section title="Anexos">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {annexes.dniCard && (
                  <Link
                    target="_blank"
                    href={dniCardUrl || '#'}
                    className="flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Cédula</span>
                  </Link>
                )}
                {annexes.rif && (
                  <Link
                    target="_blank"
                    href={rifUrl || '#'}
                    className="flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">RIF</span>
                  </Link>
                )}
                {annexes.highSchoolGrades && (
                  <Link
                    target="_blank"
                    href={highSchoolGradesUrl || '#'}
                    className="flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Notas de Bachillerato</span>
                  </Link>
                )}
                {annexes.universityGrades && (
                  <Link
                    target="_blank"
                    href={universityGradesUrl || '#'}
                    className="flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Notas Universitarias</span>
                  </Link>
                )}
                {annexes.studyProof && (
                  <Link
                    target="_blank"
                    href={studyProofUrl || '#'}
                    className="flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Constancia de Estudios</span>
                  </Link>
                )}
                {annexes.professorReferenceLetterI && (
                  <Link
                    target="_blank"
                    href={professorReferenceLetterIUrl || '#'}
                    className="flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Carta de Referencia del Profesor I</span>
                  </Link>
                )}
                {annexes.professorReferenceLetterII && (
                  <Link
                    target="_blank"
                    href={professorReferenceLetterIIUrl || '#'}
                    className="flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Carta de Referencia del Profesor II</span>
                  </Link>
                )}
                {annexes.utilityBillVerification && (
                  <Link
                    target="_blank"
                    href={utilityBillVerificationUrl || '#'}
                    className="flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Factura de Servicios Públicos</span>
                  </Link>
                )}
                {annexes.personalEssay && (
                  <Link
                    target="_blank"
                    href={personalEssayUrl || '#'}
                    className="flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Ensayo Personal</span>
                  </Link>
                )}
              </div>
            </Section>
          )}
          {applicant.comment && (
            <Section title="Comentario">
              <div className="-mt-4">
                <p>{applicant.comment}</p>
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicantProfilePage;
