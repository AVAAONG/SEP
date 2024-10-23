'use server';
import { Mentor, MetorRecruitmentStatus, Prisma } from '@prisma/client';
import { prisma } from './prisma';

export const getMentors = async (): Promise<Mentor | null> => {
  try {
    const mentors = await prisma.mentor.findMany();
    return mentors;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const getNewMentors = async (): Promise<Mentor | null> => {
  try {
    const mentors = await prisma.mentor.findMany({
      where: {
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