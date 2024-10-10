'use server';
import { Mentor, Prisma } from '@prisma/client';
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