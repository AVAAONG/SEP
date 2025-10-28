// function that migrates applicants to scholars in the database based on a predefined set of DNIs

import {
  Collages,
  EvaluationScale,
  KinOfUser,
  KindOfCollage,
  RecruitmentStatus,
  ScholarCondition,
  ScholarStatus,
  StudyArea,
  StudyRegime,
} from '@prisma/client';

import { prisma } from './db/utils/prisma';


//we should change this set with the DNIs of the applicants we want to migrate
const TARGET_DNIS = new Set([
  '30107924',
  '31390076',
  '31420592',
  '30723085',
  '30307291',
  '30715442',
  '30112268',
  '30821141',
  '30651832',
  '30730501',
  '30678944',
  '30751355',
  '31518216',
  '31852310',
  '31323783',
  '30603087',
  '30590385',
  '32401366',
  '30416464',
  '31961906',
  '31307006',
  '31481858',
  '31291632',
  '31979185',
  '30600554',
  '31088200',
  '32504202',
  '31980322',
  '31839186',
  '31852194',
  '32455028',
  '30730290',
  '29983274',
]);

const parseScholarCondition = (status?: RecruitmentStatus | null): ScholarCondition => {
  switch (status) {
    case RecruitmentStatus.PHASE_II_REJECTED:
    case RecruitmentStatus.PHASE_III_REJECTED:
      return ScholarCondition.WITHDRAWAL;
    default:
      return ScholarCondition.ACTIVE;
  }
};

const parseStudyRegime = (regime?: StudyRegime | null): StudyRegime => regime ?? StudyRegime.SEMESTER;

const parseStudyArea = (area?: StudyArea | null): StudyArea => area ?? StudyArea.OTHER;

const parseEvaluationScale = (collage?: Collages | null): EvaluationScale => {
  switch (collage) {
    case Collages.USB:
      return EvaluationScale.CERO_TO_FIVE;
    case Collages.UPEL:
      return EvaluationScale.CERO_TO_TEN;
    default:
      return EvaluationScale.CERO_TO_TWENTY;
  }
};

const parseCollage = (value?: string | null): Collages | undefined => {
  if (!value) return undefined;
  const normalized = value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\s+/g, '_');
  if ((Collages as Record<string, Collages>)[normalized]) {
    return (Collages as Record<string, Collages>)[normalized];
  }

  const mapping: Record<string, Collages> = {
    UNIVERSIDAD_CATOLICA_ANDRES_BELLO: Collages.UCAB,
    UNIVERSIDAD_SIMON_BOLIVAR: Collages.USB,
    UNIVERSIDAD_MONTEAVILA: Collages.UMA,
    UNIVERSIDAD_CENTRAL_DE_VENEZUELA: Collages.UCV,
    UNIVERSIDAD_ANDRES_BELLO: Collages.UCAB,
    UNIVERSIDAD_METROPOLITANA: Collages.UNIMET,
  };

  return mapping[normalized] ?? undefined;
};

const parseKindOfCollage = (value?: KindOfCollage | null): KindOfCollage => value ?? KindOfCollage.PRIVATE;

const buildCollageData = (
  collage?: {
    collage: string;
    career: string;
    studyArea: StudyArea | null;
    studyRegime: StudyRegime | null;
    kindOfCollage: KindOfCollage | null;
    collageStartDate: Date | null;
  } | null,
) => {
  if (!collage) return undefined;

  const parsedCollage = parseCollage(collage.collage);

  return {
    create: {
      collage: parsedCollage,
      career: collage.career,
      study_area: parseStudyArea(collage.studyArea),
      study_regime: parseStudyRegime(collage.studyRegime),
      evaluation_scale: parseEvaluationScale(parsedCollage ?? null),
      kind_of_collage: parseKindOfCollage(collage.kindOfCollage),
      collage_start_date: collage.collageStartDate ?? undefined,
    },
  };
};

const migrateApplicantsToScholars = async () => {
  const applicants = await prisma.applicant.findMany({
    where: {
      user: {
        is: {
          kind_of_user: KinOfUser.APPLICANT,
        },
      },
    },
    include: {
      personal: true,
      ContactInfo: true,
      collageInfo: true,
      user: true,
    },
  });

  const migratable = applicants.filter((applicant) => {
    const dni = applicant.personal?.dni;
    return dni ? TARGET_DNIS.has(dni) : false;
  });

  const migrated: string[] = [];
  const skipped: string[] = [];

  for (const applicant of migratable) {
    const { personal, ContactInfo: contactInfo, collageInfo, user } = applicant;
    if (!personal) {
      skipped.push(`Applicant ${applicant.id} skipped: missing personal info.`);
      continue;
    }

    const existing = await prisma.scholar.findUnique({ where: { dni: personal.dni } });
    if (existing) {
      skipped.push(`Applicant ${applicant.id} skipped: scholar already exists.`);
      continue;
    }

    const avaaStartedDate = applicant.startTime ?? new Date();
    const scholarCondition = parseScholarCondition(applicant.status);
    const chapterID = applicant.chapterId;
    const isInCVA = 'No';

    try {
      const createdScholar = await prisma.$transaction(async (tx) => {
        const scholar = await tx.scholar.create({
          data: {
            id: applicant.id,
            first_names: personal.firstNames,
            photo: personal.photo,
            last_names: personal.lastNames,
            dni: personal.dni,
            gender: personal.gender,
            birthdate: personal.birthdate,
            state: personal.state,
            address: personal.address,
            local_phone_number: contactInfo?.localPhoneNumber,
            cell_phone_Number: contactInfo?.parentalPhoneNumber,
            whatsapp_number: contactInfo?.whatsAppPhoneNumber,
            email: contactInfo?.email,

            program_information: {
              create: {
                id: applicant.id,
                is_chat_speaker: false,
                program_admission_date: new Date(avaaStartedDate),
                scholar_condition: scholarCondition,
                scholar_status: ScholarStatus.NORMAL,
                chapter: chapterID
                  ? {
                    connect: {
                      id: chapterID,
                    },
                  }
                  : undefined,
              },
            },
            collage_information: buildCollageData(collageInfo),
            cva_information: {

              create: {
                id: applicant.id,
                is_in_cva: isInCVA === 'No' ? false : true,
              },
            },
            user: user
              ? {
                connect: { id: user.id },
              }
              : undefined,
          },
        });

        if (user) {
          await tx.user.update({
            where: { id: user.id },
            data: {
              id: applicant.id,
              kind_of_user: KinOfUser.SCHOLAR,
            },
          });
        }

        return scholar;
      });

      migrated.push(`Scholar created for applicant ${applicant.id} with dni ${createdScholar.dni}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      skipped.push(`Applicant ${applicant.id} failed: ${message}`);
    }
  }

  return { migrated, skipped };
};

const main = async () => {
  try {
    const { migrated, skipped } = await migrateApplicantsToScholars();
    migrated.forEach((msg) => console.log(`✅ ${msg}`));
    skipped.forEach((msg) => console.warn(`⚠️ ${msg}`));
  } finally {
    await prisma.$disconnect();
  }
};

void main();
