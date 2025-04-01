'use server';
import { getServerSession } from "@/lib/auth/authOptions";
import { AdditionalInfo, Annexes, CollageInfo, HighSchool, JobInfo, LanguageKnowledge, Prisma, RecruitmentStatus } from "@prisma/client";
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
      image: applicantPersonalInfo.photo,
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
    await prisma.user.update({
      where: { id: applicantId },
      data: { email: applicantContactInfo.email }
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


export const checkIfEmailExist = async (email: string) => {
  const session = await getServerSession();
  if (!session) {
    throw new Error('No active session found');
  }

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) return false;
  if (user.id === session.id) return false;
  return true;
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

export const getApplicantLangInfo = async (applicantId: string): Promise<[LanguageKnowledge | undefined, number | undefined]> => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId,
    },
    select: {
      step: true,
      languageKnowledge: true,
    },
  });

  return [applicant?.languageKnowledge ? applicant?.languageKnowledge : undefined, applicant?.step];
}


export const createOrUpdateLangInfo = async (applicantId: string, applicantLangInfo: Prisma.LanguageKnowledgeCreateInput | Prisma.LanguageKnowledgeUpdateInput) => {
  await prisma.$transaction(async (prisma) => {
    const applicant = await prisma.applicant.findUniqueOrThrow({
      where: { id: applicantId },
      select: { step: true },
    });

    const updateData: any = {
      languageKnowledge: {
        upsert: {
          create: applicantLangInfo as Prisma.LanguageKnowledgeCreateInput,
          update: applicantLangInfo as Prisma.LanguageKnowledgeUpdateInput,
        },
      },
    };

    if (applicant.step < 6) updateData.step = 6;

    await prisma.applicant.update({
      where: { id: applicantId },
      data: updateData,
    });
  });
}

export const getApplicantHighSchoolInfo = async (applicantId: string): Promise<[HighSchool | undefined, number | undefined]> => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId,
    },
    select: {
      step: true,
      highSchool: true,
    },
  });

  return [applicant?.highSchool ? applicant?.highSchool : undefined, applicant?.step];
}

export const createOrUpdateHighSchoolInfo = async (applicantId: string, applicantHighSchoolInfo: Prisma.HighSchoolCreateInput | Prisma.HighSchoolUpdateInput) => {
  await prisma.$transaction(async (prisma) => {
    const applicant = await prisma.applicant.findUniqueOrThrow({
      where: { id: applicantId },
      select: { step: true },
    });

    const updateData: any = {
      highSchool: {
        upsert: {
          create: applicantHighSchoolInfo as Prisma.HighSchoolCreateInput,
          update: applicantHighSchoolInfo as Prisma.HighSchoolUpdateInput,
        },
      },
    };

    if (applicant.step < 7) updateData.step = 7;

    await prisma.applicant.update({
      where: { id: applicantId },
      data: updateData,
    });
  });
}

export const getApplicantCollageInfo = async (applicantId: string): Promise<[CollageInfo | undefined, number | undefined]> => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId,
    },
    select: {
      step: true,
      collageInfo: true,
    },
  });

  return [applicant?.collageInfo ? applicant?.collageInfo : undefined, applicant?.step]
}

export const createOrUpdateCollageInfo = async (applicantId: string, applicantCollageInfo: Prisma.CollageInfoCreateInput | Prisma.CollageInfoUpdateInput) => {
  await prisma.$transaction(async (prisma) => {
    const applicant = await prisma.applicant.findUniqueOrThrow({
      where: { id: applicantId },
      select: { step: true },
    });

    const updateData: any = {
      collageInfo: {
        upsert: {
          create: applicantCollageInfo as Prisma.CollageInfoCreateInput,
          update: applicantCollageInfo as Prisma.CollageInfoUpdateInput,
        },
      },
    };

    if (applicant.step < 8) updateData.step = 8;

    await prisma.applicant.update({
      where: { id: applicantId },
      data: updateData,
    });
  });
}

export const getApplicantAdditionalInfo = async (applicantId: string): Promise<[AdditionalInfo | undefined, number | undefined]> => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId,
    },
    select: {
      step: true,
      additionalInfo: true,
    },
  });

  return [applicant?.additionalInfo ? applicant?.additionalInfo : undefined, applicant?.step];
}

export const createOrUpdateAdditionalInfo = async (applicantId: string, applicantAdditionalInfo: Prisma.AdditionalInfoCreateInput | Prisma.AdditionalInfoUpdateInput) => {
  await prisma.$transaction(async (prisma) => {
    const applicant = await prisma.applicant.findUniqueOrThrow({
      where: { id: applicantId },
      select: { step: true },
    });

    const updateData: any = {
      additionalInfo: {
        upsert: {
          create: applicantAdditionalInfo as Prisma.AdditionalInfoCreateInput,
          update: applicantAdditionalInfo as Prisma.AdditionalInfoUpdateInput,
        },
      },
    };

    if (applicant.step < 9) updateData.step = 9;

    await prisma.applicant.update({
      where: { id: applicantId },
      data: updateData,
    });
  });
}

export const getApplicantAnnexes = async (applicantId: string): Promise<[Annexes | undefined, number | undefined]> => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId,
    },
    select: {
      step: true,
      annexes: true,
    },
  });

  return [applicant?.annexes ? applicant?.annexes : undefined, applicant?.step];
}


export const createOrUploadAnnexes = async (applicantId: string, applicantAnnexes: Prisma.AnnexesCreateInput | Prisma.AnnexesUpdateInput) => {
  await prisma.applicant.update({
    where: { id: applicantId },
    data: {
      annexes: {
        upsert: {
          create: applicantAnnexes as Prisma.AnnexesCreateInput,
          update: applicantAnnexes as Prisma.AnnexesUpdateInput,
        },
      },
    },
  });
}

export const finishApplication = async (applicantId: string, endTime: string) => {
  await prisma.applicant.update({
    where: { id: applicantId },
    data: {
      endTime: endTime,
      status: 'PHASE_II_PENDING',
    },
  });
}


export const getApplicantsWithAllInfo = async () => {
  const session = await getServerSession();
  const applicants = await prisma.applicant.findMany({
    where: {
      chapterId: session?.chapterId
    },
    include: {
      personal: true,
      ContactInfo: true,
      familyInfo: true,
      jobInfo: true,
      languageKnowledge: true,
      highSchool: true,
      collageInfo: true,
      additionalInfo: true,
      annexes: true,
    }
  });

  return applicants;

}

export const getApplicantById = async (applicantId: string) => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      id: applicantId
    },
    include: {
      personal: true,
      ContactInfo: true,
      familyInfo: true,
      jobInfo: true,
      languageKnowledge: true,
      highSchool: true,
      collageInfo: true,
      additionalInfo: true,
      annexes: true,
      user: true
    }
  });

  return applicant;
}


export const addApplicantComment = async (applicantId: string, comment: string, status: RecruitmentStatus) => {
  await prisma.applicant.update({
    where: { id: applicantId },
    data: {
      status: status,
      comment: comment,
    },
  });
}


export async function getApplicationStatusMetrics() {

  const session = await getServerSession()
  const chapterId = session?.chapterId


  const result = await prisma.$transaction(async (prisma) => {

    const totalApplicants = await prisma.applicant.count(
      {
        where: {
          chapterId
        }
      }
    );

    const statusCounts = await prisma.applicant.groupBy({
      by: ['status'],
      _count: {
        id: true
      },
      where: {
        chapterId
      }
    });

    const completionCounts = await prisma.applicant.groupBy({
      by: ['step'],
      _count: {
        id: true
      },
      where: {
        chapterId
      }
    });

    const completedApplications = await prisma.applicant.count({
      where: {
        chapterId,
        endTime: {
          not: null
        }
      }
    });

    const avgCompletionTimeResult = await prisma.applicant.findMany({
      where: {
        chapterId,
        endTime: {
          not: null
        }
      },
      select: {
        startTime: true,
        endTime: true
      }
    })
    return {
      totalApplicants,
      statusCounts,
      completionCounts,
      completedApplications,
      avgCompletionTimeResult
    }
  })

  const { totalApplicants, statusCounts, completionCounts, completedApplications, avgCompletionTimeResult } = result

  // give me this information in days
  const avgCompletionTimeInMinutes = avgCompletionTimeResult.reduce((acc, item) => acc + (item.endTime!.getTime() - item.startTime!.getTime()) / 60000, 0) / avgCompletionTimeResult.length;
  // Convert to hours if needed
  const avgCompletionTimeInHours = avgCompletionTimeInMinutes / 60;
  const avgCompletionTimeInDays = avgCompletionTimeInHours / 24;


  return {
    totalApplicants,
    statusCounts: statusCounts.map(item => ({
      status: item.status,
      count: item._count.id
    })),
    completionCounts: completionCounts.map(item => ({
      step: item.step,
      count: item._count.id
    })),
    completedApplications,
    incompletedApplications: totalApplicants - completedApplications,
    avgCompletionTimeInHours: avgCompletionTimeInDays.toFixed(0)
  };
}