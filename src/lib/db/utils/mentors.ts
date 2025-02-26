'use server';
import { getServerSession } from '@/lib/auth/authOptions';
import { Mentor, MentorStatus, MetorRecruitmentStatus, Prisma } from '@prisma/client';
import { prisma } from './prisma';



export const getActiveMentors = async (): Promise<Mentor | null> => {
  const session = await getServerSession();
  const chapterId = session?.chapterId;
  try {
    const mentors = await prisma.mentor.findMany({
      where: {
        chapter: chapterId,
      }
    });
    return mentors;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const getNewMentors = async (): Promise<Mentor | null> => {
  const session = await getServerSession();
  const chapterId = session?.chapterId;
  try {
    const mentors = await prisma.mentor.findMany({
      where: {
        chapter: chapterId,
        OR: [
          {
            recruitment_status: 'PENDING'
          },
          {
            recruitment_status: 'NOT_ACCEPTED'
          }
        ]

      },
    });
    return mentors;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const changeMentorRecruitmentStatus = async (id: string, status: MetorRecruitmentStatus) => {
  const mentor = await prisma.mentor.update({
    where: {
      id,
    },
    data: {
      recruitment_status: status,
    },
  });
  return mentor;
}

export const changeMentorStatus = async (id: string, status: MentorStatus) => {
  const mentor = await prisma.mentor.update({
    where: {
      id,
    },
    data: {
      status: status,
    },
  });
  return mentor;
}

export const changeMentorMenteeBol = async (id: string, newMentee: boolean) => {
  const mentor = await prisma.mentor.update({
    where: {
      id,
    },
    data: {
      newMentee: newMentee,
    },
  });
  return mentor;
}

export const getMentor = async (id: string) => {
  const mentor = await prisma.mentor.findUnique({
    where: {
      id,
    },
  });
  return mentor;
};




export const createMentor = async (mentor: Prisma.MentorCreateInput) => {
  const newMentor = await prisma.mentor.create({
    data: mentor,
  });
  return newMentor;
}