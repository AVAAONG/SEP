'use server';
import { Prisma } from "@prisma/client";
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