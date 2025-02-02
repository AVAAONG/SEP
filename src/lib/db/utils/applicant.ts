'use server';
import { JobInfo, Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export const getApplicantPersonalInfo = async (applicantId: string) => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId,
    },
    include: {
      personal: true,
    },
  });
  const toReturn = applicant?.personal ? { ...applicant?.personal, chapterId: applicant?.chapterId } : undefined;

  return toReturn;
}

export const getApplicantCurrentStep = async (applicantId: string) => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId,
    },
    select: {
      step: true,
    },
  });

  return applicant?.step;
}

export const createOrUpdatePersonalInfo = async (applicantId: string, chapterId: string, applicantPersonalInfo: Prisma.PersonalInfoCreateInput | Prisma.PersonalInfoUpdateInput) => {
  await prisma.user.update({
    where: { id: applicantId }, data: {
      applicant: {
        upsert: {
          create: {
            id: applicantId,
            step: 2,
            chapterId: chapterId,
            personal: {
              create: applicantPersonalInfo as Prisma.PersonalInfoCreateInput
            }
          },
          update: {
            chapterId: chapterId,
            personal: {
              update: applicantPersonalInfo
            },
          }
        }
      }
    }
  });
}

export const createOrUpdateContactInfo = async (applicantId: string, applicantContactInfo: Prisma.ContactInfoCreateInput | Prisma.ContactInfoUpdateInput) => {
  await prisma.$transaction(async (prisma) => {
    const applicant = await prisma.applicant.findUniqueOrThrow({
      where: { id: applicantId },
      select: { step: true },
    });

    const updateData: any = {
      ContactInfo: {
        upsert: {
          create: applicantContactInfo as Prisma.ContactInfoCreateInput,
          update: applicantContactInfo as Prisma.ContactInfoUpdateInput,
        },
      },
    };

    if (applicant.step < 3) updateData.step = 3;

    await prisma.applicant.update({
      where: { id: applicantId },
      data: updateData,
    });
  });
};

export const getApplicantContactInfo = async (applicantId: string) => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId,
    },
    include: {
      ContactInfo: true,
    },
  });

  return applicant?.ContactInfo ? applicant?.ContactInfo : undefined
}


export const getApplicantFamilyInfo = async (applicantId: string) => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId,
    },
    select: {
      familyInfo: true,
    },
  });

  return applicant?.familyInfo ? applicant?.familyInfo : undefined;
}

export const createOrUpdateFamilyInfo = async (applicantId: string, applicantFamilyInfo: Prisma.FamilyInfoCreateInput | Prisma.FamilyInfoUpdateInput) => {
  await prisma.$transaction(async (prisma) => {
    const applicant = await prisma.applicant.findUniqueOrThrow({
      where: { id: applicantId },
      select: { step: true },
    });

    const updateData: any = {
      familyInfo: {
        upsert: {
          create: applicantFamilyInfo as Prisma.FamilyInfoCreateInput,
          update: applicantFamilyInfo as Prisma.FamilyInfoUpdateInput,
        },
      },
    };

    if (applicant.step < 4) updateData.step = 4;

    await prisma.applicant.update({
      where: { id: applicantId },
      data: updateData,
    });
  });
}

export const getApplicantJobInfo = async (applicantId: string): Promise<[JobInfo | undefined, number | undefined]> => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId,
    },
    select: {
      step: true,
      jobInfo: true,
    },
  });

  return [applicant?.jobInfo ? applicant?.jobInfo : undefined, applicant?.step];
}

export const createOrUpdateJobInfo = async (applicantId: string, applicantJobInfo: Prisma.JobInfoCreateInput | Prisma.JobInfoUpdateInput) => {
  await prisma.$transaction(async (prisma) => {
    const applicant = await prisma.applicant.findUniqueOrThrow({
      where: { id: applicantId },
      select: { step: true },
    });

    const updateData: any = {
      jobInfo: {
        upsert: {
          create: applicantJobInfo as Prisma.JobInfoCreateInput,
          update: applicantJobInfo as Prisma.JobInfoUpdateInput,
        },
      },
    };

    if (applicant.step < 5) updateData.step = 5;

    await prisma.applicant.update({
      where: { id: applicantId },
      data: updateData,
    });
  });
}
